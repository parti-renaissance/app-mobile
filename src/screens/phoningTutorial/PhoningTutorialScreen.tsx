import React, { FunctionComponent, useEffect, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Markdown from 'react-native-markdown-display'
import SafeAreaView from 'react-native-safe-area-view'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import { Colors, Spacing } from '../../styles'
import { PhoningTutorialScreenProp } from '../../navigation'
import i18n from '../../utils/i18n'

export interface TutorialResources {
  content: string
}

const PhoningTutorialScreen: FunctionComponent<PhoningTutorialScreenProp> = ({
  navigation,
}) => {
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
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <Markdown>{currentResources?.content}</Markdown>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.margin,
  },
})

export default PhoningTutorialScreen
