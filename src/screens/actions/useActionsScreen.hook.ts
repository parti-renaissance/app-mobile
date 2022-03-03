import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import { Action } from '../../core/entities/Action'
import { GetActionsInteractor } from '../../core/interactor/GetActionsInteractor'
import { ActionsNavigatorScreenProps } from '../../navigation/ActionsNavigator'
import { Analytics } from '../../utils/Analytics'
import { ViewState } from '../shared/StatefulView'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { ActionRowViewModel } from './ActionRowViewModel'
import { ActionRowViewModelMapper } from './ActionRowViewModelMapper'

export const useActionsScreen = (): {
  statefulState: ViewState<ReadonlyArray<ActionRowViewModel>>
  onActionSelected: (actionId: string) => void
} => {
  const [statefulState, setStatefulState] = useState<
    ViewState<ReadonlyArray<ActionRowViewModel>>
  >(ViewState.Loading())

  const navigation = useNavigation<
    ActionsNavigatorScreenProps<'Actions'>['navigation']
  >()
  const isFocused = useIsFocused()
  const [fetchedActions] = useState(new Map<string, Action>())

  const fetch = useCallback(() => {
    setStatefulState(ViewState.Loading())
    new GetActionsInteractor()
      .execute()
      .then((actions) => {
        fetchedActions.clear()
        actions.forEach((action) => {
          fetchedActions.set(action.id, action)
        })
        const actionsViewModel = ActionRowViewModelMapper.map(actions)
        setStatefulState(ViewState.Content(actionsViewModel))
      })
      .catch((error) => {
        setStatefulState(ViewStateUtils.networkError(error, () => fetch()))
      })
  }, [fetchedActions])

  useEffect(() => {
    isFocused && fetch()
  }, [fetch, isFocused])

  const onActionSelected = (actionId: string) => {
    const action = fetchedActions.get(actionId)
    if (action === undefined) {
      return
    }
    switch (action.type) {
      case 'polls': {
        Analytics.logActionsPolls()
        navigation.navigate('Polls')
        break
      }
      case 'phoning': {
        navigation.navigate('Phoning')
        break
      }
      case 'doorToDoor': {
        navigation.navigate('DoorToDoor')
        break
      }
      case 'retaliation': {
        break
      }
    }
  }

  return {
    statefulState,
    onActionSelected,
  }
}
