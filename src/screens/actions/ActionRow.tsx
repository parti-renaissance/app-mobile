import React, { FunctionComponent } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

import { Colors, Spacing, Typography } from '../../styles'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { ActionRowViewModel } from './ActionRowViewModel'

type Props = Readonly<{
  viewModel: ActionRowViewModel
  onPress: (id: number) => void
}>

export const ActionRow: FunctionComponent<Props> = ({ viewModel, onPress }) => {
  const styles = useThemedStyles(stylesFactory)
  return (
    <View style={styles.card}>
      <TouchablePlatform
        onPress={() => onPress(viewModel.id)}
        touchHighlight={Colors.touchHighlight}
      >
        <View style={styles.container}>
          <Image source={viewModel.image} />
          <Text style={styles.title}>{viewModel.title}</Text>
        </View>
      </TouchablePlatform>
    </View>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.lightBackground,
      borderRadius: 8,
      marginBottom: Spacing.unit,
      overflow: 'hidden',
    },
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
      paddingRight: 8 * Spacing.margin,
    },
    title: {
      ...Typography.title2,
      marginLeft: Spacing.margin,
    },
  })
}
