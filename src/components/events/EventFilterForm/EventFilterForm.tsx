import React, { RefObject } from 'react'
import { TextInput } from 'react-native'
import { LineSwitch } from '@/components/base/Switch/Switch'
import Text from '@/components/base/Text'
import { YStack } from 'tamagui'
import { create } from 'zustand'
import VoxCard from '../VoxCard/VoxCard'
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
      {/* <Controller name="zone">{(p) => <ZoneFilter {...p} />}</Controller> */}
      <YStack gap="$3">
        <Text fontWeight="$5">Temporalité</Text>
        <Controller name="showPast">
          {(p) => (
            <LineSwitch checked={p.value} onCheckedChange={p.onChange}>
              Afficher les évènements passées
            </LineSwitch>
          )}
        </Controller>
        {/* <Controller name="showCancelled">
            {(p) => (
              <LineSwitch checked={p.value} onCheckedChange={p.onChange}>
                Afficher les évènements annulées
              </LineSwitch>
            )}
          </Controller> */}
      </YStack>
    </YStack>
  )
}
const MemoizedEF = React.memo(EventFilters)

MemoizedEF.displayName = 'EventFilters'

export default MemoizedEF
