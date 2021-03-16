import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import LabelInputContainer from './LabelInputContainer'
import RNPickerSelect from 'react-native-picker-select'
import { Gender } from '../../core/entities/UserProfile'

type Props = Readonly<{
  onValueChange: (value: Gender | undefined) => void
  defaultValue?: Gender
}>

const GenderPicker: FC<Props> = (props) => {
  return (
    <LabelInputContainer label={i18n.t('personalinformation.gender')}>
      <RNPickerSelect
        style={{
          inputAndroid: {
            ...styles.genderPickerAndroid,
          },
          inputIOS: {
            ...styles.genderPickerIOS,
          },
          placeholder: {
            ...styles.placeholder,
          },
        }}
        useNativeAndroidPickerStyle={false}
        placeholder={{
          label: i18n.t('personalinformation.placeholder'),
          value: undefined,
        }}
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
      />
    </LabelInputContainer>
  )
}

const styles = StyleSheet.create({
  genderPickerAndroid: {
    ...Typography.body,
    textAlign: 'right',
    paddingVertical: 0,
    color: Colors.darkText,
  },
  genderPickerIOS: {
    ...Typography.body,
    color: Colors.darkText,
    textAlign: 'right',
  },
  placeholder: {
    color: Colors.lightText,
  },
  icon: { width: 1, height: 1 },
})

export default GenderPicker
