import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { NotificationCategory } from '../../../core/entities/Notification'
import {
  GetNotificationsInteractor,
  GetNotificationsInteractorResult,
} from '../../../core/interactor/GetNotificationsInteractor'
import { NotificationsScreenProps } from '../../../navigation'
import { Colors } from '../../../styles'
import i18n from '../../../utils/i18n'
import { GenericErrorMapper } from '../../shared/ErrorMapper'
import { StatefulView, ViewState } from '../../shared/StatefulView'

const NotificationsContent = (content: GetNotificationsInteractorResult) => {
  // TODO: implement SectionList here
  return (
    <View>
      <Text>{content.notifications.length}</Text>
    </View>
  )
}

const NotificationsScreen = (props: NotificationsScreenProps) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<GetNotificationsInteractorResult>
  >(new ViewState.Loading())

  const fetchData = useCallback(() => {
    new GetNotificationsInteractor()
      .execute(props.route.params.category)
      .then((result) => {
        setStatefulState(new ViewState.Content(result))
      })
      .catch((error) => {
        setStatefulState(
          new ViewState.Error(GenericErrorMapper.mapErrorMessage(error), () => {
            setStatefulState(new ViewState.Loading())
            fetchData()
          }),
        )
      })
  }, [props.route.params.category])
  useEffect(() => {
    props.navigation.setOptions({
      title: getTitle(props.route.params.category),
    })
    fetchData()
  }, [props, fetchData])
  return (
    <SafeAreaView style={styles.container}>
      <StatefulView
        state={statefulState}
        contentComponent={(result) => {
          return NotificationsContent(result)
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
})

function getTitle(category: NotificationCategory): string {
  switch (category) {
    case 'local':
      return i18n.t('notificationmenu.local')
    case 'national':
      return i18n.t('notificationmenu.national')
  }
}

export default NotificationsScreen
