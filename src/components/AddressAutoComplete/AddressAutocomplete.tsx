import React, { memo, useCallback, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import usePlaceAutocomplete from '@/components/AddressAutoComplete/Hooks/usePlaceAutocomplete'
import usePlaceDetails from '@/components/AddressAutoComplete/Hooks/usePlaceDetails'
import TextField from '@/components/TextField/TextField'
import { ListItem, Text, useDebounceValue, YStack } from 'tamagui'

export interface AddressAutocompleteProps {
  defaultValue?: string
  setStringValue?: (value: string) => void
  setAddressComponents?: (addressComponents: google.maps.GeocoderAddressComponent[]) => void
}

function AddressAutocomplete({ setAddressComponents, setStringValue, defaultValue, ...rest }: AddressAutocompleteProps): JSX.Element {
  const [value, setValue] = useState<string>(defaultValue ?? '')
  const [placeId, setPlaceId] = useState<string | undefined>()

  const address = useDebounceValue(value, 500)

  const [hasUserInputSincePlaceSelect, setHasUserInputSincePlaceSelect] = useState(false)

  const { data: autocompleteResults } = usePlaceAutocomplete({ address })
  const { data: placeDetails } = usePlaceDetails({ placeId })

  const shouldShowResults = autocompleteResults && hasUserInputSincePlaceSelect && Array.isArray(autocompleteResults)

  useEffect(() => {
    if (placeDetails && placeDetails.formatted && placeDetails.details) {
      setAddressComponents?.(placeDetails.details)
    }
  }, [placeDetails])

  // On input notify that user is interacting with component
  const onInput = useCallback((val: string) => {
    setHasUserInputSincePlaceSelect(true)
    setValue(val)
  }, [])

  // When place is selected, setPlaceId and trigger results close.
  const onPlaceSelect = useCallback(
    (id: string, val: string) => () => {
      setPlaceId(id)
      setHasUserInputSincePlaceSelect(false)
      setStringValue?.(val)
    },
    [setStringValue],
  )

  return (
    <YStack>
      <TextField placeholder="Adresse" label="Adresse" width="100%" value={value} onChangeText={onInput} {...rest} />

      {shouldShowResults &&
        autocompleteResults.map((el) => (
          <TouchableOpacity onPress={onPlaceSelect(el.place_id, el.description)} key={el.place_id}>
            <ListItem hoverTheme>
              <Text>{el.description}</Text>
            </ListItem>
          </TouchableOpacity>
        ))}
    </YStack>
  )
}

export default memo(AddressAutocomplete)
