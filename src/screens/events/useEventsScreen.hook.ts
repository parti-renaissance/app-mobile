import { useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { useDebounce } from 'use-debounce/lib'
import { EventMode } from '../../core/entities/Event'
import { EventScreenProps, Screen } from '../../navigation'
import { Analytics } from '../../utils/Analytics'
import { EventRowViewModel } from './EventViewModel'

const DEBOUNCE_TIMEOUT_MILLIS = 350

export const useEventsScreen = (): {
  searchText: string
  eventModeFilter: EventMode | undefined
  modalVisible: boolean
  onEventSelected: (event: EventRowViewModel) => void
  onNewFilters: (eventMode: EventMode | undefined) => void
  onChangeText: (input: string) => void
  onFiltersSelected: () => void
  dismissModal: () => void
} => {
  const navigation = useNavigation<EventScreenProps['navigation']>()
  const [eventModeFilter, setEventModeFilter] = useState<EventMode | undefined>(
    undefined,
  )
  const [searchText, setSearchText] = useState('')
  const [searchTextDebounced] = useDebounce(searchText, DEBOUNCE_TIMEOUT_MILLIS)
  const [modalVisible, setModalVisible] = useState(false)

  const onEventSelected = useCallback(
    async (event: EventRowViewModel) => {
      await Analytics.logEventSelected(event.title, event.category)
      navigation.navigate(Screen.eventDetails, {
        eventId: event.id,
      })
    },
    [navigation],
  )

  const onNewFilters = (eventMode: EventMode | undefined) => {
    setEventModeFilter(eventMode)
    setModalVisible(false)
  }

  const dismissModal = () => {
    setModalVisible(false)
  }

  const onFiltersSelected = useCallback(() => {
    setModalVisible(true)
  }, [])

  return {
    searchText: searchTextDebounced,
    modalVisible,
    eventModeFilter,
    onEventSelected,
    onNewFilters,
    onChangeText: setSearchText,
    onFiltersSelected,
    dismissModal,
  }
}
