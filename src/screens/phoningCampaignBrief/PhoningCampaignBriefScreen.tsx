import React, { FunctionComponent, useEffect } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import Markdown from 'react-native-markdown-display'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningCampaignBriefScreenProp, Screen } from '../../navigation'
import { Colors, Spacing, Styles } from '../../styles'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import i18n from '../../utils/i18n'
import { BorderlessButton, PrimaryButton } from '../shared/Buttons'

const PhoningCampaignBriefScreen: FunctionComponent<PhoningCampaignBriefScreenProp> = ({
  navigation,
  route,
}) => {
  const styles = useThemedStyles(styleFactory)

  useEffect(() => {
    navigation.setOptions({
      title: route.params.data.title,
    })
  }, [navigation, styles, route.params.data.title])

  const markdownStyle = { body: styles.contentContainer }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Markdown style={markdownStyle}>{route.params.data.brief}</Markdown>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t('phoning.brief.call')}
          onPress={() =>
            navigation.navigate(Screen.phoningSessionModal, {
              screen: Screen.phoningSessionLoader, 
              params: {
                campaignId: route.params.data.id,
                campaignTitle: route.params.data.title,
                device: 'current',
              },
            })
          }
        />
        <BorderlessButton
          title={i18n.t('phoning.brief.call_from_other_device')}
          textStyle={styles.linkText}
          onPress={() =>
            navigation.navigate(Screen.phoningSessionModal, {
              screen: Screen.phoningSessionLoader,
              params: {
                campaignId: route.params.data.id,
                campaignTitle: route.params.data.title,
                device: 'external',
              },
            })
          }
        />
      </View>
    </SafeAreaView>
  )
}

const styleFactory = (theme: Theme) => {
  return StyleSheet.create({
    bottomContainer: {
      ...Styles.topElevatedContainerStyle,
      backgroundColor: Colors.defaultBackground,
      paddingHorizontal: Spacing.margin,
      paddingTop: Spacing.margin,
    },
    container: {
      backgroundColor: Colors.defaultBackground,
      flex: 1,
    },
    contentContainer: {
      padding: Spacing.margin,
    },
    linkText: {
      ...Styles.eventSeeMoreButtonTextStyle(theme),
      color: theme.primaryColor,
    },
  })
}

export default PhoningCampaignBriefScreen
