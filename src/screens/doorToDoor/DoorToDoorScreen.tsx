import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
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
import RankingModal from './rankings/RankingModal'
import { Screen } from '../../navigation'
import { NavigationHeaderButton } from '../shared/NavigationHeaderButton'
import { GetDoorToDoorAddressesInteractor } from '../../core/interactor/GetDoorToDoorAddressesInteractor'

const DoorToDoorScreen: FunctionComponent<DoorToDoorScreenProp> = ({
  navigation,
}) => {
  const [location, setLocation] = useState<LatLng>()
  const [addresses, setAddresses] = useState<DoorToDoorAddress[]>([])
  const [filteredAddresses, setFilteredAddresses] = useState<
    DoorToDoorAddress[]
  >([])
  const [modalVisible, setModalVisible] = useState(false)
  const [locationAuthorized, setLocationAuthorized] = useState(false)
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

  const fetchPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        })
        new GetDoorToDoorAddressesInteractor()
          .execute(position.coords.latitude, position.coords.longitude)
          .then((newAddresses) => {
            setAddresses(newAddresses)
            setFilteredAddresses(newAddresses)
          })
      },
      () => setLocationAuthorized(false),
      { enableHighAccuracy: true },
    )
  }

  useEffect(() => {
    fetchCharterState()
    getPermissionStatus()
  }, [fetchCharterState])

  useEffect(() => {
    locationAuthorized && fetchPosition()
  }, [locationAuthorized])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavigationHeaderButton
          onPress={() => setModalVisible(true)}
          source={require('../../assets/images/iconClassement.png')}
        />
      ),
    })
  })

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
    console.log(address)
    navigation.navigate(Screen.buildingDetail, {
      address: address,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={modalVisible} animationType="slide">
        <RankingModal onDismissModal={() => setModalVisible(false)} />
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
        <Text style={styles.title}>{i18n.t('doorToDoor.title')}</Text>
        {locationAuthorized && (
          <MapListSwitch mode={displayMode} onPress={setDisplayMode} />
        )}
      </View>

      {locationAuthorized && location ? (
        <>
          <View style={styles.filter}>
            <DoorToDoorFilter filter={filter} onPress={onfilterChange} />
          </View>
          {displayMode === 'map' ? (
            <DoorToDoorMapView
              data={filteredAddresses}
              location={location}
              onAddressPress={navigateToBuildingDetail}
            />
          ) : (
            <DoorToDoorListView
              data={filteredAddresses}
              onAddressPress={navigateToBuildingDetail}
            />
          )}
        </>
      ) : (
        <LocationAuthorization onAuthorizationRequest={requestPermission} />
      )}
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
    marginRight: Spacing.margin,
    marginTop: Spacing.unit,
  },
  title: {
    ...Typography.title,
    marginHorizontal: Spacing.margin,
  },
})

export default DoorToDoorScreen
