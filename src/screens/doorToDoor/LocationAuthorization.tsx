import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { BorderlessButton } from '../shared/Buttons'
import CircularIcon from '../shared/CircularIcon'

type Props = {
  onAuthorizationRequest: () => void
}

const LocationAuthorization = ({ onAuthorizationRequest }: Props) => {
  return (
    <View style={styles.container}>
      <CircularIcon
        style={styles.phone}
        source={require('../../assets/images/mapIcon.png')}
      />
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

const styles = StyleSheet.create({
  authorise: {
    ...Typography.title2,
    color: Colors.primaryColor,
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

export default LocationAuthorization
