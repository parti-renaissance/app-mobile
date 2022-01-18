import React, { FC } from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'

type Props = Readonly<{
  label: string
  errorMessage?: string
  disabled?: boolean
  labelStyle?: StyleProp<ViewStyle>
  multiLine?: boolean
  children: any
}>

const LabelInputContainer: FC<Props> = (props) => {
  const hasErrorMessage =
    props.errorMessage !== undefined && props.errorMessage !== ''
  const borderColor = hasErrorMessage
    ? Colors.inputTextErrorMessage
    : Colors.separator
  const labelStyle = props.labelStyle ? props.labelStyle : styles.label
  const labelStateStyle =
    props.disabled === true ? styles.labelDisabled : styles.labelEnabled
  const containerStyle = props.multiLine ? null : styles.containerSingleLine

  return (
    <View>
      <View style={containerStyle}>
        <Text style={[labelStyle, labelStateStyle]}>{props.label}</Text>
        <View
          style={[styles.input, props.multiLine ? styles.inputMultiLine : null]}
        >
          {props.children}
        </View>
      </View>
      <View style={[styles.separator, { backgroundColor: borderColor }]} />
      {hasErrorMessage ? (
        <Text style={styles.errorMessage}>{props.errorMessage}</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  containerSingleLine: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Spacing.unit,
  },
  errorMessage: {
    ...Typography.errorMessage,
    marginTop: Spacing.small,
  },
  input: {
    flexGrow: 1,
  },
  inputMultiLine: {
    paddingTop: Spacing.unit,
  },
  label: {
    ...Typography.body,
    color: Colors.darkText,
  },
  labelDisabled: {
    color: Colors.lightText,
  },
  labelEnabled: {
    color: Colors.darkText,
  },
  separator: {
    backgroundColor: Colors.separator,
    height: Spacing.separatorHeight,
    marginTop: Spacing.unit,
  },
})

export default LabelInputContainer
