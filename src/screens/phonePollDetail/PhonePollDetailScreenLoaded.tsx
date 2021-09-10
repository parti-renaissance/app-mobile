import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Colors, Spacing } from '../../styles'
import PollDetailNavigationButtons from '../pollDetail/PollDetailNavigationButtons'
import { Poll } from '../../core/entities/Poll'
import { PollDetailComponentProvider } from '../pollDetail/providers/PollDetailComponentProvider'
import { PollDetailProgressBarViewModelMapper } from '../pollDetail/PollDetailProgressBarViewModelMapper'
import { PollDetailNavigationButtonsViewModelMapper } from '../pollDetail/PollDetailNavigationButtonsViewModelMapper'
import LoadingOverlay from '../shared/LoadingOverlay'

import { StackNavigationProp } from '@react-navigation/stack'
import { PhonePollDetailModalParamList, Screen } from '../../navigation'
import { PollDetailRemoteQuestionComponentProvider } from '../pollDetail/providers/PollDetailRemoteQuestionComponentProvider'
import { PollRemoteQuestionResult } from '../../core/entities/PollResult'
import PollDetailProgressBar from '../pollDetail/PollDetailProgressBar'
import { CompoundPollDetailComponentProvider } from '../pollDetail/providers/CompoundPollDetailComponentProvider'
import { PhonePollDetailSatisfactionComponentProvider } from './providers/PhonePollDetailSatisfactionComponentProvider'
import { PhoningSatisfactionQuestion } from '../../core/entities/PhoningSessionConfiguration'

type Props = Readonly<{
  poll: Poll
  navigation: StackNavigationProp<
    PhonePollDetailModalParamList,
    typeof Screen.phonePollDetail
  >
}>

// TODO: (Pierre Felgines) Remove this stub data
const QUESTIONS: Array<PhoningSatisfactionQuestion> = [
  {
    code: 'postal_code_checked',
    label: 'Code postal à jour ?',
    type: 'boolean',
  },
  {
    code: 'become_caller',
    label: 'Souhaiteriez-vous devenir appelant ?',
    type: 'boolean',
  },
  {
    code: 'call_more',
    label: 'Souhaitez-vous être rappelé plus souvent ?',
    type: 'boolean',
  },
]

const PhonePollDetailScreenLoaded: FunctionComponent<Props> = ({
  poll,
  navigation,
}) => {
  const [currentStep, setStep] = useState<number>(0)
  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])
  const [provider] = useState<
    PollDetailComponentProvider<PollRemoteQuestionResult>
  >(
    new CompoundPollDetailComponentProvider(
      new PollDetailRemoteQuestionComponentProvider(poll, forceUpdate),
      new PhonePollDetailSatisfactionComponentProvider(QUESTIONS, forceUpdate),
    ),
  )

  const [isLoading, setIsLoading] = useState(false)

  const progressViewModel = PollDetailProgressBarViewModelMapper.map(
    currentStep,
    provider.getNumberOfSteps(),
    provider.getStepType(currentStep),
  )
  const isNextStepAvailable = () => {
    return currentStep < provider.getNumberOfSteps() - 1
  }
  const isPreviousStepAvailable = () => {
    return currentStep > 0
  }
  const navigationViewModel = PollDetailNavigationButtonsViewModelMapper.map(
    isPreviousStepAvailable(),
    isNextStepAvailable(),
    provider.isDataComplete(currentStep),
  )

  const [pageWidth, setPageWidth] = useState<number>(0)
  const flatListViewRef = useRef<FlatList>(null)

  useEffect(() => {
    flatListViewRef.current?.scrollToIndex({
      animated: true,
      index: currentStep,
    })
  }, [currentStep])

  const postAnswers = async () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      navigation.navigate(Screen.phonePollDetailSuccess, {
        title: poll.name,
      })
    }, 2000)
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay visible={isLoading} />
      <View style={styles.content}>
        <PollDetailProgressBar
          style={styles.progress}
          viewModel={progressViewModel}
        />
        <View
          style={styles.questionContainer}
          onLayout={(event) => {
            setPageWidth(event.nativeEvent.layout.width)
          }}
        >
          <FlatList
            ref={flatListViewRef}
            scrollEnabled={false}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[...Array(provider.getNumberOfSteps()).keys()]}
            renderItem={({ item }) => {
              return (
                <View key={item} style={{ width: pageWidth }}>
                  {provider.getStepComponent(item)}
                </View>
              )
            }}
            extraData={provider}
            getItemLayout={(_data, index) => {
              return { length: pageWidth, offset: pageWidth * index, index }
            }}
            snapToInterval={pageWidth}
            keyExtractor={(item) => item.toString()}
            windowSize={5}
          />
        </View>
        <PollDetailNavigationButtons
          viewModel={navigationViewModel}
          onPrevious={() => setStep(currentStep - 1)}
          onNext={() => setStep(currentStep + 1)}
          onSubmit={postAnswers}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  content: {
    flex: 1,
    overflow: 'hidden', // hide the shadow on the bottom
  },
  progress: {
    paddingHorizontal: Spacing.margin,
  },
  questionContainer: {
    flexGrow: 1,
  },
  viewPager: {
    flex: 1,
  },
})

export default PhonePollDetailScreenLoaded
