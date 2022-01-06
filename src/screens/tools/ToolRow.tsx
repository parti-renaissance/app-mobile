import React, { FunctionComponent } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { ToolRowViewModel } from './ToolRowViewModel'

type Props = Readonly<{
  viewModel: ToolRowViewModel
  onPress: (id: number) => void
}>

export const ToolRow: FunctionComponent<Props> = ({ viewModel, onPress }) => {
  return (
    <View style={styles.card}>
      <TouchablePlatform
        onPress={() => {
          onPress(viewModel.id)
        }}
        touchHighlight={Colors.touchHighlight}
      >
        <View style={styles.container}>
          <Image source={viewModel.image} />
          <Text style={styles.title}>{viewModel.title}</Text>
        </View>
      </TouchablePlatform>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.lightBackground,
    borderRadius: 8,
    marginBottom: Spacing.unit,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8 * Spacing.unit,
  },
  title: {
    ...Typography.title2,
    flexShrink: 1,
  },
})
