import React, { FC } from 'react'
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Colors, Spacing, Typography } from '../../../../styles'
import { TouchablePlatform } from '../../../shared/TouchablePlatform'
import { TunnelDoorOpeningChoiceCardViewModel } from './TunnelDoorOpeningChoiceCardViewModel'

type Props = {
  viewModel: TunnelDoorOpeningChoiceCardViewModel
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export const TunnelDoorOpeningChoiceCard: FC<Props> = ({
  viewModel,
  style,
  onPress,
}) => {
  return (
    <View style={[styles.card, style]}>
      <TouchablePlatform
        style={styles.cardContent}
        onPress={onPress}
        touchHighlight={Colors.touchHighlight}
      >
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>{viewModel.title}</Text>
        </View>
      </TouchablePlatform>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonTitle: {
    ...Typography.title2,
    flex: 1,
    marginLeft: Spacing.margin,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.lightBackground,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: Spacing.unit,
    overflow: 'hidden',
  },
  cardContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})
