import React, { forwardRef, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  TextInput,
  View,
  Platform,
} from 'react-native'
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal'
import { PhoneNumber } from '../../core/entities/DetailedProfile'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import LabelInputContainer from './LabelInputContainer'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  label: string
  nextInput?: React.RefObject<TextInput>
  isLastInput?: boolean
  defaultValue?: PhoneNumber | undefined
  onValueChange: (value: PhoneNumber | undefined) => void
}>

const PhoneNumberInput = forwardRef<TextInput, Props>((props, ref) => {
  const returnKeyType = props.isLastInput === true ? 'done' : 'next'
  const submitEditing = () => {
    if (props.nextInput !== undefined) {
      props.nextInput?.current?.focus()
    }
  }
  const [countryCode, setCountryCode] = useState<CountryCode>(
    props.defaultValue?.countryCode ?? 'FR',
  )
  const [number, setNumber] = useState<string | undefined>(
    props.defaultValue?.number,
  )
  const dispatchNewPhoneNumber = (
    newCountryCode: CountryCode,
    newNumber: string | undefined,
  ) => {
    if (newNumber === undefined || newNumber.length === 0) {
      props.onValueChange(undefined)
    } else {
      props.onValueChange({
        countryCode: newCountryCode,
        number: newNumber,
      })
    }
  }

  return (
    <LabelInputContainer label={props.label}>
      <View style={styles.container}>
        <TextInput
          ref={ref}
          style={styles.textInput}
          placeholder={i18n.t('personalinformation.placeholder')}
          placeholderTextColor={Colors.lightText}
          returnKeyType={returnKeyType}
          onSubmitEditing={submitEditing}
          defaultValue={props.defaultValue?.number}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => {
            setNumber(value)
            dispatchNewPhoneNumber(countryCode, value)
          }}
        />
        <CountryPicker
          countryCode={countryCode}
          preferredCountries={['FR']}
          withFlagButton={false}
          translation={'fra'}
          // @ts-ignore: Issue in the country picker typescript definition
          closeButtonImage={require('../../assets/images/navigationBarBack.png')}
          withCallingCodeButton={true}
          withCallingCode={true}
          withFlag={false}
          containerButtonStyle={{
            backgroundColor: Colors.groupedListBackground,
            padding: Spacing.small,
          }}
          // @ts-ignore: Issue in the country picker typescript definition
          flatListProps={{
            contentContainerStyle: { paddingHorizontal: Spacing.margin },
          }}
          theme={{ ...Typography.phoneNumberPicker, itemHeight: 44 }}
          onSelect={(country) => {
            setCountryCode(country.cca2)
            dispatchNewPhoneNumber(country.cca2, number)
          }}
        />
      </View>
    </LabelInputContainer>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    alignItems: Platform.OS === 'android' ? 'center' : 'baseline',
  },
  textInput: {
    ...Typography.body,
    width: 115,
    textAlign: 'right',
    paddingVertical: 0,
    color: Colors.darkText,
  },
})

export default PhoneNumberInput
