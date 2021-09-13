import React, { FunctionComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningCampaignBriefScreenProp, Screen } from '../../navigation'
import { Colors, Spacing } from '../../styles'
import { PrimaryButton, SecondaryButton } from '../shared/Buttons'
import { VerticalSpacer } from '../shared/Spacer'

const PhoningCampaignBriefScreen: FunctionComponent<PhoningCampaignBriefScreenProp> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>PhoningSessionLoaderScreen</Text>
      <VerticalSpacer spacing={Spacing.margin} />
      <PrimaryButton
        title="_LANCER_APPEL_"
        onPress={() =>
          navigation.navigate(Screen.phoningSessionModal, {
            screen: Screen.phoningSessionLoader,
            params: { campaignId: route.params.campaignId, device: 'current' },
          })
        }
      />
      <VerticalSpacer spacing={Spacing.margin} />
      <SecondaryButton
        title="_LANCER_APPEL_AUTRE_TEL_"
        onPress={() =>
          navigation.navigate(Screen.phoningSessionModal, {
            screen: Screen.phoningSessionLoader,
            params: { campaignId: route.params.campaignId, device: 'external' },
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

export default PhoningCampaignBriefScreen
