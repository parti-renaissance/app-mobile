import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import i18n from '../../utils/i18n'
import RankingModal from './RankingModal'
import LocationAuthorization from './LocationAuthorization'
import { DoorToDoorScreenProp } from '../../navigation'
import DoorToDoorCharterModal from './DoorToDoorCharterModal'
import {
  DoorToDoorCharterNotAccepted,
  DoorToDoorCharterState,
} from '../../core/entities/DoorToDoorCharterState'
import DoorToDoorRepository from '../../data/DoorToDoorRepository'
import { LocationManager } from '../../utils/LocationManager'
import { Screen } from '../../navigation'
import DoorToDoorMapView from './DoorToDoorMapView'
import MapListSwitch from './MapListSwitch'
import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'
import DoorToDoorListView from './DoorToDoorListView'
import { LatLng } from 'react-native-maps'
import {
  DoorToDoorDisplayFilterDisplay,
  DoorToDoorDisplayMode,
} from './DoorToDoor'
import DoorToDoorFilter from './DoorToDoorFilter'

const DEFAULT_ZOOM = 16

const DoorToDoorScreen: FunctionComponent<DoorToDoorScreenProp> = ({
  navigation,
}) => {
  const [location, setLocation] = useState<LatLng>()
  const [addresses, setAddresses] = useState<DoorToDoorAddress[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [locationAuthorized, setLocationAuthorized] = useState(false)
  const [displayMode, setDisplayMode] = useState<DoorToDoorDisplayMode>('map')
  const [filter, setFilter] = useState<DoorToDoorDisplayFilterDisplay>('all')
  const [charterState, setCharterState] = useState<
    DoorToDoorCharterState | undefined
  >()

  const fetchCharterState = useCallback(() => {
    DoorToDoorRepository.getInstance()
      .getDoorToDoorCharterState()
      .then((state) => setCharterState(state))
      .catch(() => setCharterState(undefined))
  }, [])

  const fetchAddresses = useCallback(async () => {
    const userLocation = await LocationManager.getLatestLocation()
    if (userLocation) {
      const { longitude, latitude } = userLocation

      setLocation({ latitude, longitude })
      DoorToDoorRepository.getInstance()
        .getAddresses(latitude, longitude, DEFAULT_ZOOM)
        .then((state) => setAddresses(state))
        .catch(() => {})
    }
  }, [])

  const getPermissionStatus = async () => {
    setLocationAuthorized(await LocationManager.permissionStatus())
  }

  const requestPermission = async () => {
    setLocationAuthorized(await LocationManager.requestPermission())
  }

  useEffect(() => {
    fetchCharterState()
    getPermissionStatus()
  }, [fetchCharterState])

  useEffect(() => {
    locationAuthorized && fetchAddresses()
  }, [locationAuthorized, fetchAddresses])

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

      <TouchablePlatform
        style={styles.classementIconContainer}
        touchHighlight={Colors.touchHighlight}
        onPress={() => navigation.navigate(Screen.buildingDetail)}
      >
        <Image
          style={styles.classementIcon}
          source={require('../../assets/images/iconClassement.png')}
        />
      </TouchablePlatform>
      <View style={styles.header}>
        <Text style={styles.title}>{i18n.t('doorToDoor.title')}</Text>
        {locationAuthorized && (
          <MapListSwitch mode={displayMode} onPress={setDisplayMode} />
        )}
      </View>

      {locationAuthorized ? (
        <>
          <View style={styles.filter}>
            <DoorToDoorFilter filter={filter} onPress={setFilter} />
          </View>
          {displayMode === 'map' ? (
            <DoorToDoorMapView data={addresses} location={location!} />
          ) : (
            <DoorToDoorListView data={addresses} />
          )}
        </>
      ) : (
        <LocationAuthorization onAuthorizationRequest={requestPermission} />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  classementIcon: {
    margin: Spacing.margin,
  },
  classementIconContainer: {
    alignSelf: 'flex-end',
  },
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
  },
  title: {
    ...Typography.title,
    marginHorizontal: Spacing.margin,
  },
})

export default DoorToDoorScreen
