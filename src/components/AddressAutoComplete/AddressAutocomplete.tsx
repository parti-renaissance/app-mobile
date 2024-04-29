import React, { memo, useCallback, useEffect, useState } from 'react'
import { NativeSyntheticEvent, TextInputFocusEventData, TouchableOpacity } from 'react-native'
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
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void
  error?: string
}

function AddressAutocomplete({ setAddressComponents, setStringValue, defaultValue, onBlur, error }: AddressAutocompleteProps): JSX.Element {
  const [value, setValue] = useState<string>(defaultValue ?? '')
  const [placeId, setPlaceId] = useState<string | undefined>()

  const address = useDebounceValue(value, 500)

  const [hasUserInputSincePlaceSelect, setHasUserInputSincePlaceSelect] = useState(false)

  const { data: autocompleteResults, isLoading } = usePlaceAutocomplete({ address, enabled: hasUserInputSincePlaceSelect })
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
    setStringValue?.(text)
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

  const handleBlur = useCallback(
    (ev: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (autocompleteResults && autocompleteResults.length > 0) {
        onPlaceSelect(autocompleteResults[0].place_id, autocompleteResults[0].description)()
      }
      onBlur?.(ev)
    },
    [autocompleteResults],
  )

  return (
    <YStack>
      <TextField placeholder="Adresse" label="Adresse" width="100%" value={value} onChangeText={onInput} onBlur={handleBlur} error={error} />

      {isLoading && <ProgressBar indeterminate color={purple.purple3} style={{ backgroundColor: purple.purple1 }} />}

      {shouldShowResults &&
        autocompleteResults.map((el) => (
          <TouchableOpacity onPress={onPlaceSelect(el.place_id, el.description)} key={el.place_id}>
            <ListItem hoverTheme bg={'$gray1'} hoverStyle={{ backgroundColor: '$gray3' }}>
              <Text lineHeight={'$2'}>{el.description}</Text>
            </ListItem>
          </TouchableOpacity>
        ))}
    </YStack>
  )
}

export default memo(AddressAutocomplete)
