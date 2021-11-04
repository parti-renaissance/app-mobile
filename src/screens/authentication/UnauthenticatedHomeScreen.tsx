import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import i18n from '../../utils/i18n'
import { Colors, Spacing, Typography } from '../../styles'
import { BorderlessButton, PrimaryButton } from '../shared/Buttons'
import { Screen, UnauthenticatedHomeScreenProps } from '../../navigation'

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
        <BorderlessButton
          style={styles.skipButton}
          title={i18n.t('unauthenticatedhome.skip')}
          onPress={() => {
            navigation.navigate(Screen.termsOfUse)
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    aspectRatio: 319 / 239,
    bottom: 90,
    height: undefined,
    position: 'absolute',
    resizeMode: 'contain',
    width: '100%',
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
    justifyContent: 'space-between',
  },
  description: {
    ...Typography.body,
    marginHorizontal: Spacing.largeMargin,
    marginTop: 28,
    textAlign: 'center',
  },
  headerLogo: {
    alignSelf: 'center',
    marginTop: 42,
  },
  loginButton: {
    justifyContent: 'center',
    marginHorizontal: Spacing.largeMargin,
  },
  registerButtonContainer: {
    justifyContent: 'center',
    marginHorizontal: Spacing.largeMargin,
    marginTop: Spacing.unit,
  },
  skipButton: {
    justifyContent: 'center',
    marginBottom: Spacing.margin,
    marginTop: Spacing.unit,
  },
})

export default UnauthenticatedHomeScreen
