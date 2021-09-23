import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from '../../styles'

type Props = Readonly<{
  leadingInset?: number
}>

export const HorizontalSeparator: FunctionComponent<Props> = ({
  leadingInset,
}) => {
  return <View style={[styles.separator, { marginLeft: leadingInset }]} />
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: Colors.separator,
    height: StyleSheet.hairlineWidth,
  },
})
