import React, { FC, useLayoutEffect } from 'react'
import clientEnv from '@/config/clientEnv';
import {
  DeviceEventEmitter,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { useLocationPickerScreen } from './useLocationPickerScreen.hook'
import { CloseButton } from '@/screens/shared/NavigationHeaderButton'
import { Stack, router } from 'expo-router'

export const LocationPickerScreen = () => {
  const { onPlaceSelected } = useLocationPickerScreen((address) =>
    DeviceEventEmitter.emit('onAddressSelected', address),
  )

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => <CloseButton onPress={() => router.push('../')} />,
          title: i18n.t('personalinformation.address'),
        }}
      />
      <GooglePlacesAutocomplete
        listViewDisplayed={false}
        placeholder={i18n.t('common.search')}
        fetchDetails={true}
        onPress={(_, details) => onPlaceSelected(details)}
        query={{
          key: Platform.select({
            ios: clientEnv.IOS_GOOGLE_API_KEY,
            android: clientEnv.ANDROID_GOOGLE_API_KEY,
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
