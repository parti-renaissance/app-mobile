import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Spacing } from '../../../styles'
import ErrorView from '../../shared/ErrorView'
import { ViewStateError } from '../../shared/ViewState'

type Props = Readonly<{
  state: ViewStateError
}>

export const HomeFeedErrorRow: FunctionComponent<Props> = ({ state }) => {
  return (
    <View style={styles.container}>
      <ErrorView state={state} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.largeMargin,
  },
})
