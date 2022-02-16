import { useState } from 'react'
import { EventMode } from '../../core/entities/Event'
import { EventQuickFiltersViewModel } from './EventQuickFiltersViewModel'
import { EventQuickFiltersViewModelMapper } from './EventQuickFiltersViewModelMapper'

export const useEventQuickFilters = (
  initialEventMode: EventMode | undefined,
  onNewFilters: (eventMode: EventMode | undefined) => void,
): {
  viewModel: EventQuickFiltersViewModel
  onInterestSelected: (code: string) => void
  onClear: () => void
  onSubmit: () => void
} => {
  const [eventModeFilter, setEventModeFilter] = useState<EventMode | undefined>(
    initialEventMode,
  )
  const [viewModel, setViewModel] = useState(
    EventQuickFiltersViewModelMapper.map(initialEventMode),
  )

  const onClear = () => {
    setEventModeFilter(undefined)
    updateViewModel(undefined)
  }

  const onSubmit = () => {
    onNewFilters(eventModeFilter)
  }

  const updateViewModel = (newEventTypeFilter: EventMode | undefined) => {
    setViewModel(EventQuickFiltersViewModelMapper.map(newEventTypeFilter))
  }

  const onInterestSelected = (code: string) => {
    if (code === EventMode.MEETING || code === EventMode.ONLINE) {
      const previousSelection = eventModeFilter
      let newSelection: EventMode | undefined
      if (previousSelection === code) {
        newSelection = undefined
      } else {
        newSelection = code
      }
      setEventModeFilter(newSelection)
      updateViewModel(newSelection)
    } else {
      // categories not implemented yet
    }
  }

  return {
    viewModel,
    onInterestSelected,
    onClear,
    onSubmit,
  }
}
