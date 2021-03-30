import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'

type Props = Readonly<{
  label: string
  errorMessage?: string
  disabled?: boolean
  children: any
}>

const LabelInputContainer: FC<Props> = (props) => {
  const hasErrorMessage =
    props.errorMessage !== undefined && props.errorMessage !== ''
  const borderColor = hasErrorMessage
    ? Colors.inputTextErrorMessage
    : Colors.separator
  const labelStyle =
    props.disabled === true ? styles.labelDisabled : styles.labelEnabled
  return (
    <View>
      <View style={styles.container}>
        <Text style={[styles.label, labelStyle]}>{props.label}</Text>
        <View style={styles.input}>{props.children}</View>
      </View>
      <View style={[styles.separator, { backgroundColor: borderColor }]} />
      {hasErrorMessage ? (
        <Text style={styles.errorMessage}>{props.errorMessage}</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
