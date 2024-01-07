import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import Markdown from '@ronradtke/react-native-markdown-display'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import { ActionsNavigatorScreenProps } from '../../navigation/actions/ActionsNavigatorScreenProps'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { StatefulView } from '../shared/StatefulView'
import { ViewState } from '../shared/ViewState'
import { ViewStateUtils } from '../shared/ViewStateUtils'

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
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Markdown style={Typography.markdownStyle} mergeStyle={false}>
          {resources.content}
        </Markdown>
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
