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
import { router, useLocalSearchParams, Stack } from 'expo-router'


type PollDetailScreenProps = PollDetailModalNavigatorScreenProps<'PollDetail'>

const PollDetailScreen = ({ navigation }: PollDetailScreenProps) => {
  const { id } = useLocalSearchParams<{ id: string }>()
  console.log(id)
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
          onPress: () => router.push('..'),
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


  const fetchPoll = () => {
    setStatefulState(ViewState.Loading())
    PollsRepository.getInstance()
      .getPoll(id)
      .then((poll) => {
        setStatefulState(ViewState.Content(poll))
      })
      .catch((error) => {
        console.error(error)
        setStatefulState(ViewStateUtils.networkError(error, fetchPoll))
      })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchPoll, [id, navigation])
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: statefulState.state === 'content' ? statefulState.content.name : '',
        headerRight: () => (
          <NavigationHeaderButton
            onPress={() => setModalVisible(true)}
            source={require('../../assets/images/navigationBarLeftAccessoriesOutils.png')}
          />

        ), 
        headerLeft: () => (
          <CloseButton onPress={() => askConfirmationBeforeLeaving()} />
        ),

      }} />
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
