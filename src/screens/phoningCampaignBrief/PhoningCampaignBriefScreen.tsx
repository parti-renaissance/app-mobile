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
          navigation.navigate(Screen.phonePollDetailModal, {
            screen: Screen.phonePollDetail,
            params: { campaignId: route.params.campaignId },
          })
        }
      />
      <VerticalSpacer spacing={Spacing.margin} />
      <SecondaryButton title="_LANCER_APPEL_AUTRE_TEL_" />
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
