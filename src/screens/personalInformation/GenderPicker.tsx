import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  gender_female,
  gender_male,
  gender_unknown,
} from '../../core/entities/PersonalInformation'
import { Colors, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import LabelInputContainer from './LabelInputContainer'
import RNPickerSelect from 'react-native-picker-select'

type Props = Readonly<{}>

const GenderPicker: FC<Props> = () => {
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
          value: null,
        }}
        Icon={() => <View style={styles.icon} />}
        onValueChange={(value) => console.log(value)}
        items={[
          {
            label: i18n.t('personalinformation.gender_male'),
            value: gender_male,
          },
          {
            label: i18n.t('personalinformation.gender_female'),
            value: gender_female,
          },
          {
            label: i18n.t('personalinformation.gender_unknown'),
            value: gender_unknown,
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
