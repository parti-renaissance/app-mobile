import React, { FC, useLayoutEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { CloseButton } from '../shared/NavigationHeaderButton'
import { GOOGLE_PLACES_API_KEY } from '../../Config'
import { LocationPickerModalNavigatorScreenProps } from '../../navigation/locationPickerModal/LocationPickerModalNavigatorScreenProps'
import { useLocationPickerScreen } from './useLocationPickerScreen.hook'

type LocationPickerScreenProps = LocationPickerModalNavigatorScreenProps<'LocationPicker'>

export const LocationPickerScreen: FC<LocationPickerScreenProps> = ({
  route,
  navigation,
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
      title: i18n.t('personalinformation.address'),
    })
  }, [navigation])

  const { onPlaceSelected } = useLocationPickerScreen(
    route.params.onAddressSelected,
  )

  return (
    <SafeAreaView style={styles.container}>
      <GooglePlacesAutocomplete
        listViewDisplayed={false}
        placeholder={i18n.t('common.search')}
        fetchDetails={true}
        onPress={(_, details) => onPlaceSelected(details)}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: i18n.t('personalinformation.gmaps_language'),
        }}
        textInputProps={{
          placeholderTextColor: Colors.lightText,
        }}
        styles={{
          textInputContainer: {
            paddingTop: Spacing.unit,
            paddingHorizontal: Spacing.margin,
          },
          textInput: {
            backgroundColor: Colors.separator,
          },
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  commonText: {
    ...Typography.body,
    paddingVertical: 4,
    textAlign: 'right',
  },
  container: { backgroundColor: Colors.defaultBackground, flex: 1 },
  placeholder: {
    color: Colors.lightText,
  },
  selectedAddress: {
    color: Colors.darkText,
  },
})
