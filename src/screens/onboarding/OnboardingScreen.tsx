import React, { FC } from 'react'
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../shared/Buttons'
import { FlexibleVerticalSpacer, VerticalSpacer } from '../shared/Spacer'
import { useOnboardingScreen } from './useOnboardingScreen.hook'

const OnboardingScreen = () => {
  const { viewModel, onLogin, onSignUp, onLegacyLogin } = useOnboardingScreen()
  return (
    <ImageBackground
      source={viewModel.image}
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
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <Text style={styles.title} numberOfLines={2} allowFontScaling={false}>
            {`Le 9 juin,\nnous avons`}
          </Text>
          <Text
            style={styles.titleRest}
            numberOfLines={2}
            allowFontScaling={false}
          >
            { `Besoin\nd'Europe`}
          </Text>
          <FlexibleVerticalSpacer minSpacing={Spacing.mediumMargin} />
          {/* <Text style={styles.description}>
            {i18n.t('onboarding.description')}
          </Text> */}
          <VerticalSpacer spacing={Spacing.mediumMargin} />
          <PrimaryButton
            style={styles.button}
            title={i18n.t('onboarding.login')}
            onPress={onLogin}
          />
          <SecondaryButton
            style={styles.button}
            title={i18n.t('onboarding.signup')}
            onPress={onSignUp}
          />
          <Text style={styles.separator}>{i18n.t('onboarding.or')}</Text>
          <SecondaryButton
            style={styles.button as StyleProp<ViewStyle>}
            onPress={onLegacyLogin}
          >
            {({ textStyle }) => (
              <View style={styles.reButtonContent}>
                <Text style={[textStyle]}>
                  {i18n.t('onboarding.login_lrem')}
                </Text>
                <Image
                  source={require('../../assets/images/iconRE.png')}
                  style={styles.reButtonIcon}
                />
              </View>
            )}
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
  reButtonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.unit,
    height: 20,
  },
  reButtonIcon: {
    objectFit: 'contain',
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
    textAlign: 'center',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  separator: {
    ...Typography.body,
    color: Colors.white,
    marginBottom: Spacing.margin,
    textAlign: 'center',
  },
  title: {
    ...Typography.largeTitle,
    color: Colors.primaryColor,
    marginTop: Spacing.largeMargin,
  },
  titleRest: {
    ...Typography.largeTitleBold,
    color: Colors.white,
  },
})

export default OnboardingScreen
