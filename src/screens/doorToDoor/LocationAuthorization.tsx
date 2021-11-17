import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Spacing, Typography } from '../../styles'
import { useTheme, useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import i18n from '../../utils/i18n'

type Props = {
  onAuthorization: (isAuthorized: Boolean) => void
}

const LocationAuthorization = ({ onAuthorization }: Props) => {
  const styles = useThemedStyles(stylesFactory)
  const { theme } = useTheme()

  return (
    <View style={styles.container}>
      <Image style={styles.phone} source={theme.image.locationPhone()} />
      <Text style={styles.title}>{i18n.t('doorToDoor.location.title')}</Text>
      <Text style={styles.subtitle}>
        {i18n.t('doorToDoor.location.subtitle')}
      </Text>
      <TouchableOpacity onPress={() => onAuthorization(true)}>
        <Text style={styles.authorise}>
          {i18n.t('doorToDoor.location.cta')}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    authorise: {
      ...Typography.title2,
      color: theme.primaryColor,
      marginHorizontal: Spacing.margin,
      marginTop: Spacing.margin,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    phone: {
      alignSelf: 'center',
    },
    subtitle: {
      ...Typography.lightCallout,
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
