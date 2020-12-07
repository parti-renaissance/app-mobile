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

const PollRow: FunctionComponent<Props> = ({ viewModel, onPress }) => {
  return (
    <TouchablePlatform touchHighlight={Colors.touchHighlight} onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={viewModel.image}
          resizeMode="contain"
        />
        <View style={styles.labelsContainer}>
          <Text style={styles.title}>{viewModel.title}</Text>
          <Text style={styles.subtitle}>{viewModel.subtitle}</Text>
          <Tag label={viewModel.tag} />
        </View>
      </View>
    </TouchablePlatform>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: Spacing.unit,
    paddingHorizontal: Spacing.margin,
  },
  labelsContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: Spacing.unit,
    padding: Spacing.small,
  },
  title: {
    ...Typography.subheadline,
    marginBottom: Spacing.small,
  },
  subtitle: {
    ...Typography.lightCallout,
    marginBottom: Spacing.small,
  },
  image: {
    width: 136,
    height: 85,
  },
})

export default PollRow
