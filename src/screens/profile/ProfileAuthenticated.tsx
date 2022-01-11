import React, { FC } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native'

import { Spacing, Typography } from '../../styles'
import ProfilePollsCompleted from './ProfilePollsCompleted'
import ProfileSettingsHeader from './ProfileSettingsHeader'
import ProfileSettingsItem from './ProfileSettingsItem'
import AuthenticationRepository from '../../data/AuthenticationRepository'
import { PrimaryButton } from '../shared/Buttons'
import i18n from '../../utils/i18n'
import { ProfileScreenViewModel } from './ProfileScreenViewModel'
import { versionLabel } from './version'
import { ExternalLink } from '../shared/ExternalLink'
import ProfileSettingsCard from './ProfileSettingsCard'

type Props = Readonly<{
  openPersonalInformation: () => void
  openCenterOfInterest: () => void
  openApplicationSettings: () => void
  openNotificationMenu: () => void
  viewModel: ProfileScreenViewModel
}>

const ProfileAuthenticated: FC<Props> = ({
  openPersonalInformation,
  openCenterOfInterest,
  openApplicationSettings,
  openNotificationMenu,
  viewModel,
}) => {
  const logout = () => {
    Alert.alert(
      i18n.t('profile.alert.logout.title'),
      i18n.t('profile.alert.logout.text'),
      [
        {
          text: i18n.t('profile.alert.logout.cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('profile.alert.logout.confirm'),
          onPress: () => AuthenticationRepository.getInstance().logout(),
          style: 'destructive',
        },
      ],
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Image source={require('../../assets/images/imageProfil.png')} />
          {viewModel.isCertified ? (
            <Image
              source={require('../../assets/images/certified.png')}
              style={styles.certifiedBadge}
            />
          ) : null}
        </View>

        <View style={styles.title}>
          <Text style={styles.titleText}>{viewModel.name ?? ''}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{viewModel.region}</Text>
          <Text style={styles.subtitle}>{viewModel.area}</Text>
        </View>
        <ProfilePollsCompleted viewModel={viewModel.polls} />
      </View>
      <ProfileSettingsHeader title={i18n.t('profile.menu.account')} />
      <ProfileSettingsCard
        style={styles.settingsCard}
        viewModel={{
          title: i18n.t('profile.menu.center_interest'),
          description: i18n.t('profile.menu.center_interest_description'),
          image: require('../../assets/images/imageCenterInterest.png'),
        }}
        onPress={openCenterOfInterest}
      />
      <ProfileSettingsCard
        style={styles.settingsCard}
        viewModel={{
          title: i18n.t('profile.menu.personal_information'),
          description: i18n.t('profile.menu.personal_information_description'),
          image: require('../../assets/images/imageProfileInformations.png'),
        }}
        onPress={openPersonalInformation}
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
        onPress={() => {
          ExternalLink.openUrl(i18n.t('profile.menu.termsofuse_url'))
        }}
      />
      <View style={styles.container}>
        <PrimaryButton
          style={styles.logout}
          title={i18n.t('profile.logout')}
          onPress={logout}
        />
        <Text style={styles.version}>{versionLabel}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    marginBottom: Spacing.unit,
    marginTop: Spacing.mediumMargin,
  },
  certifiedBadge: {
    height: 32,
    marginTop: -18,
    width: 32,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.unit,
  },
  logout: {
    marginTop: Spacing.mediumMargin,
  },
  settingsCard: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.small,
  },
  subtitle: {
    ...Typography.subheadline,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: Spacing.unit,
  },
  title: {
    alignItems: 'center',
    marginBottom: Spacing.unit,
    marginTop: Spacing.margin,
  },
  titleText: {
    ...Typography.title,
  },
  version: {
    marginTop: Spacing.mediumMargin,
    marginVertical: Spacing.largeMargin,
    textAlign: 'center',
    ...Typography.lightCaption1,
  },
})

export default ProfileAuthenticated
