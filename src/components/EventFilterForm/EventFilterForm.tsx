import React from 'react'
import { LineSwitch } from '@/components/base/Switch/Switch'
import Text from '@/components/base/Text'
import { YStack } from 'tamagui'
import { create } from 'zustand'
import VoxCard from '../VoxCard/VoxCard'
import SearchBox from './SearchBox'
import ZoneFilter, { ZoneValue, zoneValues } from './ZoneFilter'

export type EventFilters = {
  zone: ZoneValue
  search: string
  showPast: boolean
  showCancelled: boolean
}

type FiltersState = {
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
  value: defaultEventFilters,
  setValue: (x) => set({ value: x }),
}))

const Controller = <N extends keyof EventFilters>(props: {
  name: N
  children: (p: { value: EventFilters[N]; onChange: (v: EventFilters[N]) => void }) => React.ReactNode
}) => {
  const { value, setValue } = eventFiltersState()
  return props.children({
    value: value[props.name],
    onChange: (v) => setValue({ ...value, [props.name]: v }),
  })
}

const EventFilters = () => {
  return (
    <VoxCard bg="transparent">
      <YStack gap="$5">
        <Controller name="search">{(p) => <SearchBox {...p} />}</Controller>
        <Controller name="zone">{(p) => <ZoneFilter {...p} />}</Controller>
        <YStack gap="$3">
          <Text fontWeight="$5">Temporalité</Text>
          <Controller name="showPast">
            {(p) => (
              <LineSwitch checked={p.value} onCheckedChange={p.onChange}>
                Afficher les évènements passées
              </LineSwitch>
            )}
          </Controller>
          <Controller name="showCancelled">
            {(p) => (
              <LineSwitch checked={p.value} onCheckedChange={p.onChange}>
                Afficher les évènements annulées
              </LineSwitch>
            )}
          </Controller>
        </YStack>
      </YStack>
    </VoxCard>
  )
}
const MemoizedEF = React.memo(EventFilters)

MemoizedEF.displayName = 'EventFilters'

export default MemoizedEF
