import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Spacing, Typography, Styles } from '../../../styles'
import { useThemedStyles, useTheme } from '../../../themes'
import Theme from '../../../themes/Theme'
import { BorderlessButton } from '../../shared/Buttons'

type Props = Readonly<{
  onPress: () => void
}>

export interface PhoningTutorialRowViewModel {
  id: string
}

export const PhoningTutorialRow: FunctionComponent<Props> = ({ onPress }) => {
  const styles = useThemedStyles(stylesFactory)
  const { theme } = useTheme()
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Text style={styles.title}>{'Comment faire un appel'}</Text>
        <BorderlessButton
          title={'regarder le tutoriel'}
          textStyle={styles.linkText}
          style={styles.linkButton}
          onPress={onPress}
        />
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
      paddingRight: 8 * Spacing.unit,
    },
    linkText: {
      ...Styles.eventSeeMoreButtonTextStyle(theme),
      color: theme.primaryColor,
    },
    linkButton: {
      flexShrink: 1,
      padding: Spacing.margin,
      paddingLeft: -Spacing.margin,
      paddingTop: Spacing.small,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },
    title: {
      ...Typography.headline,
      flexShrink: 1,
      padding: Spacing.margin,
      paddingBottom: Spacing.small,
      alignSelf: 'flex-start',
    },
  })
}
export default PhoningTutorialRow
