import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { EventMode } from '../../core/entities/Event'
import { EventsFilterModalNavigatorScreenProps } from '../../navigation/eventsFilterModal/EventsFilterModalNavigatorScreenProps'
import { EventQuickFiltersViewModel } from './EventQuickFiltersViewModel'
import { EventQuickFiltersViewModelMapper } from './EventQuickFiltersViewModelMapper'

export const useEventQuickFiltersScreen = (
  eventMode: EventMode | undefined,
): {
  viewModel: EventQuickFiltersViewModel
  onInterestSelected: (code: string) => void
  onClear: () => void
  onSubmit: () => void
  onClose: () => void
} => {
  const navigation = useNavigation<
    EventsFilterModalNavigatorScreenProps<'EventsFilter'>['navigation']
  >()
  const [eventModeFilter, setEventModeFilter] = useState<EventMode | undefined>(
    eventMode,
  )
  const [viewModel, setViewModel] = useState(
    EventQuickFiltersViewModelMapper.map(eventMode),
  )

  const onClear = () => {
    setEventModeFilter(undefined)
    updateViewModel(undefined)
  }

  const onSubmit = () => {
    navigation.navigate('Events', { eventMode: eventModeFilter })
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

  const onClose = () => {
    navigation.goBack()
  }

  return {
    viewModel,
    onInterestSelected,
    onClear,
    onSubmit,
    onClose,
  }
}
