import React, {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { View, StyleSheet } from 'react-native'

import { StatefulView } from '../shared/StatefulView'
import { ViewState } from '../shared/ViewState'
import { CloseButton } from '../shared/NavigationHeaderButton'
import ModalOverlay from '../shared/ModalOverlay'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import PhonePollDetailScreenLoaded from './PhonePollDetailScreenLoaded'
import PhonePollDetailInterruptionModalContent from './PhonePollDetailInterruptionModalContent'
import LoadingOverlay from '../shared/LoadingOverlay'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'
import { useBackHandler } from '../shared/useBackHandler.hook'
import {
  GetPhonePollDetailResourcesInteractor,
  PhonePollDetailResources,
} from '../../core/interactor/GetPhonePollDetailResourcesInteractor'
import { AlertUtils } from '../shared/AlertUtils'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { PhoningSessionModalNavigatorScreenProps } from '../../navigation/phoningSessionModal/PhoningSessionModalNavigatorScreenProps'

type PhonePollDetailScreenProps = PhoningSessionModalNavigatorScreenProps<'PhonePollDetail'>

const PhonePollDetailScreen: FunctionComponent<PhonePollDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const [statefulState, setStatefulState] = useState<
    ViewState<PhonePollDetailResources>
  >(ViewState.Loading())
  const [isModalVisible, setModalVisible] = useState(false)
  const [isLoading, setLoading] = useState(false)

  usePreventGoingBack()

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

  const fetchResources = () => {
    setStatefulState(ViewState.Loading())

    new GetPhonePollDetailResourcesInteractor()
      .execute(route.params.data.campaignId, route.params.data.sessionId)
      .then((resources) => {
        navigation.setOptions({
          title: resources.poll.name,
        })
        setStatefulState(ViewState.Content(resources))
      })
      .catch((error) => {
        console.error(error)
        setStatefulState(ViewStateUtils.networkError(error, fetchResources))
      })
  }

  useEffect(fetchResources, [
    route.params.data.campaignId,
    route.params.data.sessionId,
    navigation,
  ])

  const sendInterruptionStatusAndLeave = (statusCode: string) => {
    setLoading(true)
    PhoningCampaignRepository.getInstance()
      .updatePhoningSessionStatus(route.params.data.sessionId, statusCode)
      .then(() => navigation.pop())
      .catch((error) =>
        AlertUtils.showNetworkAlert(error, () =>
          sendInterruptionStatusAndLeave(statusCode),
        ),
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
      <StatefulView
        state={statefulState}
        contentComponent={(resources) => (
          <>
            <ModalOverlay
              modalVisible={isModalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <PhonePollDetailInterruptionModalContent
                callStatuses={resources.configuration.callStatus.interrupted}
                onInterruption={onInterruption}
              />
            </ModalOverlay>
            <PhonePollDetailScreenLoaded
              poll={resources.poll}
              satisfactionQuestions={
                resources.configuration.satisfactionQuestions
              }
            />
          </>
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
