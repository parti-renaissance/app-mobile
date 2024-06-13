import React from 'react'
import AddressAutocomplete from '@/components/AddressAutoComplete/AddressAutocomplete'
import Select from '@/components/base/Select/Select'
import { ActionType } from '@/data/restObjects/RestActions'
import { ScrollView, XStack, YStack, YStackProps } from 'tamagui'

export type SelectType = 'all' | ActionType
export type SelectPeriod = 'all' | 'today' | 'tomorow' | 'week'

const PERIOD_OPTIONS: Array<{ value: SelectPeriod; label: string }> = [
  { value: 'all', label: 'Tout' },
  { value: 'today', label: "Ajourd'hui" },
  { value: 'tomorow', label: 'Demain' },
  { value: 'week', label: 'Cette semaine' },
]

const TYPE_OPTIONS: Array<{ value: SelectType; label: string }> = [
  { value: 'all', label: 'Tout types' },
  { value: ActionType.TRACTAGE, label: 'Tractage' },
  { value: ActionType.BOITAGE, label: 'Boitage' },
  { value: ActionType.COLLAGE, label: 'Collage' },
  { value: ActionType.PAP, label: 'Porte à porte' },
]

type ActionFiltersListProps = {
  onLocationChange: (location: { longitude: number; latitude: number }) => void
  onPeriodChange: (period: SelectPeriod) => void
  onTypeChange: (type: SelectType) => void
  period: SelectPeriod
  type: SelectType
}

export const ActionFiltersList = (props: ActionFiltersListProps & YStackProps) => {
  const handleLocationChange = ({ location }: { location?: { lng: number; lat: number } }) => {
    if (!location) return
    props.onLocationChange({ longitude: location.lng, latitude: location.lat })
  }
  return (
    <YStack>
      <ScrollView horizontal flex={1} contentContainerStyle={{ p: '$3' }} keyboardShouldPersistTaps="always">
        <XStack gap="$3">
          <AddressAutocomplete maxWidth={100} labelOnlySheet setAddressComponents={handleLocationChange} />
          <Select<SelectPeriod>
            search={false}
            labelOnlySheet
            label="Période"
            onChange={props.onPeriodChange}
            value={props.period}
            options={PERIOD_OPTIONS}
            placeholder="Cette semaine"
          />
          <Select<SelectType>
            labelOnlySheet
            search={false}
            label="Type"
            onChange={props.onTypeChange}
            value={props.type}
            options={TYPE_OPTIONS}
            placeholder="Cette semaine"
          />
        </XStack>
      </ScrollView>
    </YStack>
  )
}
