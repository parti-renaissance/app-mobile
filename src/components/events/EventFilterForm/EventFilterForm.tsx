import React, { RefObject } from 'react'
import { TextInput } from 'react-native'
import { YStack } from 'tamagui'
import { create } from 'zustand'
import SearchBox from './SearchBox'
import { ZoneValue, zoneValues } from './ZoneFilter'

export type EventFilters = {
  zone: ZoneValue
  search: string
  showPast: boolean
  showCancelled: boolean
}

export type FiltersState = {
  searchInputRef: React.RefObject<TextInput | null>
  value: EventFilters
  setValue: (value: EventFilters) => void
}

export const defaultEventFilters: EventFilters = {
  zone: zoneValues[0],
  search: '',
  showPast: false,
  showCancelled: false,
}

export const eventFiltersState = create<FiltersState>((set) => ({
  searchInputRef: React.createRef(),
  value: defaultEventFilters,
  setValue: (x) => set({ value: x }),
}))

export const Controller = <N extends keyof EventFilters>(props: {
  name: N
  children: (p: { value: EventFilters[N]; onChange: (v: EventFilters[N]) => void; ref: FiltersState['searchInputRef'] | undefined }) => React.ReactNode
}) => {
  const { value, setValue, searchInputRef } = eventFiltersState()
  return props.children({
    value: value[props.name],
    onChange: (v) => setValue({ ...value, [props.name]: v }),
    ref: props.name === 'search' ? searchInputRef : undefined,
  })
}

type EventFiltersProps = {
  onSearchFocus?: () => void
}

const EventFilters = ({ onSearchFocus }: EventFiltersProps) => {
  return (
    <YStack gap="$5">
      <Controller name="search">
        {(p) => <SearchBox enterKeyHint="done" value={p.value} ref={p.ref as RefObject<TextInput>} onChange={p.onChange} onFocus={onSearchFocus} />}
      </Controller>
      <YStack gap="$3"></YStack>
    </YStack>
  )
}
const MemoizedEF = React.memo(EventFilters)

MemoizedEF.displayName = 'EventFilters'

export default MemoizedEF
