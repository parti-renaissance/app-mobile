import React, { useEffect, useState } from 'react'
import { BackHandler, View, StyleSheet, Text } from 'react-native'

import { Poll } from '../../core/entities/Poll'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { CloseButton } from '../shared/NavigationHeaderButton'
import ModalOverlay from '../shared/ModalOverlay'
import { useTheme } from '../../themes'
import { PhonePollDetailScreenProps } from '../../navigation'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import PhonePollDetailScreenLoaded from './PhonePollDetailScreenLoaded'

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
        <Text>TODO</Text>
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
