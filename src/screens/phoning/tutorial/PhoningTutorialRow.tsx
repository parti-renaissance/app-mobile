import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Spacing, Typography, Styles } from '../../../styles'
import { useThemedStyles } from '../../../themes'
import Theme from '../../../themes/Theme'
import i18n from '../../../utils/i18n'
import { BorderlessButton } from '../../shared/Buttons'

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
        <Text style={styles.title}>{i18n.t('phoning.tutorial.title')}</Text>
        <BorderlessButton
          title={i18n.t('phoning.tutorial.link')}
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
    linkButton: {
      flexShrink: 1,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },
    linkText: {
      ...Styles.eventSeeMoreButtonTextStyle(theme),
      color: theme.primaryColor,
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
