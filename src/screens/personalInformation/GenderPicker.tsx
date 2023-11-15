import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { Gender } from '../../core/entities/UserProfile'
import { Colors, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import LabelInputContainer from './LabelInputContainer'

type Props = Readonly<{
  onValueChange: (value: Gender) => void
  defaultValue?: Gender
  errorMessage?: string
  disabled?: boolean
  multiline?: boolean
}>

const GenderPicker: FC<Props> = (props) => {
  const textStyle = props.disabled ? styles.textDisabled : styles.textEnabled
  const textAlignStyle = props.multiline ? styles.textLeft : styles.textRight
  return (
    <LabelInputContainer
      label={i18n.t('personalinformation.gender')}
      errorMessage={props.errorMessage}
      disabled={props.disabled}
      multiLine={props.multiline}
    >
      <RNPickerSelect
        style={{
          inputAndroid: {
            ...styles.genderPickerAndroid,
            ...textAlignStyle,
            ...textStyle,
          },
          inputIOS: {
            ...styles.genderPickerIOS,
            ...textAlignStyle,
            ...textStyle,
          },
          placeholder: {
            ...styles.placeholder,
          },
        }}
        useNativeAndroidPickerStyle={false}
        placeholder={{}}
        value={props.defaultValue}
        Icon={<View style={styles.icon} />}
        onValueChange={props.onValueChange}
        items={[
          {
            label: i18n.t('personalinformation.gender_female'),
            value: Gender.Female,
          },
          {
            label: i18n.t('personalinformation.gender_male'),
            value: Gender.Male,
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
    paddingVertical: 0,
  },
  genderPickerIOS: {
    ...Typography.body,
    lineHeight: undefined,
  },
  icon: { height: 1, width: 1 },
  placeholder: {
    color: Colors.lightText,
  },
  textDisabled: {
    color: Colors.lightText,
  },
  textEnabled: {
    color: Colors.darkText,
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
})

export default GenderPicker
