import React, { useCallback, useEffect, useState } from 'react'
import { Text, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Action } from '../../core/entities/Action'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { ActionRow } from './ActionRow'
import { ActionRowViewModel } from './ActionRowViewModel'
import { ActionRowViewModelMapper } from './ActionRowViewModelMapper'
import { GetActionsInteractor } from '../../core/interactor/GetActionsInteractor'
import { ActionsScreenProp, Screen } from '../../navigation'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { useIsFocused } from '@react-navigation/native'
import { Analytics } from '../../utils/Analytics'

const ActionsScreen = ({ navigation }: ActionsScreenProp) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<ReadonlyArray<ActionRowViewModel>>
  >(new ViewState.Loading())

  const isFocused = useIsFocused()
  const [fetchedActions] = useState(new Map<number, Action>())

  const fetch = useCallback(() => {
    setStatefulState(new ViewState.Loading())
    new GetActionsInteractor()
      .execute()
      .then((actions) => {
        fetchedActions.clear()
        actions.forEach((action) => {
          fetchedActions.set(action.id, action)
        })
        const actionsViewModel = ActionRowViewModelMapper.map(actions)
        setStatefulState(new ViewState.Content(actionsViewModel))
      })
      .catch((error) => {
        setStatefulState(ViewStateUtils.networkError(error, () => fetch()))
      })
  }, [fetchedActions])

  useEffect(() => {
    isFocused && fetch()
  }, [fetch, isFocused])

  const renderItem = ({ item }: ListRenderItemInfo<ActionRowViewModel>) => {
    return (
      <ActionRow
        viewModel={item}
        onPress={async () => {
          if (item.screen === Screen.pollsNavigator) {
            await Analytics.logActionsPolls()
          }
          navigation.navigate(item.screen)
        }}
      />
    )
  }

  const ActionContent = (actions: ReadonlyArray<ActionRowViewModel>) => {
    return (
      <FlatList
        data={actions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <Text style={styles.title}>{i18n.t('actions.title')}</Text>
        }
        contentContainerStyle={styles.contentContainer}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView state={statefulState} contentComponent={ActionContent} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.margin,
    paddingTop: Spacing.largeMargin,
  },
  title: {
    ...Typography.highlightedLargeTitle,
    marginBottom: Spacing.mediumMargin,
  },
})

export default ActionsScreen
