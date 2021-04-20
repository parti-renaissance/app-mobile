import React, { useCallback, useEffect, useState } from 'react'
import {
  SectionList,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { NotificationCategory } from '../../../core/entities/Notification'
import {
  GetNotificationsInteractor,
  GetNotificationsInteractorResult,
} from '../../../core/interactor/GetNotificationsInteractor'
import { NotificationsScreenProps } from '../../../navigation'
import { Colors, Spacing, Typography } from '../../../styles'
import i18n from '../../../utils/i18n'
import { GenericErrorMapper } from '../../shared/ErrorMapper'
import { StatefulView, ViewState } from '../../shared/StatefulView'
import NotificationRowView from './NotificationRowView'
import { NotificationRowViewModel } from './NotificationViewModel'
import { NotificationViewModelMapper } from './NotificationViewModelMapper'

const NotificationsContent = (
  category: NotificationCategory,
  content: GetNotificationsInteractorResult,
) => {
  const viewModel = NotificationViewModelMapper.map(
    category,
    content.isPushEnabled,
    content.notifications,
    content.notificationsEnabled,
  )
  const onNotificationChanged = (id: string, isSelected: boolean) => {
    // TODO
  }
  const renderItem = ({
    item,
  }: SectionListRenderItemInfo<NotificationRowViewModel>) => {
    return (
      <NotificationRowView
        viewModel={item}
        onSelectionChanged={onNotificationChanged}
      />
    )
  }
  return (
    <View>
      <SectionList
        stickySectionHeadersEnabled={false}
        sections={viewModel.sections}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => {
          return <Text style={styles.section}>{title}</Text>
        }}
        keyExtractor={(item) => {
          return item.id
        }}
      />
    </View>
  )
}

const NotificationsScreen = (props: NotificationsScreenProps) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<GetNotificationsInteractorResult>
  >(new ViewState.Loading())
  const category = props.route.params.category

  const fetchData = useCallback(() => {
    new GetNotificationsInteractor()
      .execute(category)
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
  }, [category])
  useEffect(() => {
    props.navigation.setOptions({
      title: getTitle(category),
    })
    fetchData()
  }, [props, fetchData, category])
  return (
    <SafeAreaView style={styles.container}>
      <StatefulView
        state={statefulState}
        contentComponent={(result) => {
          return NotificationsContent(category, result)
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
  section: {
    ...Typography.headline,
    marginBottom: Spacing.unit,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.mediumMargin,
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
