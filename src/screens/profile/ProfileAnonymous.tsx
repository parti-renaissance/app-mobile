import React, { FC } from 'react'
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native'

import { Colors, Spacing, Typography } from '../../styles'
import ProfilePollsCompleted from './ProfilePollsCompleted'
import ProfileSettingsHeader from './ProfileSettingsHeader'
import ProfileSettingsItem from './ProfileSettingsItem'
import i18n from '../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../shared/Buttons'
import { versionLabel } from './version'
import { ProfileScreenViewModel } from './ProfileScreenViewModel'
import { ExternalLink } from '../shared/ExternalLink'

type Props = Readonly<{
  openTermsOfUse: () => void
  openDataProtection: () => void
  openLogin: () => void
  openZipCode: () => void
  viewModel: ProfileScreenViewModel
}>

const ProfileAnonymous: FC<Props> = ({
  openTermsOfUse,
  openDataProtection,
  openLogin,
  openZipCode,
  viewModel,
}) => {
  const openAppSettings = async () => {
    await Linking.openSettings()
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{viewModel.region}</Text>
          <Text style={styles.titleText}>{viewModel.area}</Text>
        </View>
        <ProfilePollsCompleted viewModel={viewModel.polls} />
        <Text style={styles.notLogged}>{i18n.t('profile.not_connected')}</Text>
        <PrimaryButton
          style={styles.loginButton}
          title={i18n.t('unauthenticatedhome.login')}
          onPress={openLogin}
        />
        <SecondaryButton
          title={i18n.t('unauthenticatedhome.register')}
          onPress={() => {
            ExternalLink.openUrl(i18n.t('unauthenticatedhome.register_url'))
          }}
        />
      </View>
      <ProfileSettingsHeader title={i18n.t('profile.menu.parameters')} />
      <ProfileSettingsItem
        title={i18n.t('profile.menu.postal_code')}
        onPress={openZipCode}
      />
      <ProfileSettingsItem
        title={i18n.t('profile.menu.notifications')}
        onPress={openAppSettings}
      />
      <ProfileSettingsHeader title={i18n.t('profile.menu.legal')} />
      <ProfileSettingsItem
        title={i18n.t('profile.menu.termsofuse')}
        onPress={openTermsOfUse}
      />
      <ProfileSettingsItem
        title={i18n.t('profile.menu.dataprotection')}
        onPress={openDataProtection}
      />
      <Text style={styles.version}>{versionLabel}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.unit,
  },
  loginButton: {
    marginBottom: Spacing.unit,
  },
  notLogged: {
    ...Typography.caption1,
    color: Colors.lightText,
    marginBottom: Spacing.mediumMargin,
  },
  title: {
    alignItems: 'center',
    marginBottom: Spacing.margin,
    marginTop: Spacing.mediumMargin,
  },
  titleText: {
    ...Typography.largeTitle,
  },
  version: {
    marginTop: Spacing.mediumMargin,
    marginVertical: Spacing.largeMargin,
    textAlign: 'center',
    ...Typography.lightCallout,
  },
})

export default ProfileAnonymous
