import React, { forwardRef } from 'react'
import {
  StyleProp,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextInput,
} from 'react-native'
import { Colors, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import LabelInputContainer from './LabelInputContainer'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  label: string
  nextInput?: React.RefObject<TextInput>
  isLastInput?: boolean
  textInputProps?: TextInputProps
  defaultValue?: string
}>

const LabelTextInput = forwardRef<TextInput, Props>((props, ref) => {
  const returnKeyType = props.isLastInput === true ? 'done' : 'next'
  const submitEditing = () => {
    if (props.nextInput !== undefined) {
      props.nextInput?.current?.focus()
    }
  }
  return (
    <LabelInputContainer label={props.label}>
      <TextInput
        ref={ref}
        style={styles.textInput}
        placeholder={i18n.t('personalinformation.placeholder')}
        placeholderTextColor={Colors.lightText}
        returnKeyType={returnKeyType}
        onSubmitEditing={submitEditing}
        defaultValue={props.defaultValue}
        {...props.textInputProps}
      />
    </LabelInputContainer>
  )
})

const styles = StyleSheet.create({
  textInput: {
    ...Typography.body,
    flexGrow: 1,
    textAlign: 'right',
    paddingVertical: 0,
    color: Colors.darkText,
  },
})

export default LabelTextInput
