import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import i18n from '../../utils/i18n'
import { Colors, Spacing, Typography } from '../../styles'
import { PrimaryButton, SecondaryButton } from '../shared/Buttons'
import { Screen, UnauthenticatedHomeScreenProps } from '../../navigation'
import LinearGradient from 'react-native-linear-gradient'

const UnauthenticatedHomeScreen = ({
  navigation,
}: UnauthenticatedHomeScreenProps) => {
  return (
    <ImageBackground
      source={require('../../assets/images/backgroundUnauthenticatedHome.png')}
      resizeMode="cover"
      style={styles.container}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#33000000', '#00000000']}
        style={styles.background}
      >
        <SafeAreaView style={styles.content}>
          <Text style={styles.title}>
            {i18n.t('unauthenticatedhome.title')}
          </Text>
          <Text style={styles.titleRest}>
            {i18n.t('unauthenticatedhome.title_rest')}
          </Text>
          <View style={styles.spacer} />
          <Text style={styles.description}>
            {i18n.t('unauthenticatedhome.description')}
          </Text>
          <PrimaryButton
            style={styles.button}
            textStyle={styles.buttonLoginText}
            title={i18n.t('unauthenticatedhome.login')}
            onPress={() => {
              navigation.navigate(Screen.login)
            }}
          />
          <SecondaryButton
            style={styles.button}
            textStyle={styles.buttonText}
            title={i18n.t('unauthenticatedhome.signup')}
            onPress={() => {
              // TODO
              navigation.navigate(Screen.signUp)
            }}
          />
          <Text style={styles.separator}>
            {i18n.t('unauthenticatedhome.or')}
          </Text>
          <SecondaryButton
            style={styles.button}
            textStyle={styles.buttonText}
            title={i18n.t('unauthenticatedhome.login_lrem')}
            onPress={() => {
              // TODO
              navigation.navigate(Screen.login)
            }}
          >
            <View style={styles.buttonImageContainer}>
              <Image
                source={require('../../assets/images/iconEM.png')}
                style={styles.buttonImage}
              />
            </View>
          </SecondaryButton>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    marginBottom: Spacing.margin,
  },
  buttonImage: {
    height: 16,
    resizeMode: 'contain',
    width: 44,
  },
  buttonImageContainer: {
    paddingHorizontal: Spacing.small,
  },
  buttonLoginText: {
    ...Typography.callout,
    color: Colors.primaryButtonTextColor,
  },
  buttonText: {
    ...Typography.callout,
  },
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: Colors.modalOverlayBackground,
    flex: 1,
    padding: Spacing.mediumMargin,
  },
  description: {
    ...Typography.body,
    color: Colors.white,
    marginHorizontal: Spacing.largeMargin,
    marginVertical: Spacing.mediumMargin,
    textAlign: 'center',
  },
  separator: {
    ...Typography.body,
    color: Colors.white,
    marginBottom: Spacing.margin,
    textAlign: 'center',
  },
  spacer: {
    flexGrow: 1,
  },
  title: {
    ...Typography.largeTitle,
    color: Colors.white,
    marginTop: Spacing.largeMargin,
  },
  titleRest: {
    ...Typography.largeTitleBold,
    color: Colors.white,
  },
})

export default UnauthenticatedHomeScreen
