import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import LabelInputContainer from './LabelInputContainer'
import RNPickerSelect from 'react-native-picker-select'
import { Gender } from '../../core/entities/UserProfile'

type Props = Readonly<{
  onValueChange: (value: Gender) => void
  defaultValue?: Gender
  errorMessage?: string
  disabled?: boolean
}>

const GenderPicker: FC<Props> = (props) => {
  const textStyle = props.disabled ? styles.textDisabled : styles.textEnabled
  return (
    <LabelInputContainer
      label={i18n.t('personalinformation.gender')}
      errorMessage={props.errorMessage}
      disabled={props.disabled}
    >
      <RNPickerSelect
        style={{
          inputAndroid: {
            ...styles.genderPickerAndroid,
            ...textStyle,
          },
          inputIOS: {
            ...styles.genderPickerIOS,
            ...textStyle,
          },
          placeholder: {
            ...styles.placeholder,
          },
        }}
        useNativeAndroidPickerStyle={false}
        placeholder={{}}
        value={props.defaultValue}
        Icon={() => <View style={styles.icon} />}
        onValueChange={props.onValueChange}
        items={[
          {
            label: i18n.t('personalinformation.gender_male'),
            value: Gender.Male,
          },
          {
            label: i18n.t('personalinformation.gender_female'),
            value: Gender.Female,
          },
          {
            label: i18n.t('personalinformation.gender_unknown'),
            value: Gender.Other,
          },
        ]}
        disabled={props.disabled}
      />
    </LabelInputContainer>
  )
}

const styles = StyleSheet.create({
  genderPickerAndroid: {
    ...Typography.body,
    textAlign: 'right',
    paddingVertical: 0,
  },
  genderPickerIOS: {
    ...Typography.body,
    textAlign: 'right',
  },
  textEnabled: {
    color: Colors.darkText,
  },
  textDisabled: {
    color: Colors.lightText,
  },
  placeholder: {
    color: Colors.lightText,
  },
  icon: { width: 1, height: 1 },
})

export default GenderPicker
