import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Spacing, Typography } from '../../styles'
import { useTheme, useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import i18n from '../../utils/i18n'
import { BorderlessButton } from '../shared/Buttons'

type Props = {
  onAuthorizationRequest: () => void
}

const LocationAuthorization = ({ onAuthorizationRequest }: Props) => {
  const styles = useThemedStyles(stylesFactory)
  const { theme } = useTheme()

  return (
    <View style={styles.container}>
      <Image style={styles.phone} source={theme.image.locationPhone()} />
      <Text style={styles.title}>{i18n.t('doorToDoor.location.title')}</Text>
      <Text style={styles.subtitle}>
        {i18n.t('doorToDoor.location.subtitle')}
      </Text>
      <BorderlessButton
        onPress={onAuthorizationRequest}
        title={i18n.t('doorToDoor.location.cta')}
        textStyle={styles.authorise}
      />
    </View>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    authorise: {
      ...Typography.title2,
      color: theme.primaryColor,
      marginTop: Spacing.margin,
      textAlign: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    phone: {
      alignSelf: 'center',
      marginBottom: Spacing.extraExtraLargeMargin,
    },
    subtitle: {
      ...Typography.lightCaption1,
      padding: Spacing.margin,
      textAlign: 'center',
    },
    title: {
      ...Typography.title2,
      textAlign: 'center',
    },
  })
}

export default LocationAuthorization
