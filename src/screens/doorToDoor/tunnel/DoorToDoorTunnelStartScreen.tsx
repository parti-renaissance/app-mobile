import React, { FunctionComponent, useEffect } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { DoorToDoorTunnelStartScreenProp, Screen } from '../../../navigation'
import { Colors, Spacing, Typography } from '../../../styles'
import i18n from '../../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../../shared/Buttons'
import { CloseButton } from '../../shared/NavigationHeaderButton'
import Swiper from 'react-native-swiper'

const DoorToDoorTunnelStartScreen: FunctionComponent<DoorToDoorTunnelStartScreenProp> = ({
  navigation,
  route,
}) => {
  // TODO - check the liste of campaign structure
  const { campaignId, campaignTitle } = route.params

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
      title: campaignTitle,
    })
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <Swiper showsButtons={true} showsPagination={false}>
        {/* TODO - Check array structure to map the list of Swiper */}
        <View style={styles.contentContainer}>
          <Image source={require('../../../assets/images/papDoorIcon.png')} />
          <Text style={styles.title}>{campaignTitle}</Text>
          <Text style={styles.body}>{i18n.t('tunnel.start.rdvFirstDoor')}</Text>
          <Text style={styles.note}>{i18n.t('tunnel.start.doorFinished')}</Text>
          <Text style={styles.note}>
            {i18n.t('tunnel.start.buildingFinished')}
          </Text>
        </View>
      </Swiper>
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t('tunnel.start.doorknocked')}
          onPress={() =>
            navigation.navigate(Screen.tunnelDoorOpening, {
              campaignId,
              campaignTitle,
            })
          }
        />
        <SecondaryButton
          title={i18n.t('tunnel.start.floorFinished')}
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

export default DoorToDoorTunnelStartScreen
