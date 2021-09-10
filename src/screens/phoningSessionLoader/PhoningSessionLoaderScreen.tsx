import React, { FunctionComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningSessionLoaderScreenProps, Screen } from '../../navigation'
import { Colors, Spacing } from '../../styles'
import { PrimaryButton } from '../shared/Buttons'
import { VerticalSpacer } from '../shared/Spacer'

const PhoningSessionLoaderScreen: FunctionComponent<PhoningSessionLoaderScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>PhoningSessionLoaderScreen</Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <PrimaryButton
        title="_FOUND_NUMBER_"
        onPress={() =>
          navigation.navigate(Screen.phoningSessionNumberFound, {
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

export default PhoningSessionLoaderScreen
