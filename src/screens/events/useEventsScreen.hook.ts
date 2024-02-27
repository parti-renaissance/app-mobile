import { useCallback, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { EventMode } from '../../core/entities/Event'

import { router } from 'expo-router'

const DEBOUNCE_TIMEOUT_MILLIS = 350

export const useEventsScreen = (
  eventMode: EventMode | undefined,
): {
  searchText: string
  onChangeText: (input: string) => void
  onFiltersSelected: () => void
} => {
  const [searchText, setSearchText] = useState('')
  const [searchTextDebounced] = useDebounce(searchText, DEBOUNCE_TIMEOUT_MILLIS)

  const onFiltersSelected = useCallback(() => {
    router.push({
      pathname: '/(tabs)/events/[mode]/filters',
      params: { mode: eventMode },
    })
  }, [eventMode])

  return {
    searchText: searchTextDebounced,
    onChangeText: setSearchText,
    onFiltersSelected,
  }
}
