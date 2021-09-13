import React, { FunctionComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import {
  PhoningSessionNumberFoundOtherDeviceScreenProps,
  Screen,
} from '../../navigation'
import { Colors, Spacing } from '../../styles'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'
import { PrimaryButton } from '../shared/Buttons'
import { VerticalSpacer } from '../shared/Spacer'

const PhoningSessionNumberFoundOtherDeviceScreen: FunctionComponent<PhoningSessionNumberFoundOtherDeviceScreenProps> = ({
  navigation,
  route,
}) => {
  usePreventGoingBack()

  return (
    <SafeAreaView style={styles.container}>
      <Text>PhoningSessionNumberFoundOtherDeviceScreen</Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <PrimaryButton
        title="_CALL_"
        onPress={() =>
          navigation.replace(Screen.phoneCallStatusPicker, {
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

export default PhoningSessionNumberFoundOtherDeviceScreen
