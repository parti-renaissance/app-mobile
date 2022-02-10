import React, { FunctionComponent } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { Colors, Spacing, Typography } from '../../styles'
import TagView from '../shared/TagView'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { PollRowViewModel } from './PollRowViewModel'

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
            <TagView size="small">{viewModel.tag}</TagView>
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
  horizontalLabelsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    aspectRatio: 395 / 247,
    flex: 1,
    height: undefined,
    width: '100%',
  },
  subtitle: {
    ...Typography.lightCaption1,
    marginRight: Spacing.small,
  },
  title: {
    ...Typography.title2,
    marginBottom: Spacing.small,
  },
  verticalLabelsContainer: {
    flex: 1,
    marginTop: Spacing.unit,
    padding: Spacing.small,
  },
})

export default PollHighlightedRow
