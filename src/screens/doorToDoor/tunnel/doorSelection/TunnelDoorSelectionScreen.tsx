import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { DoorToDoorTunnelStartScreenProp, Screen } from '../../../../navigation'
import { Colors, Spacing, Typography } from '../../../../styles'
import i18n from '../../../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../../../shared/Buttons'
import Swiper from 'react-native-swiper'

const TunnelDoorSelectionScreen: FunctionComponent<DoorToDoorTunnelStartScreenProp> = ({
  navigation,
  route,
}) => {
  // TODO (Chawki 21.12.2021) - check the liste of campaign structure
  const campaignId = route.params.campaignId

  return (
    <SafeAreaView style={styles.container}>
      <Swiper showsButtons={true} showsPagination={false}>
        {/* TODO (Chawki 21.12.2021) - Check array structure to map the list of Swiper */}
        <View style={styles.contentContainer}>
          <Image
            source={require('../../../../assets/images/papDoorIcon.png')}
          />
          <Text style={styles.title}>__TITLE__</Text>
          <Text style={styles.body}>
            {i18n.t('doorToDoor.tunnel.start.rdvFirstDoor')}
          </Text>
          <Text style={styles.note}>
            {i18n.t('doorToDoor.tunnel.start.doorFinished')}
          </Text>
          <Text style={styles.note}>
            {i18n.t('doorToDoor.tunnel.start.buildingFinished')}
          </Text>
        </View>
      </Swiper>
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t('doorToDoor.tunnel.start.doorknocked')}
          onPress={() =>
            navigation.navigate(Screen.tunnelDoorOpening, {
              campaignId: campaignId,
              buildingParams: route.params.buildingParams,
            })
          }
        />
        <SecondaryButton
          title={i18n.t('doorToDoor.tunnel.start.floorFinished')}
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
  finished: {
    marginTop: Spacing.unit,
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
