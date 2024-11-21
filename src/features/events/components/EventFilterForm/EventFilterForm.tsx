import React, { RefObject, useCallback } from 'react'
import { TextInput } from 'react-native'
import DepartementSelect from '@/components/DepartementSelect/DepartementSelect'
import { YStack } from 'tamagui'
import { create } from 'zustand'
import SearchBox from './SearchBox'

export type EventFilters = {
  zone: string | undefined
  detailZone: { value: string; label: string } | undefined
  search: string
}

export type FiltersState = {
  searchInputRef: React.RefObject<TextInput | null>
  value: EventFilters
  setValue: (value: EventFilters | ((value: EventFilters) => EventFilters)) => void
}

export const defaultEventFilters: EventFilters = {
  search: '',
  detailZone: undefined,
  zone: undefined,
}

export const eventFiltersState = create<FiltersState>((set) => ({
  searchInputRef: React.createRef(),
  value: defaultEventFilters,
  setValue: (x) => (typeof x === 'function' ? set((y) => ({ ...x, value: x(y.value) })) : set({ value: x })),
}))

type EventFiltersProps = {
  onSearchFocus?: () => void
}

const EventFilters = ({ onSearchFocus }: EventFiltersProps) => {
  const { value, setValue, searchInputRef } = eventFiltersState()
  const handleDepartementChange = useCallback((x?: { value: string; label: string }) => {
    setValue((y) => ({ ...y, zone: x?.value, detailZone: x }))
  }, [])

  const handleSearchChange = useCallback((x: string) => {
    setValue((y) => ({ ...y, search: x }))
  }, [])

  return (
    <YStack gap="$medium" $lg={{ flexDirection: 'row', gap: '$small' }}>
      <YStack flex={2}>
        <DepartementSelect size="sm" id="filter-dept" color="white" value={value.zone} onDetailChange={handleDepartementChange} />
      </YStack>
      <YStack flex={3}>
        <SearchBox
          label={value.detailZone ? `Dans ${value.detailZone.label}` : undefined}
          enterKeyHint="done"
          value={value.search}
          ref={searchInputRef as RefObject<TextInput>}
          onChange={handleSearchChange}
          onFocus={onSearchFocus}
        />
      </YStack>
    </YStack>
  )
}
const MemoizedEF = React.memo(EventFilters)

MemoizedEF.displayName = 'EventFilters'

export default MemoizedEF
