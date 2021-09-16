import React, { FunctionComponent, useEffect, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Markdown, { styles } from 'react-native-markdown-display'
import SafeAreaView from 'react-native-safe-area-view'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import { Colors, Spacing, Styles } from '../../styles'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import { PhoningTutorialScreenProp, Screen } from '../../navigation'
import i18n from '../../utils/i18n'

export interface TutorialResources {
  content: string
}

const PhoningTutorialScreen: FunctionComponent<PhoningTutorialScreenProp> = ({
  navigation,
}) => {
  const styles = useThemedStyles(styleFactory)
  const [currentResources, setResources] = useState<TutorialResources>()

  useEffect(() => {
    navigation.setOptions({
      title: i18n.t('phoning.tutorial.title'),
    })
    PhoningCampaignRepository.getInstance()
      .getPhoningTutorial()
      .then((markdown) => {
        setResources({
          content: markdown,
        })
      })
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <Markdown>{currentResources?.content}</Markdown>
      </ScrollView>
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

export default PhoningTutorialScreen
