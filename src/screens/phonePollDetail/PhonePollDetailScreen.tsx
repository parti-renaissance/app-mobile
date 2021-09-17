import React, {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { View, StyleSheet, Alert } from 'react-native'

import { StatefulView, ViewState } from '../shared/StatefulView'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { CloseButton } from '../shared/NavigationHeaderButton'
import ModalOverlay from '../shared/ModalOverlay'
import { useTheme } from '../../themes'
import { PhonePollDetailScreenProps } from '../../navigation'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import PhonePollDetailScreenLoaded from './PhonePollDetailScreenLoaded'
import PhonePollDetailInterruptionModalContent from './PhonePollDetailInterruptionModalContent'
import LoadingOverlay from '../shared/LoadingOverlay'
import i18n from '../../utils/i18n'
import { usePreventGoingBack } from '../shared/usePreventGoingBack.hook'
import { useBackHandler } from '../shared/useBackHandler.hook'
import {
  GetPhonePollDetailResourcesInteractor,
  PhonePollDetailResources,
} from '../../core/interactor/GetPhonePollDetailResourcesInteractor'

const PhonePollDetailScreen: FunctionComponent<PhonePollDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { theme } = useTheme()
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<PhonePollDetailResources>
  >(new ViewState.Loading())
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
    setStatefulState(new ViewState.Loading())

    new GetPhonePollDetailResourcesInteractor()
      .execute(route.params.data.campaignId, route.params.data.sessionId)
      .then((resources) => {
        navigation.setOptions({
          title: resources.poll.name,
        })
        setStatefulState(new ViewState.Content(resources))
      })
      .catch((error) => {
        console.error(error)
        setStatefulState(
          new ViewState.Error(
            GenericErrorMapper.mapErrorMessage(error),
            fetchResources,
          ),
        )
      })
  }

  useEffect(fetchResources, [
    route.params.data.campaignId,
    route.params.data.sessionId,
    navigation,
    theme,
  ])

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
      .then(() => navigation.pop())
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
              route={route}
              navigation={navigation}
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
