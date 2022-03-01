import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import PollDetailProgressBar from './PollDetailProgressBar'
import { Colors, Spacing } from '../../styles'
import PollDetailNavigationButtons from './PollDetailNavigationButtons'
import { Poll } from '../../core/entities/Poll'
import { PollDetailComponentProvider } from './providers/PollDetailComponentProvider'
import { PollDetailProgressBarViewModelMapper } from './PollDetailProgressBarViewModelMapper'
import { PollDetailNavigationButtonsViewModelMapper } from './PollDetailNavigationButtonsViewModelMapper'
import PollsRepository from '../../data/PollsRepository'
import LoadingOverlay from '../shared/LoadingOverlay'
import { LocationManager } from '../../utils/LocationManager'
import { CompoundPollDetailComponentProvider } from './providers/CompoundPollDetailComponentProvider'
import { PollDetailRemoteQuestionComponentProvider } from './providers/PollDetailRemoteQuestionComponentProvider'
import { PollDetailUserInformationsComponentProvider } from './providers/PollDetailUserInformationsComponentProvider'
import { PollResult } from '../../core/entities/PollResult'
import { AlertUtils } from '../shared/AlertUtils'
import { useNavigation } from '@react-navigation/native'
import { PollDetailModalNavigatorScreenProps } from '../../navigation/PollDetailModalNavigator'

type Props = Readonly<{
  poll: Poll
}>

const PollDetailScreenLoaded: FunctionComponent<Props> = ({ poll }) => {
  const navigation = useNavigation<
    PollDetailModalNavigatorScreenProps<'PollDetail'>['navigation']
  >()
  const [currentStep, setStep] = useState<number>(0)
  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])
  const [provider] = useState<PollDetailComponentProvider<PollResult>>(
    new CompoundPollDetailComponentProvider(
      new PollDetailRemoteQuestionComponentProvider(poll, forceUpdate),
      new PollDetailUserInformationsComponentProvider(forceUpdate),
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

    const location = await LocationManager.getLatestLocation()
    PollsRepository.getInstance()
      .sendPollAnswers(poll, provider.getResult(), location)
      .then(() => {
        navigation.replace('PollDetailSuccess', {
          pollId: poll.uuid,
          title: poll.name,
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
  viewPager: {
    flex: 1,
  },
})

export default PollDetailScreenLoaded
