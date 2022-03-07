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
import { PollDetailRemoteQuestionComponentProvider } from '../pollDetail/providers/PollDetailRemoteQuestionComponentProvider'
import PollDetailProgressBar from '../pollDetail/PollDetailProgressBar'
import { CompoundPollDetailComponentProvider } from '../pollDetail/providers/CompoundPollDetailComponentProvider'
import { PhonePollDetailSatisfactionComponentProvider } from './providers/PhonePollDetailSatisfactionComponentProvider'
import { PhoningSatisfactionQuestion } from '../../core/entities/PhoningSessionConfiguration'
import { PhonePollResult } from '../../core/entities/PhonePollResult'
import { SendPhonePollAnswersInteractor } from '../../core/interactor/SendPhonePollAnswersInteractor'
import { AlertUtils } from '../shared/AlertUtils'
import { useNavigation, useRoute } from '@react-navigation/native'
import { PhoningSessionModalNavigatorScreenProps } from '../../navigation/phoningSessionModal/PhoningSessionModalNavigatorScreenProps'

type Props = Readonly<{
  poll: Poll
  satisfactionQuestions: Array<PhoningSatisfactionQuestion>
}>

const PhonePollDetailScreenLoaded: FunctionComponent<Props> = ({
  poll,
  satisfactionQuestions,
}) => {
  const navigation = useNavigation<
    PhoningSessionModalNavigatorScreenProps<'PhonePollDetail'>['navigation']
  >()
  const route = useRoute<
    PhoningSessionModalNavigatorScreenProps<'PhonePollDetail'>['route']
  >()
  const [currentStep, setStep] = useState<number>(0)
  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])
  const [provider] = useState<PollDetailComponentProvider<PhonePollResult>>(
    new CompoundPollDetailComponentProvider(
      new PollDetailRemoteQuestionComponentProvider(poll, forceUpdate),
      new PhonePollDetailSatisfactionComponentProvider(
        satisfactionQuestions,
        forceUpdate,
      ),
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

  const postAnswers = () => {
    setIsLoading(true)
    new SendPhonePollAnswersInteractor()
      .execute(poll, route.params.data.sessionId, provider.getResult())
      .then(() => {
        navigation.replace('PhonePollDetailSuccess', {
          title: poll.name,
          data: route.params.data,
        })
      })
      .catch((error) => {
        AlertUtils.showNetworkAlert(error, postAnswers)
      })
      .finally(() => setIsLoading(false))
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
})

export default PhonePollDetailScreenLoaded
