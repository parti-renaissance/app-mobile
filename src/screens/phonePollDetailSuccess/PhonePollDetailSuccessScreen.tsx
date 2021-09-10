import React, { FunctionComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhonePollDetailSuccessScreenProps, Screen } from '../../navigation'
import { Colors, Spacing } from '../../styles'
import { PrimaryButton, SecondaryButton } from '../shared/Buttons'
import { VerticalSpacer } from '../shared/Spacer'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'

const PhonePollDetailSuccessScreen: FunctionComponent<PhonePollDetailSuccessScreenProps> = ({
  navigation,
  route,
}) => {
  usePreventGoingBack()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    })
  }, [navigation, route.params.title])

  return (
    <SafeAreaView style={styles.container}>
      <Text>PhonePollDetailSuccessScreen</Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <PrimaryButton title="_NOUVEL_APPEL_" />
      <VerticalSpacer spacing={Spacing.margin} />
      <SecondaryButton title="_VOIR_NUMERO_" />
      <VerticalSpacer spacing={Spacing.margin} />
      <SecondaryButton
        title="_TERMINER_"
        onPress={() =>
          navigation.navigate(Screen.phoningNavigator, {
            screen: Screen.phoning,
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

export default PhonePollDetailSuccessScreen
