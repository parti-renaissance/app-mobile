import { useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { useDebounce } from 'use-debounce/lib'
import { EventMode } from '../../core/entities/Event'
import { EventNavigatorScreenProps } from '../../navigation/EventNavigator'

const DEBOUNCE_TIMEOUT_MILLIS = 350

export const useEventsScreen = (
  eventMode: EventMode | undefined,
): {
  searchText: string
  onChangeText: (input: string) => void
  onFiltersSelected: () => void
} => {
  const navigation = useNavigation<
    EventNavigatorScreenProps<'Events'>['navigation']
  >()
  const [searchText, setSearchText] = useState('')
  const [searchTextDebounced] = useDebounce(searchText, DEBOUNCE_TIMEOUT_MILLIS)

  const onFiltersSelected = useCallback(() => {
    navigation.navigate('EventsFilterModal', {
      screen: 'EventsFilter',
      params: { eventMode: eventMode },
    })
  }, [navigation, eventMode])

  return {
    searchText: searchTextDebounced,
    onChangeText: setSearchText,
    onFiltersSelected,
  }
}
