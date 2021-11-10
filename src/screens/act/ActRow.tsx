import React, { FunctionComponent } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

import { Colors, Spacing, Typography } from '../../styles'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { ActRowViewModel } from './ActRowViewModel'

type Props = Readonly<{
  viewModel: ActRowViewModel
  onPress: (id: number) => void
}>

export const ActRow: FunctionComponent<Props> = ({ viewModel, onPress }) => {
  const styles = useThemedStyles(stylesFactory)
  return (
    <View style={styles.card}>
      <TouchablePlatform
        onPress={() => {
          onPress(viewModel.id)
        }}
        touchHighlight={Colors.touchHighlight}
      >
        <View style={styles.container}>
          <Image source={viewModel.image} />
          <View style={styles.textWrap}>
            <Text style={styles.title}>{viewModel.title}</Text>
            <Text style={styles.subtitle}>{viewModel.subtitle}</Text>
          </View>
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
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 8 * Spacing.unit,
    },
    textWrap: {
      marginLeft: Spacing.unit,
    },
    title: {
      ...Typography.title2,
      flexShrink: 1,
    },
    subtitle: {
      ...Typography.lightCallout,
      flexShrink: 1,
    },
  })
}
