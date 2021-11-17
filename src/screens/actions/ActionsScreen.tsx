import React, { useCallback, useEffect, useState } from 'react'
import { Text, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Action } from '../../core/entities/Action'
import ActionsRepository from '../../data/ActionsRepository'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { ActionRow } from './ActionRow'
import { ActionRowViewModel } from './ActionRowViewModel'
import { ActionRowViewModelMapper } from './ActionRowViewModelMapper'
import { useTheme } from '../../themes'
import { GetPhoningStateInteractor } from '../../core/interactor/GetPhoningStateInteractor'
import { PhoningState } from '../../core/entities/PhoningState'
import { ActionsScreenProp } from '../../navigation'

const ActionsScreen = ({ navigation }: ActionsScreenProp) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<ReadonlyArray<ActionRowViewModel>>
  >(new ViewState.Loading())

  const { theme } = useTheme()
  const [fetchedActions] = useState(new Map<number, Action>())

  const fetch = useCallback(
    (enablePhoning: boolean) => {
      setStatefulState(new ViewState.Loading())
      ActionsRepository.getInstance()
        .getActions(enablePhoning)
        .then((actions) => {
          fetchedActions.clear()
          actions.forEach((action) => {
            fetchedActions.set(action.id, action)
          })
          const actionsViewModel = ActionRowViewModelMapper.map(theme, actions)
          setStatefulState(new ViewState.Content(actionsViewModel))
        })
        .catch((error) => {
          setStatefulState(
            new ViewState.Error(GenericErrorMapper.mapErrorMessage(error), () =>
              fetch(enablePhoning),
            ),
          )
        })
    },
    [fetchedActions, theme],
  )

  useEffect(
    useCallback(() => {
      new GetPhoningStateInteractor()
        .execute()
        .then((state) => fetch(state === PhoningState.ENABLED))
        .catch(fetch)
    }, [fetch]),
    [theme],
  )

  const renderItem = ({ item }: ListRenderItemInfo<ActionRowViewModel>) => {
    return (
      <ActionRow
        viewModel={item}
        onPress={() => navigation.navigate(item.screen)}
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
    ...Typography.title,
    marginBottom: Spacing.mediumMargin,
  },
})

export default ActionsScreen
