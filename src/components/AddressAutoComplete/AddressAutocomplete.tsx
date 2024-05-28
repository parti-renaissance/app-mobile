import React, { memo, useCallback, useEffect, useState } from 'react'
import { NativeSyntheticEvent, TextInputFocusEventData, TouchableOpacity } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import usePlaceAutocomplete from '@/components/AddressAutoComplete/Hooks/usePlaceAutocomplete'
import usePlaceDetails from '@/components/AddressAutoComplete/Hooks/usePlaceDetails'
import TextField from '@/components/TextField/TextField'
import googleAddressMapper from '@/data/mapper/googleAddressMapper'
import { ListItem, Text, useDebounceValue, YStack } from 'tamagui'
import { purple } from '../../../theme/colors.hsl'
import Select from '../base/Select/Select'

export interface AddressAutocompleteProps {
  defaultValue?: string
  setAddressComponents?: (addressComponents: { address: string; city: string; postalCode: string; country: string }) => void
  error?: string
  minimal?: boolean
}

function AddressAutocomplete({ setAddressComponents, defaultValue, minimal, error }: Readonly<AddressAutocompleteProps>): JSX.Element {
  const [value, setValue] = useState<string>('default')
  const [query, setQuery] = useState<string>('')

  const address = useDebounceValue(query, 500)

  const { data: autocompleteResults, isFetching } = usePlaceAutocomplete({ address })
  const { mutateAsync } = usePlaceDetails()

  // On input notify that user is interacting with component
  const onInput = useCallback((text: string) => {
    setQuery(text)
  }, [])

  // When place is selected, setPlaceId and trigger results close.
  const onPlaceSelect = (id: string) => {
    if (id.length === 0) {
      return
    }
    setValue(id)
    mutateAsync(id).then((placeDetails) => {
      if (placeDetails?.formatted && placeDetails.details) {
        setAddressComponents?.(googleAddressMapper(placeDetails.details))
      }
    })
  }

  return (
    <YStack>
      <Select
        placeholder={'Adresse'}
        minimal={minimal}
        label="Adresse"
        value={value}
        loading={isFetching}
        onChange={onPlaceSelect}
        queryHandler={onInput}
        options={[
          ...(autocompleteResults?.map((x) => ({
            value: x.place_id,
            label: x.description,
          })) ?? []),
          {
            value: 'default',
            label: defaultValue ?? '',
          },
        ]}
        error={error}
      />
    </YStack>
  )
}

export default memo(AddressAutocomplete)
