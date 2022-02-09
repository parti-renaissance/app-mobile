import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import TagView from '../events/TagView'
import { VerticalSpacer } from '../shared/Spacer'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { NewsRowViewModel } from './NewsRowViewModel'

type Props = Readonly<{
  viewModel: NewsRowViewModel
  onPress: () => void
}>

const NewsRow: FunctionComponent<Props> = ({ viewModel, onPress }) => {
  return (
    <TouchablePlatform
      touchHighlight={Colors.touchHighlight}
      disabled={!viewModel.isEnabled}
      onPress={onPress}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <TagView
            viewModel={{
              label: viewModel.tag,
              ...Styles.eventTag3,
            }}
          />
          <VerticalSpacer spacing={Spacing.unit} />
          <Text style={styles.title}>{viewModel.title}</Text>
          <VerticalSpacer spacing={Spacing.unit} />
          <Text style={styles.caption}>{viewModel.author}</Text>
          <Text style={styles.caption}>{viewModel.date}</Text>
        </View>
        {viewModel.isEnabled ? (
          <Image
            style={styles.disclosureIcon}
            source={require('../../assets/images/disclosureIndicator.png')}
          />
        ) : null}
      </View>
    </TouchablePlatform>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: Spacing.margin,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'flex-start',
  },
  caption: {
    ...Typography.body,
    color: Colors.lightText,
  },
  description: {
    ...Typography.body,
    marginTop: Spacing.small,
  },
  disclosureIcon: {
    alignSelf: 'center',
    marginStart: Spacing.small,
  },
  title: {
    ...Typography.title2,
  },
})

export default NewsRow
