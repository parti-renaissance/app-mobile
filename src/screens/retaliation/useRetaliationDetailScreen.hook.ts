import { useEffect, useState } from 'react'
import { Retaliation } from '../../core/entities/Retaliation'
import RetaliationRepository from '../../data/RetaliationRepository'
import { RetaliationService } from '../../data/RetaliationService'
import { ViewState } from '../shared/ViewState'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { RetaliationDetailViewModel } from './RetaliationDetailViewModel'
import { RetaliationDetailViewModelMapper } from './RetaliationDetailViewModelMapper'

export const useRetaliationDetailScreen = (
  retaliationId: string,
): {
  statefulState: ViewState<RetaliationDetailViewModel>
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
    RetaliationService.retaliate({
      content: retaliation.body,
      url: retaliation.sourceUrl,
    })
  }

  return {
    statefulState: ViewState.map(
      statefulState,
      RetaliationDetailViewModelMapper.map,
    ),
    onRetaliate,
  }
}
