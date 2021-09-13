import React, { FunctionComponent } from 'react'
import { Text, StyleSheet, ScrollView, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningCampaignBriefScreenProp, Screen } from '../../navigation'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import { title } from '../../styles/typography'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import i18n from '../../utils/i18n'
import { BorderlessButton, PrimaryButton } from '../shared/Buttons'
import { VerticalSpacer } from '../shared/Spacer'

const PhoningCampaignBriefScreen: FunctionComponent<PhoningCampaignBriefScreenProp> = ({
  navigation,
  route,
}) => {
  const styles = useThemedStyles(styleFactory)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <VerticalSpacer spacing={Spacing.margin} />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <PrimaryButton
            title={i18n.t('phoning.brief.call')}
            onPress={() =>
              navigation.navigate(Screen.phoningSessionModal, {
                screen: Screen.phoningSessionLoader,
                params: { campaignId: route.params.campaign.id, device: 'current' },
              })
            }
          />
          <BorderlessButton
            title={i18n.t('phoning.brief.call_from_other_device')}
            textStyle={styles.linkText}
            onPress={() =>
              navigation.navigate(Screen.phoningSessionModal, {
                screen: Screen.phoningSessionLoader,
                params: { campaignId: route.params.campaign.id, device: 'external' },
              })
            }
          />
      </View>
    </SafeAreaView>
  )
}

const styleFactory = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: Colors.defaultBackground,
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: Spacing.margin,
    },
    linkText: {
      ...Styles.eventSeeMoreButtonTextStyle(theme),
      color: theme.primaryColor,
    },
    bottomContainer: {
      ...Styles.topElevatedContainerStyle,
      backgroundColor: Colors.defaultBackground,
      paddingHorizontal: Spacing.margin,
      paddingTop: Spacing.margin,
    },
  })
}

export default PhoningCampaignBriefScreen
