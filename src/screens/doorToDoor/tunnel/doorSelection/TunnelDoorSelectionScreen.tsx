import React, { FunctionComponent, useEffect, useState } from 'react'
import { Image, StyleSheet, View, Text, Alert } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import DoorToDoorRepository from '../../../../data/DoorToDoorRepository'
import { DoorToDoorTunnelModalNavigatorScreenProps } from '../../../../navigation/doorToDoorTunnelModal/DoorToDoorTunnelModalNavigatorScreenProps'
import { Colors, Spacing, Typography } from '../../../../styles'
import i18n from '../../../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../../../shared/Buttons'
import LoadingOverlay from '../../../shared/LoadingOverlay'
import { TouchablePlatform } from '../../../shared/TouchablePlatform'

type TunnelDoorSelectionScreenProps = DoorToDoorTunnelModalNavigatorScreenProps<'TunnelDoorSelection'>

const TunnelDoorSelectionScreen: FunctionComponent<TunnelDoorSelectionScreenProps> = ({
  navigation,
  route,
}) => {
  const [selectedDoor, setSelectedDoor] = useState(
    route.params.buildingParams.door,
  )
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      title: i18n.t('doorToDoor.tunnel.door.shortTitle', {
        count: route.params.buildingParams.floor + 1,
        buildingName: route.params.buildingParams.block,
        floorName: route.params.buildingParams.floor,
        door: selectedDoor,
      }),
    })
  }, [navigation, route.params, selectedDoor])

  useEffect(() => {
    setSelectedDoor(route.params.buildingParams.door)
  }, [route.params.buildingParams.door])

  const askConfirmationBeforeCloseFloor = () => {
    Alert.alert(
      i18n.t('doorToDoor.tunnel.door.close_floor_alert.title'),
      i18n.t('doorToDoor.tunnel.door.close_floor_alert.message'),
      [
        {
          text: i18n.t('doorToDoor.tunnel.door.close_floor_alert.action'),
          onPress: () => closeFloor(),
          style: 'destructive',
        },
        {
          text: i18n.t('doorToDoor.tunnel.door.close_floor_alert.cancel'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
  }

  const updateSelectedDoor = (newSelectedDoor: number) => {
    if (newSelectedDoor >= 1) {
      setSelectedDoor(newSelectedDoor)
    }
  }

  const closeFloor = () => {
    const building = route.params.buildingParams
    setIsLoading(true)
    DoorToDoorRepository.getInstance()
      .closeBuildingBlockFloor(
        route.params.campaignId,
        building.id,
        building.block,
        building.floor,
      )
      .then(() => {
        setIsLoading(false)
        navigation.getParent()?.goBack()
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay visible={isLoading} />
      <View style={styles.contentContainer}>
        <View style={styles.doorImageContainer}>
          <TouchablePlatform
            style={styles.changeDoorIndicator}
            touchHighlight={Colors.touchHighlight}
            onPress={() => {
              updateSelectedDoor(selectedDoor - 1)
            }}
          >
            <Image source={require('../../../../assets/images/iconBack.png')} />
          </TouchablePlatform>
          <Image
            source={require('../../../../assets/images/papDoorIcon.png')}
          />
          <TouchablePlatform
            style={styles.changeDoorIndicator}
            touchHighlight={Colors.touchHighlight}
            onPress={() => {
              updateSelectedDoor(selectedDoor + 1)
            }}
          >
            <Image
              style={styles.nextDoor}
              source={require('../../../../assets/images/iconBack.png')}
            />
          </TouchablePlatform>
        </View>
        <Text style={styles.title}>
          {i18n.t('doorToDoor.tunnel.door.title', {
            count: route.params.buildingParams.floor + 1,
            buildingName: route.params.buildingParams.block,
            floorName: route.params.buildingParams.floor,
          })}
        </Text>
        <Text style={styles.body}>
          {i18n.t('doorToDoor.tunnel.door.rdvDoor', {
            count: selectedDoor,
            door: selectedDoor,
          })}
        </Text>
        <Text style={styles.note}>
          {i18n.t('doorToDoor.tunnel.door.doorFinished')}
        </Text>
        <Text style={styles.note}>
          {i18n.t('doorToDoor.tunnel.door.buildingFinished')}
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t('doorToDoor.tunnel.door.doorknocked')}
          onPress={() =>
            navigation.navigate('TunnelDoorOpening', {
              campaignId: route.params.campaignId,
              buildingParams: {
                ...route.params.buildingParams,
                door: selectedDoor,
              },
            })
          }
        />
        <SecondaryButton
          title={i18n.t('doorToDoor.tunnel.door.floorFinished')}
          style={styles.finished}
          onPress={askConfirmationBeforeCloseFloor}
          disabled={!route.params.canCloseFloor}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    ...Typography.body,
    paddingHorizontal: Spacing.extraLargeMargin,
    textAlign: 'center',
  },
  bottomContainer: {
    backgroundColor: Colors.defaultBackground,
    paddingHorizontal: Spacing.margin,
    paddingTop: Spacing.margin,
  },
  changeDoorIndicator: {
    borderRadius: 32,
    padding: Spacing.unit,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.margin,
  },
  doorImageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  finished: {
    marginTop: Spacing.unit,
  },
  nextDoor: {
    transform: [{ rotate: '180deg' }],
  },
  note: {
    ...Typography.footnoteLight,
    marginVertical: Spacing.margin,
    paddingHorizontal: Spacing.margin,
    textAlign: 'center',
  },
  title: {
    ...Typography.title3,
    marginBottom: Spacing.unit,
    marginTop: Spacing.largeMargin,
  },
})

export default TunnelDoorSelectionScreen
