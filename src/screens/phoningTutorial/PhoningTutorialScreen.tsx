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
import { PhoningTutorialScreenProp } from '../../navigation'
import i18n from '../../utils/i18n'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { useFocusEffect } from '@react-navigation/core'

export interface TutorialResources {
  content: string
}

const PhoningTutorialScreen: FunctionComponent<PhoningTutorialScreenProp> = ({
  navigation,
}) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<TutorialResources>
  >(new ViewState.Loading())
  const [currentResources, setResources] = useState<TutorialResources>()

  useEffect(() => {
    navigation.setOptions({
      title: i18n.t('phoning.tutorial.title'),
    })
    setStatefulState(new ViewState.Content(currentResources))
  }, [navigation, currentResources])

  const fetchData = useCallback(() => {
    setStatefulState(new ViewState.Loading())
    PhoningCampaignRepository.getInstance()
      .getPhoningTutorial()
      .then((markdown) => {
        setResources({ content: markdown })
      })
      .catch((error) => {
        setStatefulState(
          new ViewState.Error(GenericErrorMapper.mapErrorMessage(error), () => {
            fetchData()
          }),
        )
      })
  }, [])

  useFocusEffect(fetchData)

  const TutorialContent = () => {
    return (
      <ScrollView style={styles.contentContainer}>
        <Markdown>{currentResources?.content}</Markdown>
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
