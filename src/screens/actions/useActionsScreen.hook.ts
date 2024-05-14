import { useCallback, useEffect, useRef, useState } from 'react'
import { Action } from '@/core/entities/Action'
import { GetActionsInteractor } from '@/core/interactor/GetActionsInteractor'
import { Analytics } from '@/utils/Analytics'
import { useFocusEffect } from '@react-navigation/native'
import { router } from 'expo-router'
import { ViewState } from '../shared/ViewState'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { ActionRowViewModel } from './ActionRowViewModel'
import { ActionRowViewModelMapper } from './ActionRowViewModelMapper'

export const useActionsScreen = (): {
  statefulState: ViewState<ReadonlyArray<ActionRowViewModel>>
  onActionSelected: (actionId: string) => void
} => {
  const [statefulState, setStatefulState] = useState<ViewState<ReadonlyArray<ActionRowViewModel>>>(ViewState.Loading())

  const stateRef = useRef(statefulState)
  useEffect(() => {
    stateRef.current = statefulState
  }, [statefulState])

  const [fetchedActions] = useState(new Map<string, Action>())

  const fetch = useCallback(() => {
    if (stateRef.current.state !== 'content') {
      setStatefulState(ViewState.Loading())
    }
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useFocusEffect(useCallback(fetch, []))

  const onActionSelected = (actionId: string) => {
    const action = fetchedActions.get(actionId)
    if (action === undefined) {
      return
    }
    switch (action.type) {
      case 'polls': {
        Analytics.logActionsPolls()
        router.push('/actions/polls/')
        break
      }
      case 'phoning': {
        router.push('/actions/phoning/')
        break
      }
      case 'doorToDoor': {
        router.push('/porte-a-porte/')
        break
      }
      case 'retaliation': {
        router.push('/actions/retaliation/')
        break
      }
    }
  }

  return {
    statefulState,
    onActionSelected,
  }
}
