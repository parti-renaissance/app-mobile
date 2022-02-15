import { useCallback, useEffect, useState } from 'react'
import EventRepository from '../../data/EventRepository'
import { ViewState } from '../shared/StatefulView'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { DetailedEvent } from '../../core/entities/Event'

export const useEventDetailsScreen = (
  eventId: string,
): {
  statefulState: ViewState<DetailedEvent>
  onReloadEvent: () => void
} => {
  const [statefulState, setStatefulState] = useState<ViewState<DetailedEvent>>(
    ViewState.Loading(),
  )

  const fetchData = useCallback(() => {
    setStatefulState(ViewState.Loading())
    EventRepository.getInstance()
      .getEventDetails(eventId)
      .then((detailedEvent) => {
        setStatefulState(ViewState.Content(detailedEvent))
      })
      .catch((error) => {
        setStatefulState(ViewStateUtils.networkError(error, fetchData))
      })
  }, [eventId])

  useEffect(fetchData, [])

  return {
    statefulState,
    onReloadEvent: fetchData,
  }
}
