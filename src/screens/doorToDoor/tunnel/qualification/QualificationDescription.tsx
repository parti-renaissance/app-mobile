import React from 'react'
import { FunctionComponent } from 'react'
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'
import { Spacing, Typography } from '../../../../styles'

export type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  description: string
}>

const QualificationDescription: FunctionComponent<Props & Props> = ({
  description,
  style,
}) => {
  return <Text style={[styles.description, style]}>{description}</Text>
}

const styles = StyleSheet.create({
  description: {
    ...Typography.body,
    marginHorizontal: Spacing.unit,
  },
})

export default QualificationDescription
