import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Image, Modal, StyleSheet, Text, SafeAreaView } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { useThemedStyles } from '../../themes'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import i18n from '../../utils/i18n'
import Theme from '../../themes/Theme'
import ClassementsModal from './ClassementsModal'
import LocationAuthorization from './LocationAuthorization'
import { DoorToDoorScreenProp } from '../../navigation'
import DoorToDoorCharterModal from './DoorToDoorCharterModal'
import {
  DoorToDoorCharterNotAccepted,
  DoorToDoorCharterState,
} from '../../core/entities/DoorToDoorCharterState'
import DoorToDoorRepository from '../../data/DoorToDoorRepository'
import { LocationManager } from '../../utils/LocationManager'

const DoorToDoorScreen: FunctionComponent<DoorToDoorScreenProp> = ({
  navigation,
}) => {
  const styles = useThemedStyles(stylesFactory)
  const [modalVisible, setModalVisible] = useState(false)
  const [locationAuthorized, setLocationAuthorized] = useState(false)
  const [charterState, setCharterState] = useState<
    DoorToDoorCharterState | undefined
  >()

  const fetchCharterState = useCallback(() => {
    DoorToDoorRepository.getInstance()
      .getDoorToDoorCharterState()
      .then((state) => {
        setCharterState(state)
      })
      .catch(() => {
        setCharterState(undefined)
      })
  }, [])

  const getPermissionStatus = async () => {
    setLocationAuthorized(await LocationManager.permissionStatus())
  }

  const requestPermission = async () => {
    setLocationAuthorized(await LocationManager.requestPermission())
  }

  useEffect(
    useCallback(() => {
      fetchCharterState()
      getPermissionStatus()
    }, [fetchCharterState]),
  )

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={modalVisible} animationType="slide">
        <ClassementsModal onDismissModal={() => setModalVisible(false)} />
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
        onPress={() => setModalVisible(true)}
      >
        <Image
          style={styles.classementIcon}
          source={require('../../assets/images/iconClassement.png')}
        />
      </TouchablePlatform>
      <Text style={styles.title}>{i18n.t('doorToDoor.title')}</Text>

      {!locationAuthorized && (
        <LocationAuthorization onAuthorizationRequest={requestPermission} />
      )}
    </SafeAreaView>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    classementIcon: {
      margin: Spacing.margin,
      tintColor: theme.primaryColor,
    },
    classementIconContainer: {
      alignSelf: 'flex-end',
    },
    container: {
      backgroundColor: Colors.defaultBackground,
      flex: 1,
    },
    title: {
      ...Typography.title,
      marginBottom: Spacing.margin,
      marginHorizontal: Spacing.margin,
    },
  })
}

export default DoorToDoorScreen
