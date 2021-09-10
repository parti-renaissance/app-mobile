import React, { FunctionComponent, useLayoutEffect } from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoneCallFailureScreenProps, Screen } from '../../navigation'
import { Colors, Spacing } from '../../styles'
import { PrimaryButton } from '../shared/Buttons'
import { CloseButton } from '../shared/NavigationHeaderButton'
import { VerticalSpacer } from '../shared/Spacer'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'

const PhoneCallFailureScreen: FunctionComponent<PhoneCallFailureScreenProps> = ({
  navigation,
  route,
}) => {
  usePreventGoingBack()

  useLayoutEffect(() => {
    const updateNavigationHeader = () => {
      navigation.setOptions({
        headerLeft: () => (
          <CloseButton onPress={() => navigation.navigate(Screen.phoning)} />
        ),
      })
    }
    updateNavigationHeader()
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <Text>PhoneCallFailureScreen</Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <PrimaryButton
        title="_NOUVEL_APPEL_"
        onPress={() =>
          navigation.replace(Screen.phoningSessionLoader, {
            campaignId: route.params.campaignId,
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

export default PhoneCallFailureScreen
