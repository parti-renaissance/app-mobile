import React, { ComponentProps, memo, useCallback, useEffect, useState } from 'react'
import usePlaceAutocomplete from '@/components/AddressAutoComplete/Hooks/usePlaceAutocomplete'
import usePlaceDetails from '@/components/AddressAutoComplete/Hooks/usePlaceDetails'
import googleAddressMapper from '@/data/mapper/googleAddressMapper'
import { useDebounceValue, YStack } from 'tamagui'
import Select from '../base/Select/Select'

export interface AddressAutocompleteProps {
  defaultValue?: string
  setAddressComponents?: (addressComponents: {
    address: string
    city: string
    postalCode: string
    country: string
    location?: {
      lat: number
      lng: number
    }
  }) => void
  error?: string
  minimal?: boolean
}

function AddressAutocomplete({
  setAddressComponents,
  defaultValue,
  minimal,
  error,
  ...rest
}: Readonly<AddressAutocompleteProps> & Omit<ComponentProps<typeof Select>, 'handleQuery' | 'options' | 'value' | 'onChange'>): JSX.Element {
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
      if (placeDetails?.formatted && placeDetails.details && placeDetails.geometry) {
        setAddressComponents?.(googleAddressMapper(placeDetails))
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
        {...rest}
        options={[
          ...(autocompleteResults?.map((x) => ({
            value: x.place_id,
            label: x.description,
          })) ?? []),
          ...(defaultValue ? [{ value: 'default', label: defaultValue }] : []),
        ]}
        error={error}
      />
    </YStack>
  )
}

export default memo(AddressAutocomplete)
