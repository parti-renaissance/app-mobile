import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../../styles'
import { useThemedStyles } from '../../../themes'
import Theme from '../../../themes/Theme'
import { TouchablePlatform } from '../../shared/TouchablePlatform'

type Props = Readonly<{
  viewModel: PhoningTutorialRowViewModel
  onPress: (url: string) => void
}>

export interface PhoningTutorialRowViewModel {
  id: string
  title: string
  url?: string
}

export const PhoningTutorialRow: FunctionComponent<Props> = ({
  viewModel,
  onPress,
}) => {
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
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 8 * Spacing.unit,
    },
    title: {
      ...Typography.title2,
      flexShrink: 1,
    },
  })
}
export default PhoningTutorialRow
