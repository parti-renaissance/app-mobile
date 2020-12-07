import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { HomeNewsRowViewModel } from './HomeNewsRowViewModel'

type Props = Readonly<{
  viewModel: HomeNewsRowViewModel
  onPress: (url: string) => void
}>

const HomeNewsRow: FunctionComponent<Props> = ({ viewModel, onPress }) => {
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
    flexShrink: 1,
    flexGrow: 1,
  },
  disclosureIcon: {
    marginStart: Spacing.small,
    alignSelf: 'center',
  },
  title: {
    ...Typography.subheadline,
  },
  description: {
    ...Typography.body,
    marginTop: Spacing.small,
  },
  date: {
    ...Typography.lightCallout,
    marginTop: Spacing.small,
  },
})

export default HomeNewsRow
