import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../../styles'
import { TouchablePlatform } from '../../shared/TouchablePlatform'
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
          source={require('../../../assets/images/disclosureIndicator.png')}
        />
      </View>
    </TouchablePlatform>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: Spacing.unit,
    paddingStart: Spacing.margin,
    paddingVertical: Spacing.rowVerticalMargin,
  },
  image: {
    marginStart: Spacing.unit,
  },
  text: {
    ...Typography.subheadline,
    flexShrink: 1,
  },
})

export default HomeToolRow
