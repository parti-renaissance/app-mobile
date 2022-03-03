import { useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import { Retaliation } from '../../core/entities/Retaliation'
import RetaliationRepository from '../../data/RetaliationRepository'
import { RetaliationService } from '../../data/RetaliationService'
import { ActionsNavigatorScreenProps } from '../../navigation/ActionsNavigator'
import { ViewState } from '../shared/StatefulView'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { RetaliationListCardViewModel } from './RetaliationListCardViewModel'
import { RetaliationListCardViewModelMapper } from './RetaliationListCardViewModelMapper'

export const useRetaliationsScreen = (): {
  statefulState: ViewState<Array<RetaliationListCardViewModel>>
  isRefreshing: boolean
  onRefresh: () => void
  onRetaliationSelected: (id: string) => void
  onRetaliateSelected: (id: string) => void
} => {
  const navigation = useNavigation<
    ActionsNavigatorScreenProps<'Retaliations'>['navigation']
  >()
  const [statefulState, setStatefulState] = useState<
    ViewState<Array<Retaliation>>
  >(ViewState.Loading())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchRetaliations = useCallback(() => {
    if (statefulState.state === 'content') {
      setIsRefreshing(true)
    } else {
      setStatefulState(ViewState.Loading())
    }
    RetaliationRepository.getInstance()
      .getRetaliations()
      .then((retaliations) => setStatefulState(ViewState.Content(retaliations)))
      .catch((error) => {
        setStatefulState(ViewStateUtils.networkError(error, fetchRetaliations))
      })
      .finally(() => setIsRefreshing(false))
  }, [statefulState])

  useEffect(() => {
    fetchRetaliations()
  }, [])

  const onRetaliationSelected = (id: string) => {
    navigation.navigate('RetaliationDetail', { retaliationId: id })
  }

  const onRetaliateSelected = (id: string) => {
    const retaliations = ViewState.unwrap(statefulState) ?? []
    const retaliation = retaliations.find((current) => current.id === id)
    if (retaliation === undefined) {
      return
    }
    RetaliationService.retaliate({
      content: retaliation.body,
      url: retaliation.sourceUrl,
    })
  }

  return {
    statefulState: ViewState.map(statefulState, (retaliations) =>
      retaliations.map(RetaliationListCardViewModelMapper.map),
    ),
    isRefreshing,
    onRefresh: fetchRetaliations,
    onRetaliationSelected,
    onRetaliateSelected,
  }
}
