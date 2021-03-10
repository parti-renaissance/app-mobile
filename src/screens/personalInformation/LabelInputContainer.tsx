import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'

type Props = Readonly<{
  label: string
  children: any
}>

const LabelInputContainer: FC<Props> = (props) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.label}>{props.label}</Text>
        <View style={styles.input}>{props.children}</View>
      </View>
      <View style={styles.separator} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.unit,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...Typography.body,
    color: Colors.darkText,
  },
  input: {
    flexGrow: 1,
  },
  separator: {
    height: Spacing.separatorHeight,
    marginTop: Spacing.unit,
    backgroundColor: Colors.separator,
  },
})

export default LabelInputContainer
