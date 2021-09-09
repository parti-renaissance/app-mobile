import React, { useEffect, useState } from 'react'
import { BackHandler, View, StyleSheet } from 'react-native'

import { Poll } from '../../core/entities/Poll'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { CloseButton } from '../shared/NavigationHeaderButton'
import ModalOverlay from '../shared/ModalOverlay'
import { useTheme } from '../../themes'
import { PhonePollDetailScreenProps } from '../../navigation'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import PhonePollDetailScreenLoaded from './PhonePollDetailScreenLoaded'
import PhonePollDetailInterruptionModalContent from './PhonePollDetailInterruptionModalContent'
import { PhoningSessionCallStatus } from '../../core/entities/PhoningSessionConfiguration'

// TODO: (Pierre Felgines) Change status with values from webservice
const STATUSES: Array<PhoningSessionCallStatus> = [
  {
    code: 'interrupted-dont-remind',
    label: 'Appel interrompu, ne pas rappeler',
  },
  {
    code: 'interrupted',
    label: 'Appel interrompu',
  },
]

const PhonePollDetailScreen = ({
  route,
  navigation,
}: PhonePollDetailScreenProps) => {
  const { theme } = useTheme()
  const [statefulState, setStatefulState] = useState<ViewState.Type<Poll>>(
    new ViewState.Loading(),
  )
  const [isModalVisible, setModalVisible] = useState(false)

  React.useLayoutEffect(() => {
    const askConfirmationBeforeLeaving = () => {
      setModalVisible(true)
    }

    const updateNavigationHeader = () => {
      navigation.setOptions({
        headerLeft: () => (
          <CloseButton onPress={() => askConfirmationBeforeLeaving()} />
        ),
      })
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        askConfirmationBeforeLeaving()
        return true
      },
    )

    updateNavigationHeader()
    return () => backHandler.remove()
  }, [navigation])

  const fetchPoll = () => {
    setStatefulState(new ViewState.Loading())
    PhoningCampaignRepository.getInstance()
      .getPhoningCampaignPoll(route.params.campaignId)
      .then((poll) => {
        navigation.setOptions({ title: poll.name })
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

  useEffect(fetchPoll, [route.params.campaignId, navigation, theme])
  return (
    <View style={styles.container}>
      <ModalOverlay
        modalVisible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <PhonePollDetailInterruptionModalContent callStatuses={STATUSES} />
      </ModalOverlay>
      <StatefulView
        state={statefulState}
        contentComponent={(poll) => (
          <PhonePollDetailScreenLoaded poll={poll} navigation={navigation} />
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
