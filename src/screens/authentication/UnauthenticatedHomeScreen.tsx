import React, { FC } from 'react'
import { ImageBackground, StatusBar, StyleSheet, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import i18n from '../../utils/i18n'
import { Colors, Spacing, Typography } from '../../styles'
import { PrimaryButton, SecondaryButton } from '../shared/Buttons'
import LinearGradient from 'react-native-linear-gradient'
import { UnauthenticatedRootNavigatorScreenProps } from '../../navigation/UnauthenticatedRootNavigator'
import { FlexibleVerticalSpacer, VerticalSpacer } from '../shared/Spacer'
import { useUnauthenticatedHomeScreen } from './useUnauthenticatedHomeScreen.hook'

type UnauthenticatedHomeScreenProps = UnauthenticatedRootNavigatorScreenProps<'UnauthenticatedHome'>

const UnauthenticatedHomeScreen: FC<UnauthenticatedHomeScreenProps> = () => {
  const { onLogin, onSignUp, onLegacyLogin } = useUnauthenticatedHomeScreen()
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
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <Text style={styles.title} numberOfLines={2} allowFontScaling={false}>
            {i18n.t('unauthenticatedhome.title')}
          </Text>
          <Text
            style={styles.titleRest}
            numberOfLines={2}
            allowFontScaling={false}
          >
            {i18n.t('unauthenticatedhome.title_rest')}
          </Text>
          <FlexibleVerticalSpacer minSpacing={Spacing.mediumMargin} />
          <Text style={styles.description}>
            {i18n.t('unauthenticatedhome.description')}
          </Text>
          <VerticalSpacer spacing={Spacing.mediumMargin} />
          <PrimaryButton
            style={styles.button}
            title={i18n.t('unauthenticatedhome.login')}
            onPress={onLogin}
          />
          <SecondaryButton
            style={styles.button}
            title={i18n.t('unauthenticatedhome.signup')}
            onPress={onSignUp}
          />
          <Text style={styles.separator}>
            {i18n.t('unauthenticatedhome.or')}
          </Text>
          <SecondaryButton
            style={styles.button}
            onPress={onLegacyLogin}
            title={i18n.t('unauthenticatedhome.login_lrem')}
            trailingIcon={require('../../assets/images/iconEM.png')}
            iconPadding={Spacing.unit}
          />
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
    color: Colors.white,
    marginTop: Spacing.largeMargin,
  },
  titleRest: {
    ...Typography.largeTitleBold,
    color: Colors.white,
  },
})

export default UnauthenticatedHomeScreen
