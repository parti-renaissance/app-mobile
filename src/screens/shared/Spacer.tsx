import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'

type Props = Readonly<{
  spacing: number
}>

export const VerticalSpacer: FunctionComponent<Props> = ({ spacing }) => (
  <View style={{ height: spacing }} />
)

export const HorizontalSpacer: FunctionComponent<Props> = ({ spacing }) => (
  <View style={{ width: spacing }} />
)

type FlexibleProps = Readonly<{
  minSpacing?: number
  maxSpacing?: number
}>

export const FlexibleVerticalSpacer: FunctionComponent<FlexibleProps> = ({
  minSpacing,
  maxSpacing,
}) => (
  <View
    style={[styles.flexible, { maxHeight: maxSpacing, minHeight: minSpacing }]}
  />
)

export const FlexibleHorizontalSpacer: FunctionComponent<FlexibleProps> = ({
  minSpacing,
  maxSpacing,
}) => (
  <View
    style={[styles.flexible, { maxWidth: maxSpacing, minWidth: minSpacing }]}
  />
)

const styles = StyleSheet.create({
  flexible: {
    flex: 1,
  },
})
