import React, { memo, useCallback, useState } from 'react'
import { Modal, SafeAreaView, StyleSheet, View } from 'react-native'
import { LatLng, Region } from '@/components/Maps/Maps'
import MobileWallLayout from '@/components/MobileWallLayout/MobileWallLayout'
import { DoorToDoorCharterNotAccepted } from '@/core/entities/DoorToDoorCharterState'
import { GetDoorToDoorAddressesInteractor } from '@/core/interactor/GetDoorToDoorAddressesInteractor'
import DoorToDoorRepository from '@/data/DoorToDoorRepository'
import { useDoorToDoorStore } from '@/data/store/door-to-door'
import { DoorToDoorDisplayMode, DoorToDoorFilterDisplay } from '@/screens/doorToDoor/DoorToDoor'
import DoorToDoorCharterModal from '@/screens/doorToDoor/DoorToDoorCharterModal'
import DoorToDoorFilter from '@/screens/doorToDoor/DoorToDoorFilter'
import DoorToDoorListView from '@/screens/doorToDoor/DoorToDoorListView'
import _DoorToDoorMapView, { getRegionFromLatLng } from '@/screens/doorToDoor/DoorToDoorMapView'
import LocationAuthorization from '@/screens/doorToDoor/LocationAuthorization'
import MapListSwitch from '@/screens/doorToDoor/MapListSwitch'
import RankingModal from '@/screens/doorToDoor/rankings/RankingModal'
import LoadingView from '@/screens/shared/LoadingView'
import { Colors, Spacing, Typography } from '@/styles'
import i18n from '@/utils/i18n'
import { useOnFocus } from '@/utils/useOnFocus.hook'
import { useQuery } from '@tanstack/react-query'
import * as Geolocation from 'expo-location'
import { router, useRootNavigationState } from 'expo-router'
import { isWeb } from 'tamagui'

const DoorToDoorMapView = memo(_DoorToDoorMapView)

export type RankingModalState = Readonly<{
  visible: boolean
  campaignId?: string
}>

class ErrorPermission extends Error {
  constructor() {
    super('Permission denied')
  }
}

const requestPermission = async () => {
  const data = await Geolocation.requestForegroundPermissionsAsync()
  if (data.status !== 'granted') {
    throw new ErrorPermission()
  }
  return data
}

const _fetchAdresses = async (forcedRegion?: Region) => {
  let region = forcedRegion
  if (!region) {
    const position = await Geolocation.getCurrentPositionAsync({
      accuracy: Geolocation.Accuracy.High,
    })
    const latLng = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    }
    region = getRegionFromLatLng(latLng)
  }
  return new GetDoorToDoorAddressesInteractor().execute(region.latitude, region.longitude, region.latitudeDelta, region.longitudeDelta)
}

const DoorToDoorScreen = () => {
  const [rankingModalState, setRankingModalState] = useState<RankingModalState>({ visible: false })
  const [currentSearchRegion, _setCurrentSearchRegion] = useState<Region>()
  const [displayMode, setDisplayMode] = useState<DoorToDoorDisplayMode>('map')
  const [filter, setFilter] = useState<DoorToDoorFilterDisplay>('all')

  const setCurrentSearchRegion = useCallback((region: Region) => {
    _setCurrentSearchRegion(region)
  }, [])

  const { setAddress } = useDoorToDoorStore()

  const { data: charterState, refetch: fetchCharterState } = useQuery({
    queryKey: ['doorToDoorCharterState'],
    queryFn: () => DoorToDoorRepository.getInstance().getDoorToDoorCharterState(),
  })

  const {
    error: errorPermission,
    refetch: refetchPermission,
    isSuccess: hasPermission,
  } = useQuery({
    queryKey: ['mapPermission'],
    queryFn: requestPermission,
  })

  const {
    data: addresses,
    isLoading,
    error,
    refetch: refetchAddresses,
  } = useQuery({
    queryKey: ['doorToDoorAddresses', currentSearchRegion],
    queryFn: () => _fetchAdresses(currentSearchRegion),
    enabled: hasPermission,
  })

  useOnFocus(refetchAddresses)

  const filteredAddresses =
    addresses?.filter((address) => {
      if (filter === 'all') return true
      return address.building.campaignStatistics?.status === filter
    }) || []

  const navigateToBuildingDetail = useCallback(
    (id: string) => {
      const address = addresses?.find((item) => item.id === id)
      if (address?.building.campaignStatistics) {
        setAddress(address)
        router.push('/porte-a-porte/building-detail')
      }
    },
    [addresses],
  )

  const renderAskPersmission = () => <LocationAuthorization onAuthorizationRequest={refetchPermission} />
  const handleCampaignRankingSelected = useCallback((campaignId: string) => {
    setRankingModalState({ visible: true, campaignId: campaignId })
  }, [])

  const renderMap = useCallback(
    (initalLocation?: LatLng) => (
      <>
        <View style={styles.filter}>
          <DoorToDoorFilter filter={filter} onPress={setFilter} />
        </View>
        <View style={{ display: displayMode === 'map' ? 'flex' : 'none', flex: 1 }}>
          <DoorToDoorMapView
            data={filteredAddresses}
            initialLocation={initalLocation}
            loading={isLoading}
            onAddressPress={navigateToBuildingDetail}
            onSearchNearby={setCurrentSearchRegion}
            onCampaignRankingSelected={handleCampaignRankingSelected}
          />
        </View>
        {displayMode !== 'map' && (isLoading ? <LoadingView /> : <DoorToDoorListView data={filteredAddresses} onAddressPress={navigateToBuildingDetail} />)}
      </>
    ),
    [displayMode, filter, filteredAddresses, isLoading, navigateToBuildingDetail],
  )

  const renderContent = () => {
    if (errorPermission instanceof ErrorPermission) {
      return renderAskPersmission()
    }

    return renderMap(currentSearchRegion)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={rankingModalState.visible} animationType="slide">
        {rankingModalState.campaignId ? (
          <RankingModal onDismissModal={() => setRankingModalState({ visible: false })} campaignId={rankingModalState.campaignId} />
        ) : null}
      </Modal>

      {charterState instanceof DoorToDoorCharterNotAccepted && (
        <Modal visible={true} animationType="slide">
          <DoorToDoorCharterModal charter={charterState.charter} onAcceptCharter={fetchCharterState} onDismissModal={() => router.push('../')} />
        </Modal>
      )}

      {/* <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {i18n.t('doorToDoor.title')}
        </Text>
        {!error && <MapListSwitch mode={displayMode} onPress={setDisplayMode} />}
      </View> */}
      {renderContent()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  filter: {
    height: 52,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.unit,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...Typography.highlightedLargeTitle,
    flex: 1,
  },
})

export default isWeb ? MobileWallLayout : DoorToDoorScreen
