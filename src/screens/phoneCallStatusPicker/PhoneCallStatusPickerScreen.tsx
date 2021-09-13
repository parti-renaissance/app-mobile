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
            data: route.params.data,
          })
        }
      />
      <VerticalSpacer spacing={Spacing.margin} />
      <SecondaryButton
        title="_DO_NOT_ACCEPT_"
        onPress={() =>
          navigation.replace(Screen.phoneCallFailure, {
            data: route.params.data,
          })
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
})

export default PhoneCallStatusPickerScreen
