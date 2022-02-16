import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Markdown from 'react-native-markdown-display'
import SafeAreaView from 'react-native-safe-area-view'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import { Colors, Spacing } from '../../styles'
import i18n from '../../utils/i18n'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { useFocusEffect } from '@react-navigation/core'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { ActionsNavigatorScreenProps } from '../../navigation/ActionsNavigator'

type PhoningTutorialScreenProps = ActionsNavigatorScreenProps<'PhoningTutorial'>

export interface TutorialResources {
  content: string
}

const PhoningTutorialScreen: FunctionComponent<PhoningTutorialScreenProps> = ({
  navigation,
}) => {
  const [statefulState, setStatefulState] = useState<
    ViewState<TutorialResources>
  >(ViewState.Loading())

  useEffect(() => {
    navigation.setOptions({
      title: i18n.t('phoning.tutorial.title'),
    })
    setStatefulState(ViewState.Loading())
  }, [navigation])

  const fetchData = useCallback(() => {
    setStatefulState(ViewState.Loading())
    PhoningCampaignRepository.getInstance()
      .getPhoningTutorial()
      .then((markdown) => {
        setStatefulState(ViewState.Content({ content: markdown }))
      })
      .catch((error) => {
        setStatefulState(ViewStateUtils.networkError(error, fetchData))
      })
  }, [])

  useFocusEffect(fetchData)

  const TutorialContent = (resources: TutorialResources) => {
    return (
      <ScrollView style={styles.contentContainer}>
        <Markdown>{resources.content}</Markdown>
      </ScrollView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatefulView contentComponent={TutorialContent} state={statefulState} />
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
