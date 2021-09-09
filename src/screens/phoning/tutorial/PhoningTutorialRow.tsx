import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Spacing, Typography } from '../../../styles'
import { useThemedStyles } from '../../../themes'
import Theme from '../../../themes/Theme'

type Props = Readonly<{
  onPress: () => void
}>

export interface PhoningTutorialRowViewModel {
  id: string
}

export const PhoningTutorialRow: FunctionComponent<Props> = ({ onPress }) => {
  const styles = useThemedStyles(stylesFactory)
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Text style={styles.title}>{'Comment faire un appel'}</Text>
        <Text style={styles.link} accessibilityRole={'link'} onPress={onPress}>
          {'regarder le tutoriel'}
        </Text>
      </View>
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
      flexDirection: 'column',
      alignItems: 'center',
      paddingRight: 8 * Spacing.unit,
    },
    link: {
      ...Typography.headline,
      flexShrink: 1,
      padding: 16,
      paddingTop: 5,
      alignSelf: 'flex-start',
      color: theme.primaryColor,
    },
    title: {
      ...Typography.headline,
      flexShrink: 1,
      padding: 16,
      paddingBottom: 5,
      alignSelf: 'flex-start',
    },
  })
}
export default PhoningTutorialRow
