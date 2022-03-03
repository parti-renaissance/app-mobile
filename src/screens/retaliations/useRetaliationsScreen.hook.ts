import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
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
  onRetaliationSelected: (id: string) => void
  onRetaliateSelected: (id: string) => void
} => {
  const navigation = useNavigation<
    ActionsNavigatorScreenProps<'Retaliations'>['navigation']
  >()
  const [statefulState, setStatefulState] = useState<
    ViewState<Array<Retaliation>>
  >(ViewState.Loading())

  useFocusEffect(
    useCallback(() => {
      const fetchRetaliations = () => {
        RetaliationRepository.getInstance()
          .getRetaliations()
          .then((retaliations) =>
            setStatefulState(ViewState.Content(retaliations)),
          )
          .catch((error) => {
            setStatefulState(
              ViewStateUtils.networkError(error, fetchRetaliations),
            )
          })
      }
      fetchRetaliations()
    }, []),
  )

  const onRetaliationSelected = (id: string) => {
    navigation.navigate('RetaliationDetail', { retaliationId: id })
  }

  const onRetaliateSelected = (id: string) => {
    const retaliations = ViewState.unwrap(statefulState) ?? []
    const retaliation = retaliations.find((current) => current.id === id)
    if (retaliation === undefined) {
      return
    }
    RetaliationService.retaliate(retaliation)
  }

  return {
    statefulState: ViewState.map(statefulState, (retaliations) =>
      retaliations.map(RetaliationListCardViewModelMapper.map),
    ),
    onRetaliationSelected,
    onRetaliateSelected,
  }
}
