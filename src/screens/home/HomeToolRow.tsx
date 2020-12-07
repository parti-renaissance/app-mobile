import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { HomeToolRowViewModel } from './HomeToolRowViewModel'

type Props = Readonly<{
  viewModel: HomeToolRowViewModel
  onPress: (toolUrl: string) => void
}>

const HomeToolRow: FunctionComponent<Props> = ({ viewModel, onPress }) => {
  return (
    <TouchablePlatform
      touchHighlight={Colors.touchHighlight}
      onPress={() => {
        onPress(viewModel.url)
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{viewModel.title}</Text>
        <Image
          style={styles.image}
          source={require('../../assets/images/disclosureIndicator.png')}
        />
      </View>
    </TouchablePlatform>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.rowVerticalMargin,
    paddingEnd: Spacing.unit,
    paddingStart: Spacing.margin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    ...Typography.subheadline,
    flexShrink: 1,
  },
  image: {
    marginStart: Spacing.unit,
  },
})

export default HomeToolRow
