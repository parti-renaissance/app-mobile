import React, { forwardRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextInput,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  label?: string
  textInputProps: TextInputProps
  errorMessage?: string | undefined
}>

const LabelTextInput = forwardRef<TextInput, Props>((props, ref) => {
  const hasErrorMessage =
    props.errorMessage !== undefined && props.errorMessage !== ''
  const borderColor =
    props.errorMessage !== undefined
      ? Colors.inputTextErrorMessage
      : Colors.inputTextBorder

  return (
    <View style={props.style}>
      {props.label !== undefined ? (
        <Text style={styles.inputLabel}>{props.label}</Text>
      ) : null}
      <TextInput
        ref={ref}
        {...props.textInputProps}
        style={[
          styles.input,
          props.textInputProps.style,
          { borderBottomColor: borderColor },
        ]}
      />
      {hasErrorMessage ? (
        <Text style={styles.errorMessage}>{props.errorMessage}</Text>
      ) : null}
    </View>
  )
})

const styles = StyleSheet.create({
  inputLabel: {
    ...Typography.subheadline,
    marginBottom: Spacing.unit,
  },
  input: {
    ...Typography.inputText,
    borderBottomWidth: Spacing.inputTextBorder,
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: Spacing.unit,
  },
  errorMessage: {
    ...Typography.errorMessage,
    marginTop: Spacing.small,
  },
})

export default LabelTextInput
