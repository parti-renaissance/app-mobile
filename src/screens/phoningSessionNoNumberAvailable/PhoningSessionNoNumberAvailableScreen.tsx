import React, { FunctionComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import {
  PhoningSessionNoNumberAvailableScreenProps,
  Screen,
} from '../../navigation'
import { Colors, Spacing } from '../../styles'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'
import { SecondaryButton } from '../shared/Buttons'
import { VerticalSpacer } from '../shared/Spacer'

const PhoningSessionNoNumberAvailableScreen: FunctionComponent<PhoningSessionNoNumberAvailableScreenProps> = ({
  navigation,
}) => {
  usePreventGoingBack()

  return (
    <SafeAreaView style={styles.container}>
      <Text>PhoningSessionNoNumberAvailableScreen</Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <SecondaryButton
        title="_TERMINER_"
        onPress={() => navigation.navigate(Screen.phoning)}
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

export default PhoningSessionNoNumberAvailableScreen
