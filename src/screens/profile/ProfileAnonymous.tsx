import React, { FC } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

import { Colors, Spacing, Typography } from '../../styles'
import ProfilePollsCompleted from './ProfilePollsCompleted'
import ProfileSettingsHeader from './ProfileSettingsHeader'
import ProfileSettingsItem from './ProfileSettingsItem'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { versionLabel } from './version'
import { ProfileScreenViewModel } from './ProfileScreenViewModel'
import ProfileSettingsCard from './ProfileSettingsCard'

type Props = Readonly<{
  openTermsOfUse: () => void
  openDataProtection: () => void
  openLogin: () => void
  openZipCode: () => void
  openApplicationSettings: () => void
  openNotificationMenu: () => void
  viewModel: ProfileScreenViewModel
}>

const ProfileAnonymous: FC<Props> = ({
  openTermsOfUse,
  openDataProtection,
  openLogin,
  openZipCode,
  openApplicationSettings,
  openNotificationMenu,
  viewModel,
}) => {
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
      </View>
      <ProfileSettingsHeader title={i18n.t('profile.menu.account')} />
      <ProfileSettingsCard
        style={styles.settingsCard}
        viewModel={{
          title: i18n.t('profile.menu.postal_code'),
          description: i18n.t('profile.menu.postal_code_description'),
          image: require('../../assets/images/imageProfileZipCode.png'),
        }}
        onPress={openZipCode}
      />
      <ProfileSettingsCard
        style={styles.settingsCard}
        viewModel={{
          title: i18n.t('profile.menu.notifications'),
          description: i18n.t('profile.menu.notifications_description'),
          image: require('../../assets/images/imageProfileNotifications.png'),
        }}
        onPress={openNotificationMenu}
      />
      <ProfileSettingsHeader title={i18n.t('profile.menu.application')} />
      <ProfileSettingsItem
        title={i18n.t('profile.menu.settings')}
        onPress={openApplicationSettings}
      />
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
  settingsCard: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.small,
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
