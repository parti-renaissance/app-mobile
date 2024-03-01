import React, { FunctionComponent } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import CardView from '../shared/CardView'
import { VerticalSpacer } from '../shared/Spacer'
import TagView from '../shared/TagView'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { NewsRowViewModel } from './NewsRowViewModel'

type Props = Readonly<{
  viewModel: NewsRowViewModel
  trailingIcon?: ImageSourcePropType
  onPress: () => void
}>

const NewsCard: FunctionComponent<Props> = ({
  viewModel,
  trailingIcon,
  onPress,
}) => {
  return (
    <CardView backgroundColor={Colors.defaultBackground}>
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        onPress={onPress}
      >
        <View style={styles.container}>
          <View style={styles.tagContainerRow}>
            <TagView>{viewModel.tag}</TagView>
            {trailingIcon !== undefined && <Image source={trailingIcon} />}
          </View>
          <VerticalSpacer spacing={Spacing.unit} />
          <Text style={styles.title}>{viewModel.title}</Text>
          <VerticalSpacer spacing={Spacing.unit} />
          {viewModel.author && (
            <Text style={styles.caption}>{viewModel.author}</Text>
          )}
          <Text style={styles.caption}>{viewModel.date}</Text>
          <VerticalSpacer spacing={Spacing.margin} />
          <Text numberOfLines={3} style={styles.excerpt}>
            {viewModel.excerpt}
          </Text>
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
  excerpt: {
    ...Typography.title3,
    color: Colors.darkText,
  },
})

export default NewsCard
