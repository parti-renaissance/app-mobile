import React, { FunctionComponent, useEffect } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { DoorToDoorTunnelStartScreenProp, Screen } from '../../../navigation'
import { Colors, Spacing, Typography } from '../../../styles'
import i18n from '../../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../../shared/Buttons'
import { CloseButton } from '../../shared/NavigationHeaderButton'

const DoorToDoorTunnelStartScreen: FunctionComponent<DoorToDoorTunnelStartScreenProp> = ({
  navigation,
}) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
      title: 'Bat 1 - RdC - P1',
    })
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={require('../../../assets/images/papDoorIcon.png')} />
        <Text style={styles.title}>Bâtiment 1 - RdC</Text>
        <Text style={styles.body}>
          Rendez-vous à la 1ère porte en partant de la gauche.
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t('tunnel.start.doorknocked')}
          onPress={() => navigation.navigate(Screen.tunnelDoorOpening)}
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
  title: {
    ...Typography.title3,
    marginBottom: Spacing.unit,
    marginTop: Spacing.largeMargin,
  },
})

export default DoorToDoorTunnelStartScreen
