import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Modal, StyleSheet, Text, SafeAreaView, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import LocationAuthorization from './LocationAuthorization'
import { DoorToDoorScreenProp } from '../../navigation'
import DoorToDoorCharterModal from './DoorToDoorCharterModal'
import {
  DoorToDoorCharterNotAccepted,
  DoorToDoorCharterState,
} from '../../core/entities/DoorToDoorCharterState'
import DoorToDoorRepository from '../../data/DoorToDoorRepository'
import { LocationManager } from '../../utils/LocationManager'
import DoorToDoorMapView from './DoorToDoorMapView'
import MapListSwitch from './MapListSwitch'
import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'
import DoorToDoorListView from './DoorToDoorListView'
import { LatLng } from 'react-native-maps'
import { DoorToDoorFilterDisplay, DoorToDoorDisplayMode } from './DoorToDoor'
import DoorToDoorFilter from './DoorToDoorFilter'
import Geolocation from 'react-native-geolocation-service'
import { Screen } from '../../navigation'
import { GetDoorToDoorAddressesInteractor } from '../../core/interactor/GetDoorToDoorAddressesInteractor'
import RankingModal from './rankings/RankingModal'
import LoaderView from '../shared/LoaderView'
import { useFocusEffect } from '@react-navigation/native'

type RankingModalState = Readonly<{
  visible: boolean
  campaignId?: string
}>

const DoorToDoorScreen: FunctionComponent<DoorToDoorScreenProp> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(false)
  const [rankingModalState, setRankingModalState] = useState<RankingModalState>(
    { visible: false },
  )
  const [currentSearchLocation, setCurrentSearchLocation] = useState<LatLng>()
  const [addresses, setAddresses] = useState<DoorToDoorAddress[]>([])
  const [filteredAddresses, setFilteredAddresses] = useState<
    DoorToDoorAddress[]
  >([])
  const [locationAuthorized, setLocationAuthorized] = useState<
    boolean | undefined
  >()
  const [displayMode, setDisplayMode] = useState<DoorToDoorDisplayMode>('map')
  const [filter, setFilter] = useState<DoorToDoorFilterDisplay>('all')
  const [charterState, setCharterState] = useState<
    DoorToDoorCharterState | undefined
  >()

  const fetchCharterState = useCallback(() => {
    DoorToDoorRepository.getInstance()
      .getDoorToDoorCharterState()
      .then((state) => setCharterState(state))
      .catch(() => setCharterState(undefined))
  }, [])

  const fetchAddresses = (latLng: LatLng) => {
    setLoading(true)
    new GetDoorToDoorAddressesInteractor()
      .execute(latLng.latitude, latLng.longitude)
      .then((newAddresses) => {
        setAddresses(newAddresses)
        setFilteredAddresses(newAddresses)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    // Check door to door chart acceptance & localization permission
    fetchCharterState()
    getPermissionStatus()
  }, [fetchCharterState])

  useEffect(() => {
    /* MapView and addresses fetch needs an initial location,
     * so when localization permission is granted,
     * we retrieve location to initalize with it.
     */
    if (locationAuthorized) {
      setLoading(true)
      Geolocation.getCurrentPosition(
        (position) => {
          const latLng = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          }
          setCurrentSearchLocation(latLng)
        },
        () => {
          setLocationAuthorized(false)
          setLoading(false)
        },
        { enableHighAccuracy: true },
      )
    }
  }, [locationAuthorized])

  useFocusEffect(
    useCallback(() => {
      /* When screen is focused and current location change,
       * fetch addresses near current search location.
       */
      if (currentSearchLocation) {
        fetchAddresses(currentSearchLocation)
      }
    }, [currentSearchLocation]),
  )

  const getPermissionStatus = async () => {
    setLocationAuthorized(await LocationManager.permissionStatus())
  }

  const requestPermission = async () => {
    setLocationAuthorized(await LocationManager.requestPermission())
  }

  const onfilterChange = (mode: DoorToDoorFilterDisplay) => {
    setFilter(mode)
    if (mode === 'all') {
      setFilteredAddresses(addresses)
    } else {
      setFilteredAddresses(
        addresses.filter(
          (address) =>
            address.building.campaignStatistics &&
            address.building.campaignStatistics.status === mode,
        ),
      )
    }
  }

  const navigateToBuildingDetail = (id: string) => {
    const address = addresses.find((item) => item.id === id)
    navigation.navigate(Screen.buildingDetail, {
      address: address,
    })
  }

  const renderLoading = () => <LoaderView style={styles.loading} />

  const renderAskPersmission = () => (
    <LocationAuthorization onAuthorizationRequest={requestPermission} />
  )

  const renderMap = (initalLocation: LatLng) => (
    <>
      <View style={styles.filter}>
        <DoorToDoorFilter filter={filter} onPress={onfilterChange} />
      </View>
      {displayMode === 'map' ? (
        <DoorToDoorMapView
          data={filteredAddresses}
          initialLocation={initalLocation}
          loading={loading}
          onAddressPress={navigateToBuildingDetail}
          onSearchNearby={(location) => {
            setCurrentSearchLocation(location)
          }}
          onCampaignRankingSelected={(campaignId: string) => {
            setRankingModalState({ visible: true, campaignId: campaignId })
          }}
        />
      ) : (
        <DoorToDoorListView
          data={filteredAddresses}
          onAddressPress={navigateToBuildingDetail}
        />
      )}
    </>
  )

  const renderContent = () => {
    if (typeof locationAuthorized === 'boolean') {
      if (!locationAuthorized) {
        return renderAskPersmission()
      }
      if (!currentSearchLocation) {
        return renderLoading()
      }
      return renderMap(currentSearchLocation)
    } else {
      return renderLoading()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={rankingModalState.visible} animationType="slide">
        {rankingModalState.campaignId ? (
          <RankingModal
            onDismissModal={() => setRankingModalState({ visible: false })}
            campaignId={rankingModalState.campaignId}
          />
        ) : null}
      </Modal>

      {charterState instanceof DoorToDoorCharterNotAccepted && (
        <Modal visible={true} animationType="slide">
          <DoorToDoorCharterModal
            charter={charterState.charter}
            onAcceptCharter={fetchCharterState}
            onDismissModal={() => navigation.goBack()}
          />
        </Modal>
      )}

      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {i18n.t('doorToDoor.title')}
        </Text>
        {locationAuthorized && (
          <MapListSwitch mode={displayMode} onPress={setDisplayMode} />
        )}
      </View>
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

export default DoorToDoorScreen
