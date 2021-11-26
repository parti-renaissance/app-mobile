import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { NewsRowViewModel } from './NewsRowViewModel'

type Props = Readonly<{
  viewModel: NewsRowViewModel
  onPress: (url: string) => void
}>

const NewsRow: FunctionComponent<Props> = ({ viewModel, onPress }) => {
  const hasUrl = viewModel.url !== undefined
  return (
    <TouchablePlatform
      touchHighlight={Colors.touchHighlight}
      disabled={!hasUrl}
      onPress={() => {
        if (hasUrl) {
          onPress(viewModel.url!)
        }
      }}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{viewModel.title}</Text>
          <Text style={styles.description}>{viewModel.description}</Text>
          <Text style={styles.date}>{viewModel.date}</Text>
        </View>
        {hasUrl ? (
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
  },
  date: {
    ...Typography.lightCaption1,
    marginTop: Spacing.small,
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
    ...Typography.subheadline,
  },
})

export default NewsRow
