import React, { FunctionComponent } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { PollRowViewModel } from './PollRowViewModel'
import Tag from './Tag'

type Props = Readonly<{
  viewModel: PollRowViewModel
  onPress?: () => void
}>

const PollHighlightedRow: FunctionComponent<Props> = ({
  viewModel,
  onPress,
}) => {
  return (
    <TouchablePlatform touchHighlight={Colors.touchHighlight} onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={viewModel.image} />
        <View style={styles.verticalLabelsContainer}>
          <Text style={styles.title}>{viewModel.title}</Text>
          <View style={styles.horizontalLabelsContainer}>
            <Text style={styles.subtitle}>{viewModel.subtitle}</Text>
            <Tag label={viewModel.tag} />
          </View>
        </View>
      </View>
    </TouchablePlatform>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: Spacing.unit,
    paddingHorizontal: Spacing.margin,
  },
  verticalLabelsContainer: {
    flex: 1,
    marginTop: Spacing.unit,
    padding: Spacing.small,
  },
  horizontalLabelsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    ...Typography.title2,
    marginBottom: Spacing.small,
  },
  subtitle: {
    ...Typography.lightCallout,
    marginRight: Spacing.small,
  },
  image: {
    flex: 1,
    aspectRatio: 395 / 247,
    width: '100%',
    height: undefined,
  },
})

export default PollHighlightedRow
