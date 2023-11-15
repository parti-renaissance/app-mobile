import React, { useCallback, useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Poll } from '../../core/entities/Poll'
import PollsRepository from '../../data/PollsRepository'
import { PollDetailModalNavigatorScreenProps } from '../../navigation/pollDetailModal/PollDetailModalNavigatorScreenProps'
import i18n from '../../utils/i18n'
import ModalOverlay from '../shared/ModalOverlay'
import {
  CloseButton,
  NavigationHeaderButton,
} from '../shared/NavigationHeaderButton'
import { StatefulView } from '../shared/StatefulView'
import { useBackHandler } from '../shared/useBackHandler.hook'
import { ViewState } from '../shared/ViewState'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import PollDetailScreenLoaded from './PollDetailScreenLoaded'
import PollDetailTools from './PollDetailTools'

type PollDetailScreenProps = PollDetailModalNavigatorScreenProps<'PollDetail'>

const PollDetailScreen = ({ route, navigation }: PollDetailScreenProps) => {
  const [statefulState, setStatefulState] = useState<ViewState<Poll>>(
    ViewState.Loading(),
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
    setStatefulState(ViewState.Loading())
    PollsRepository.getInstance()
      .getPoll(route.params.pollId)
      .then((poll) => {
        navigation.setOptions({
          title: poll.name,
          headerRight: () => (
            <NavigationHeaderButton
              onPress={() => setModalVisible(true)}
              source={require('../../assets/images/navigationBarLeftAccessoriesOutils.png')}
            />
          ),
        })
        setStatefulState(ViewState.Content(poll))
      })
      .catch((error) => {
        console.error(error)
        setStatefulState(ViewStateUtils.networkError(error, fetchPoll))
      })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        contentComponent={(poll) => <PollDetailScreenLoaded poll={poll} />}
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
