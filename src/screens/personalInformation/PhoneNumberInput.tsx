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
  labelStyle?: StyleProp<ViewStyle>
  label: string
  placeholder: string
  nextInput?: React.RefObject<TextInput>
  isLastInput?: boolean
  defaultValue?: PhoneNumber | undefined
  onValueChange: (value: PhoneNumber | undefined) => void
  errorMessage?: string
  multiLine?: boolean
  inputAccessoryViewID?: string
}>

const PhoneNumberInput = forwardRef<TextInput, Props>((props, ref) => {
  const returnKeyType = props.isLastInput === true ? 'done' : 'next'
  const submitEditing = () => {
    if (props.nextInput !== undefined) {
      props.nextInput?.current?.focus()
    }
  }
  const [countryCode, setCountryCode] = useState<CountryCode>(
    props.defaultValue?.countryCode ??
      i18n.t('personalinformation.default_country_code'),
  )
  const [callingCode, setCallingCode] = useState<string>(
    props.defaultValue?.callingCode ?? '',
  )
  const [number, setNumber] = useState<string | undefined>(
    props.defaultValue?.number,
  )
  const dispatchNewPhoneNumber = (
    newCountryCode: CountryCode,
    newCallingCode: string,
    newNumber: string | undefined,
  ) => {
    if (newNumber === undefined || newNumber.length === 0) {
      props.onValueChange(undefined)
    } else {
      props.onValueChange({
        countryCode: newCountryCode,
        callingCode: newCallingCode,
        number: newNumber,
      })
    }
  }

  const textInputStyle = props.multiLine ? styles.expanded : styles.collapsed

  return (
    <LabelInputContainer
      labelStyle={props.labelStyle}
      label={props.label}
      errorMessage={props.errorMessage}
      multiLine={props.multiLine}
    >
      <View style={styles.container}>
        <TextInput
          ref={ref}
          style={[styles.textInput, textInputStyle]}
          placeholder={props.placeholder}
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
            dispatchNewPhoneNumber(countryCode, callingCode, value)
          }}
          inputAccessoryViewID={props.inputAccessoryViewID}
        />
        <CountryPicker
          countryCode={countryCode}
          preferredCountries={[
            i18n.t('personalinformation.default_country_code'),
          ]}
          withFlagButton={false}
          translation={i18n.t('personalinformation.country_picker_language')}
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
            setCallingCode(country.callingCode[0])
            dispatchNewPhoneNumber(country.cca2, country.callingCode[0], number)
          }}
        />
      </View>
    </LabelInputContainer>
  )
})

const styles = StyleSheet.create({
  collapsed: {
    minWidth: 115,
    textAlign: 'right',
  },
  container: {
    alignItems: Platform.OS === 'android' ? 'center' : 'baseline',
    flexDirection: 'row-reverse',
  },
  expanded: {
    flexGrow: 1,
    marginStart: Spacing.margin,
    textAlign: 'left',
  },
  textInput: {
    ...Typography.body,
    color: Colors.darkText,
    paddingVertical: 0,
  },
})

export default PhoneNumberInput
