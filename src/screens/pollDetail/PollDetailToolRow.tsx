import React, { FunctionComponent } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'

type Props = Readonly<{
  title: string
  onPress?: () => void
}>

const PollDetailToolRow: FunctionComponent<Props> = ({ title, onPress }) => {
  return (
    <TouchablePlatform touchHighlight={Colors.touchHighlight} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
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

export default PollDetailToolRow
