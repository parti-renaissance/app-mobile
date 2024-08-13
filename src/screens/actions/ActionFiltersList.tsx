import React from 'react'
import AddressAutocomplete from '@/components/AddressAutoComplete/AddressAutocomplete'
import Select from '@/components/base/Select/Select'
import { FilterActionType } from '@/services/actions/schema'
import { ScrollView, XStack, YStack, YStackProps } from 'tamagui'

export type SelectType = FilterActionType
export type SelectPeriod = 'all' | 'today' | 'tomorow' | 'week'

const PERIOD_OPTIONS: Array<{ value: SelectPeriod; label: string }> = [
  { value: 'all', label: 'Tout' },
  { value: 'today', label: "Ajourd'hui" },
  { value: 'tomorow', label: 'Demain' },
  { value: 'week', label: 'Cette semaine' },
]

const TYPE_OPTIONS: Array<{ value: SelectType; label: string }> = [
  { value: FilterActionType.ALL, label: 'Tout types' },
  { value: FilterActionType.TRACTAGE, label: 'Tractage' },
  { value: FilterActionType.BOITAGE, label: 'Boitage' },
  { value: FilterActionType.COLLAGE, label: 'Collage' },
  { value: FilterActionType.PAP, label: 'Porte à porte' },
]

type ActionFiltersListProps = {
  onLocationChange: (location: { longitude: number; latitude: number }) => void
  onPeriodChange: (period: SelectPeriod) => void
  onTypeChange: (type: SelectType) => void
  onAddressReset: () => void
  period: SelectPeriod
  type: SelectType
}

export const ActionFiltersList = (allProps: ActionFiltersListProps & YStackProps) => {
  const { onPeriodChange, onTypeChange, onLocationChange, period, type, onAddressReset, ...props } = allProps
  const handleLocationChange = ({ location }: { location?: { lng: number; lat: number } }) => {
    if (!location) return
    onLocationChange({ longitude: location.lng, latitude: location.lat })
  }
  return (
    <YStack {...props}>
      <ScrollView horizontal flex={1} contentContainerStyle={{ p: '$3' }} keyboardShouldPersistTaps="always">
        <XStack gap="$3">
          <AddressAutocomplete
            maxWidth={130}
            minWidth={120}
            size="sm"
            label="Rechercher"
            placeholder="Adresse"
            setAddressComponents={handleLocationChange}
            forceSelect={false}
            onReset={onAddressReset}
          />
          <Select<SelectPeriod> size="sm" search={false} label="Période" onChange={onPeriodChange} value={period} options={PERIOD_OPTIONS} />
          <Select<SelectType> size="sm" label="Type" search={false} onChange={onTypeChange} value={type} options={TYPE_OPTIONS} />
        </XStack>
      </ScrollView>
    </YStack>
  )
}
