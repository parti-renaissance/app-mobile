import React, { FC } from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Colors, Spacing, Typography } from '../../../../styles'
import { TouchablePlatform } from '../../../shared/TouchablePlatform'
import { TunnelDoorInterlocutorChoiceCardViewModel } from './TunnelDoorInterlocutorChoiceCardViewModel'

type Props = {
  viewModel: TunnelDoorInterlocutorChoiceCardViewModel
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export const TunnelDoorInterlocutorChoiceCard: FC<Props> = ({
  viewModel,
  style,
  onPress,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchablePlatform
        style={styles.content}
        onPress={onPress}
        touchHighlight={Colors.touchHighlight}
      >
        <Text style={styles.text}>{viewModel.title}</Text>
      </TouchablePlatform>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryButtonBackground,
    borderRadius: 40,
    overflow: 'hidden',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.margin,
  },
  text: {
    ...Typography.callout,
    textAlign: 'center',
  },
})
