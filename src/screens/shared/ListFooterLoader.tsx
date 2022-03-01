import React, { FunctionComponent } from 'react'
import { StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Spacing } from '../../styles'
import LoaderView from './LoaderView'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
}>

export const ListFooterLoader: FunctionComponent<Props> = ({ style }) => {
  return <LoaderView style={[styles.loader, style]} />
}

const styles = StyleSheet.create({
  loader: {
    margin: Spacing.margin,
  },
})
