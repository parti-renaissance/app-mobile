import { useEffect, useState } from 'react'
import { Retaliation } from '../../core/entities/Retaliation'
import RetaliationRepository from '../../data/RetaliationRepository'
import { RetaliationService } from '../../data/RetaliationService'
import { ViewState } from '../shared/StatefulView'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { RetaliationCardViewModel } from './RetaliationCardViewModel'
import { RetaliationCardViewModelMapper } from './RetaliationCardViewModelMapper'

export const useRetaliationDetailScreen = (
  retaliationId: string,
): {
  statefulState: ViewState<RetaliationCardViewModel>
  onRetaliate: () => void
} => {
  const [statefulState, setStatefulState] = useState<ViewState<Retaliation>>(
    ViewState.Loading(),
  )

  useEffect(() => {
    const fetchRetaliation = () => {
      RetaliationRepository.getInstance()
        .getRetaliation(retaliationId)
        .then((retaliation) => setStatefulState(ViewState.Content(retaliation)))
        .catch((error) =>
          setStatefulState(
            ViewStateUtils.networkError(error, fetchRetaliation),
          ),
        )
    }
    fetchRetaliation()
  }, [retaliationId])

  const onRetaliate = () => {
    const retaliation = ViewState.unwrap(statefulState)
    if (retaliation === undefined) {
      return
    }
    RetaliationService.retaliate(retaliation)
  }

  return {
    statefulState: ViewState.map(
      statefulState,
      RetaliationCardViewModelMapper.map,
    ),
    onRetaliate,
  }
}
