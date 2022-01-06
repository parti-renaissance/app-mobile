import React, { useCallback, useEffect, useState } from 'react'
import { Alert, View, StyleSheet } from 'react-native'

import { PollDetailScreenProps } from '../../navigation'
import i18n from '../../utils/i18n'
import PollsRepository from '../../data/PollsRepository'
import { Poll } from '../../core/entities/Poll'
import PollDetailScreenLoaded from './PollDetailScreenLoaded'
import { StatefulView, ViewState } from '../shared/StatefulView'
import {
  CloseButton,
  NavigationHeaderButton,
} from '../shared/NavigationHeaderButton'
import ModalOverlay from '../shared/ModalOverlay'
import PollDetailTools from './PollDetailTools'
import { useBackHandler } from '../shared/useBackHandler.hook'
import { ViewStateUtils } from '../shared/ViewStateUtils'

const PollDetailScreen = ({ route, navigation }: PollDetailScreenProps) => {
  const [statefulState, setStatefulState] = useState<ViewState.Type<Poll>>(
    new ViewState.Loading(),
  )
  const [isModalVisible, setModalVisible] = useState(false)

  const askConfirmationBeforeLeaving = useCallback(() => {
    Alert.alert(
      i18n.t('polldetail.leave_alert.title'),
      i18n.t('polldetail.leave_alert.message'),
      [
        {
          text: i18n.t('polldetail.leave_alert.action'),
          onPress: () => navigation.goBack(),
          style: 'destructive',
        },
        {
          text: i18n.t('polldetail.leave_alert.cancel'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
  }, [navigation])

  useBackHandler(askConfirmationBeforeLeaving)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CloseButton onPress={() => askConfirmationBeforeLeaving()} />
      ),
    })
  }, [navigation, askConfirmationBeforeLeaving])

  const fetchPoll = () => {
    setStatefulState(new ViewState.Loading())
    PollsRepository.getInstance()
      .getPoll(route.params.pollId)
      .then((poll) => {
        navigation.setOptions({
          title: poll.name,
          headerRight: () => (
            <NavigationHeaderButton
              onPress={() => setModalVisible(true)}
              source={require('../../assets/images/blue/navigationBarLeftAccessoriesOutils.png')}
            />
          ),
        })
        setStatefulState(new ViewState.Content(poll))
      })
      .catch((error) => {
        console.error(error)
        setStatefulState(ViewStateUtils.networkError(error, fetchPoll))
      })
  }

  useEffect(fetchPoll, [route.params.pollId, navigation])
  return (
    <View style={styles.container}>
      <ModalOverlay
        modalVisible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <PollDetailTools />
      </ModalOverlay>
      <StatefulView
        state={statefulState}
        contentComponent={(poll) => (
          <PollDetailScreenLoaded poll={poll} navigation={navigation} />
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

export default PollDetailScreen
