import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import TagView from '../shared/TagView'
import { VerticalSpacer } from '../shared/Spacer'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { NewsRowViewModel } from './NewsRowViewModel'
import CardView from '../shared/CardView'

type Props = Readonly<{
  viewModel: NewsRowViewModel
  onPress: () => void
}>

const HighlightedNewsCard: FunctionComponent<Props> = ({
  viewModel,
  onPress,
}) => {
  return (
    <CardView backgroundColor={Colors.defaultBackground}>
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        disabled={!viewModel.isEnabled}
        onPress={onPress}
      >
        <View style={styles.container}>
          <View style={styles.tagContainerRow}>
            <TagView>{viewModel.tag}</TagView>
            <Image
              source={require('../../assets/images/highlightedNewsIcon.png')}
            />
          </View>
          <VerticalSpacer spacing={Spacing.unit} />
          <Text style={styles.title}>{viewModel.title}</Text>
          <VerticalSpacer spacing={Spacing.unit} />
          <Text style={styles.caption}>{viewModel.author}</Text>
          <Text style={styles.caption}>{viewModel.date}</Text>
        </View>
      </TouchablePlatform>
    </CardView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Spacing.margin,
  },
  tagContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  caption: {
    ...Typography.body,
    color: Colors.lightText,
  },
  description: {
    ...Typography.body,
    marginTop: Spacing.small,
  },
  title: {
    ...Typography.title,
    color: Colors.titleText,
  },
})

export default HighlightedNewsCard
