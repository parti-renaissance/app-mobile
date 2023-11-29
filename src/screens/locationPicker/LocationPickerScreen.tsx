import React, { FC, useLayoutEffect } from 'react'
import {
  DeviceEventEmitter,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { ANDROID_GOOGLE_API_KEY, IOS_GOOGLE_API_KEY } from '../../Config'
import { LocationPickerModalNavigatorScreenProps } from '../../navigation/locationPickerModal/LocationPickerModalNavigatorScreenProps'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { CloseButton } from '../shared/NavigationHeaderButton'
import { useLocationPickerScreen } from './useLocationPickerScreen.hook'

type LocationPickerScreenProps =
  LocationPickerModalNavigatorScreenProps<'LocationPicker'>

export const LocationPickerScreen: FC<LocationPickerScreenProps> = ({
  navigation,
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
      title: i18n.t('personalinformation.address'),
    })
  }, [navigation])

  const { onPlaceSelected } = useLocationPickerScreen((address) =>
    DeviceEventEmitter.emit('onAddressSelected', address),
  )

  return (
    <SafeAreaView style={styles.container}>
      <GooglePlacesAutocomplete
        listViewDisplayed={false}
        placeholder={i18n.t('common.search')}
        fetchDetails={true}
        onPress={(_, details) => onPlaceSelected(details)}
        query={{
          key: Platform.select({
            ios: IOS_GOOGLE_API_KEY,
            android: ANDROID_GOOGLE_API_KEY,
          }),
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
