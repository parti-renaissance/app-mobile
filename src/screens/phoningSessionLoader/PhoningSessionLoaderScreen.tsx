import React, { FunctionComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningSessionLoaderScreenProps, Screen } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../shared/Buttons'
import LoadingView from '../shared/LoadingView'
import { VerticalSpacer } from '../shared/Spacer'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'

// TODO: (Pierre Felgines) Change this session id
const DUMMY_SESSION_ID = '993979fd-7a13-4f38-9e93-a9dce269172a'

const PhoningSessionLoaderScreen: FunctionComponent<PhoningSessionLoaderScreenProps> = ({
  navigation,
  route,
}) => {
  usePreventGoingBack()

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{i18n.t('phoningsessionloader.title')}</Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <LoadingView />
      <VerticalSpacer spacing={Spacing.margin} />
      <PrimaryButton
        title="_FOUND_NUMBER_"
        onPress={() => {
          const navigationData = {
            campaignId: route.params.campaignId,
            sessionId: DUMMY_SESSION_ID,
            device: route.params.device,
          }
          switch (route.params.device) {
            case 'current':
              navigation.replace(Screen.phoningSessionNumberFound, {
                data: navigationData,
              })
              break
            case 'external':
              navigation.replace(Screen.phoningSessionNumberFoundOtherDevice, {
                data: navigationData,
              })
              break
          }
        }}
      />
      <VerticalSpacer spacing={Spacing.margin} />
      <SecondaryButton
        title="_NO_NUMBER_AVAILABLE_"
        onPress={() =>
          navigation.replace(Screen.phoningSessionNoNumberAvailable)
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
    paddingHorizontal: Spacing.margin,
  },
  title: {
    ...Typography.title,
  },
})

export default PhoningSessionLoaderScreen
