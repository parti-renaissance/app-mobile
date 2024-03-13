import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
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
  const [value, setValue] = React.useState(props.defaultValue)
  const handleValueChange = (value: Gender) => {
    setValue(value)
    props.onValueChange(value)
  }

  return (
    <LabelInputContainer
      label={i18n.t('personalinformation.gender')}
      errorMessage={props.errorMessage}
      disabled={props.disabled}
      multiLine={props.multiline}
    >
      <Picker
        selectedValue={value}
        onValueChange={handleValueChange}
        enabled={!props.disabled}
        
      >
        <Picker.Item
          label={i18n.t('personalinformation.gender_female')}
          value={Gender.Female}
        />
        <Picker.Item
          label={i18n.t('personalinformation.gender_male')}
          value={Gender.Male}
        />
        {/* <Picker.Item
          label={i18n.t('personalinformation.gender_unknown')}
          value={Gender.Other}
        /> */}
      </Picker>
    </LabelInputContainer>
  )
}

export default GenderPicker
