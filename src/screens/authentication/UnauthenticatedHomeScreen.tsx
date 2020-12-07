import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import i18n from '../../utils/i18n'
import { Colors, Spacing, Typography } from '../../styles'
import {
  BorderlessButton,
  PrimaryButton,
  SecondaryButton,
} from '../shared/Buttons'
import { Screen, UnauthenticatedHomeScreenProps } from '../../navigation'
import { ExternalLink } from '../shared/ExternalLink'

const UnauthenticatedHomeScreen = ({
  navigation,
}: UnauthenticatedHomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.headerLogo}
          source={require('../../assets/images/imageLogo.png')}
        />
        <Text style={styles.description}>
          {i18n.t('unauthenticatedhome.description')}
        </Text>
      </View>
      <View>
        <Image
          resizeMode="contain"
          style={styles.backgroundImage}
          source={require('../../assets/images/imageHome.png')}
        />
        <PrimaryButton
          style={styles.loginButton}
          title={i18n.t('unauthenticatedhome.login')}
          onPress={() => {
            navigation.navigate(Screen.login)
          }}
        />
        <View style={styles.registerButtonContainer}>
          <SecondaryButton
            title={i18n.t('unauthenticatedhome.register')}
            onPress={() => {
              ExternalLink.openUrl(i18n.t('unauthenticatedhome.register_url'))
            }}
          />
        </View>
        <BorderlessButton
          style={styles.skipButton}
          title={i18n.t('unauthenticatedhome.skip')}
          onPress={() => {
            navigation.navigate(Screen.anonymousLoginZipCode)
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
    justifyContent: 'space-between',
  },
  headerLogo: {
    alignSelf: 'center',
    marginTop: 42,
  },
  description: {
    ...Typography.body,
    marginHorizontal: Spacing.largeMargin,
    marginTop: 28,
    textAlign: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 319 / 239,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 90,
  },
  loginButton: {
    marginHorizontal: Spacing.largeMargin,
    justifyContent: 'center',
  },
  registerButtonContainer: {
    marginHorizontal: Spacing.largeMargin,
    marginTop: Spacing.unit,
    justifyContent: 'center',
  },
  skipButton: {
    marginBottom: Spacing.margin,
    marginTop: Spacing.unit,
    justifyContent: 'center',
  },
})

export default UnauthenticatedHomeScreen
