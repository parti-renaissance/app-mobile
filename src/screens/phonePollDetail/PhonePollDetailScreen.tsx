import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { View, StyleSheet, Alert } from 'react-native'

import { Poll } from '../../core/entities/Poll'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { CloseButton } from '../shared/NavigationHeaderButton'
import ModalOverlay from '../shared/ModalOverlay'
import { useTheme } from '../../themes'
import { PhonePollDetailScreenProps, Screen } from '../../navigation'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import PhonePollDetailScreenLoaded from './PhonePollDetailScreenLoaded'
import PhonePollDetailInterruptionModalContent from './PhonePollDetailInterruptionModalContent'
import { PhoningSessionCallStatus } from '../../core/entities/PhoningSessionConfiguration'
import LoadingOverlay from '../shared/LoadingOverlay'
import i18n from '../../utils/i18n'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'
import { useBackHandler } from '../shared/useBackHandler.hook'

const PhonePollDetailScreen: FunctionComponent<PhonePollDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { theme } = useTheme()
  const [statefulState, setStatefulState] = useState<ViewState.Type<Poll>>(
    new ViewState.Loading(),
  )
  const [callStatuses, setCallStatuses] = useState<
    Array<PhoningSessionCallStatus>
  >([])
  const [isModalVisible, setModalVisible] = useState(false)
  const [isLoading, setLoading] = useState(false)

  usePreventGoingBack()

  const fetchInterruptionStatuses = useCallback(() => {
    const sessionId = route.params.data.sessionId
    PhoningCampaignRepository.getInstance()
      .getPhoningSessionConfiguration(sessionId)
      .then((configuration) => configuration.callStatus.interrupted)
      .then(setCallStatuses)
  }, [route.params.data.sessionId])

  useEffect(() => fetchInterruptionStatuses(), [fetchInterruptionStatuses])

  const askConfirmationBeforeLeaving = () => {
    setModalVisible(true)
  }

  useLayoutEffect(() => {
    const updateNavigationHeader = () => {
      navigation.setOptions({
        headerLeft: () => (
          <CloseButton onPress={() => askConfirmationBeforeLeaving()} />
        ),
        // (Pierre Felgines) 10/09/2021 We need this for the text to be centered
        headerRight: () => <View />,
      })
    }
    updateNavigationHeader()
  }, [navigation])

  useBackHandler(askConfirmationBeforeLeaving)

  const fetchPoll = () => {
    setStatefulState(new ViewState.Loading())
    PhoningCampaignRepository.getInstance()
      .getPhoningCampaignPoll(route.params.data.campaignId)
      .then((poll) => {
        navigation.setOptions({
          title: poll.name,
        })
        setStatefulState(new ViewState.Content(poll))
      })
      .catch((error) => {
        console.error(error)
        setStatefulState(
          new ViewState.Error(
            GenericErrorMapper.mapErrorMessage(error),
            fetchPoll,
          ),
        )
      })
  }

  useEffect(fetchPoll, [route.params.data.campaignId, navigation, theme])

  const displayError = (error: string, statusCode: string) => {
    Alert.alert(
      i18n.t('common.error_title'),
      error,
      [
        {
          text: i18n.t('common.error_retry'),
          onPress: () => sendInterruptionStatusAndLeave(statusCode),
        },
        {
          text: i18n.t('common.cancel'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
  }

  const sendInterruptionStatusAndLeave = (statusCode: string) => {
    setLoading(true)
    PhoningCampaignRepository.getInstance()
      .updatePhoningSessionStatus(route.params.data.sessionId, statusCode)
      .then(() => navigation.navigate(Screen.phoning))
      .catch((error) =>
        displayError(GenericErrorMapper.mapErrorMessage(error), statusCode),
      )
      .finally(() => setLoading(false))
  }

  const onInterruption = (statusCode: string) => {
    setModalVisible(false)
    sendInterruptionStatusAndLeave(statusCode)
  }

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={isLoading} />
      <ModalOverlay
        modalVisible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <PhonePollDetailInterruptionModalContent
          callStatuses={callStatuses}
          onInterruption={onInterruption}
        />
      </ModalOverlay>
      <StatefulView
        state={statefulState}
        contentComponent={(poll) => (
          <PhonePollDetailScreenLoaded
            poll={poll}
            route={route}
            navigation={navigation}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default PhonePollDetailScreen
