import React, { FunctionComponent, useEffect, useState } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { DoorToDoorTunnelStartScreenProp, Screen } from '../../../../navigation'
import { Colors, Spacing, Typography } from '../../../../styles'
import i18n from '../../../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../../../shared/Buttons'
import { TouchablePlatform } from '../../../shared/TouchablePlatform'

const TunnelDoorSelectionScreen: FunctionComponent<DoorToDoorTunnelStartScreenProp> = ({
  navigation,
  route,
}) => {
  const [selectedDoor, setSelectedDoor] = useState(1)

  useEffect(() => {
    navigation.setOptions({
      title: i18n.t('doorToDoor.tunnel.door.shortTitle', {
        count: route.params.buildingParams.floor,
        buildingName: route.params.buildingParams.block,
        floorName: route.params.buildingParams.floor,
        door: selectedDoor,
        context: route.params.buildingParams.floor,
      }),
    })
  }, [navigation, route.params, selectedDoor])

  const updateSelectedDoor = (newSelectedDoor: number) => {
    if (newSelectedDoor >= 1) {
      setSelectedDoor(newSelectedDoor)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
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
            count: route.params.buildingParams.floor,
            buildingName: route.params.buildingParams.block,
            floorName: route.params.buildingParams.floor,
            context: route.params.buildingParams.floor,
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
            navigation.navigate(Screen.tunnelDoorOpening, {
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
          onPress={() => {}}
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
