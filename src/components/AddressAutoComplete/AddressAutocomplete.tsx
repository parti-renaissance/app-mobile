import React, { memo, useCallback, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import usePlaceAutocomplete from '@/components/AddressAutoComplete/Hooks/usePlaceAutocomplete'
import usePlaceDetails from '@/components/AddressAutoComplete/Hooks/usePlaceDetails'
import TextField from '@/components/TextField/TextField'
import googleAddressMapper from '@/data/mapper/googleAddressMapper'
import { ListItem, Text, useDebounceValue, YStack } from 'tamagui'
import { purple } from '../../../theme/colors.hsl'

export interface AddressAutocompleteProps {
  defaultValue?: string
  setStringValue?: (value: string) => void
  setAddressComponents?: (addressComponents: { address: string; city: string; postalCode: string; country: string }) => void
}

function AddressAutocomplete({ setAddressComponents, setStringValue, defaultValue, ...rest }: AddressAutocompleteProps): JSX.Element {
  const [value, setValue] = useState<string>(defaultValue ?? '')
  const [placeId, setPlaceId] = useState<string | undefined>()

  const address = useDebounceValue(value, 500)

  const [hasUserInputSincePlaceSelect, setHasUserInputSincePlaceSelect] = useState(false)

  const { data: autocompleteResults, isLoading } = usePlaceAutocomplete({ address })
  const { data: placeDetails } = usePlaceDetails({ placeId })

  const shouldShowResults = autocompleteResults && hasUserInputSincePlaceSelect && Array.isArray(autocompleteResults)

  useEffect(() => {
    if (placeDetails && placeDetails.formatted && placeDetails.details) {
      setAddressComponents?.(googleAddressMapper(placeDetails.details))
    }
  }, [placeDetails])

  // On input notify that user is interacting with component
  const onInput = useCallback((text: string) => {
    setHasUserInputSincePlaceSelect(true)
    setValue(text)
  }, [])

  // When place is selected, setPlaceId and trigger results close.
  const onPlaceSelect = useCallback(
    (id: string, val: string) => () => {
      setPlaceId(id)
      setHasUserInputSincePlaceSelect(false)
      setValue(val)
      setStringValue?.(val)
    },
    [setStringValue],
  )

  return (
    <YStack>
      <TextField placeholder="Adresse" label="Adresse" width="100%" value={value} onChangeText={onInput} {...rest} />

      {isLoading && <ProgressBar indeterminate color={purple.purple3} style={{ backgroundColor: purple.purple1 }} />}

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
