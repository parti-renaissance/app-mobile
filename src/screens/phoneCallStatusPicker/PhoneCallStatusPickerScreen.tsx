import React, { FunctionComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoneCallStatusPickerScreenProps, Screen } from '../../navigation'
import { Colors, Spacing } from '../../styles'
import { PrimaryButton, SecondaryButton } from '../shared/Buttons'
import { VerticalSpacer } from '../shared/Spacer'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'

const PhoneCallStatusPickerScreen: FunctionComponent<PhoneCallStatusPickerScreenProps> = ({
  navigation,
  route,
}) => {
  usePreventGoingBack()

  return (
    <SafeAreaView style={styles.container}>
      <Text>PhoneCallStatusPickerScreen</Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <PrimaryButton
        title="_ACCEPT_"
        onPress={() =>
          navigation.replace(Screen.phonePollDetail, {
            campaignId: route.params.campaignId,
            sessionId: '993979fd-7a13-4f38-9e93-a9dce269172a',
          })
        }
      />
      <VerticalSpacer spacing={Spacing.margin} />
      <SecondaryButton
        title="_DO_NOT_ACCEPT_"
        onPress={() => {
          // TODO: (Pierre Felgines) Navigate to correct screen
        }}
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
})

export default PhoneCallStatusPickerScreen
