import React, { FunctionComponent } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { ActionRowViewModel } from './ActionRowViewModel'

type Props = Readonly<{
  viewModel: ActionRowViewModel
  onPress: (id: number) => void
}>

export const ActionRow: FunctionComponent<Props> = ({ viewModel, onPress }) => {
  return (
    <View style={styles.card}>
      <TouchablePlatform
        onPress={() => onPress(viewModel.id)}
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
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingRight: Spacing.margin,
  },
  title: {
    ...Typography.title2,
    marginLeft: Spacing.margin,
  },
})
