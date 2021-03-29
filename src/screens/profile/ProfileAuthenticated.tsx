import React, { FC } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  Alert,
} from 'react-native'

import { Spacing, Typography } from '../../styles'
import ProfilePollsCompleted from './ProfilePollsCompleted'
import ProfileSettingsHeader from './ProfileSettingsHeader'
import ProfileSettingsItem from './ProfileSettingsItem'
import AuthenticationRepository from '../../data/AuthenticationRepository'
import { PrimaryButton } from '../shared/Buttons'
import i18n from '../../utils/i18n'
import { ProfileScreenViewModel } from './ProfileScreenViewModel'
import { versionLabel } from './version'
import { useTheme } from '../../themes'
import { ExternalLink } from '../shared/ExternalLink'
import ProfileSettingsCard from './ProfileSettingsCard'

type Props = Readonly<{
  openPersonalInformation: () => void
  viewModel: ProfileScreenViewModel
}>

const ProfileAuthenticated: FC<Props> = ({
  openPersonalInformation,
  viewModel,
}) => {
  const { theme } = useTheme()
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

  const openAppSettings = async () => {
    await Linking.openSettings()
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Image source={theme.image.profile()} />
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
      <ProfileSettingsHeader title={i18n.t('profile.menu.parameters')} />
      <ProfileSettingsCard
        style={styles.settingsCard}
        title={i18n.t('profile.menu.personal_information')}
        description={i18n.t('profile.menu.personal_information_description')}
        image={require('../../assets/images/imageProfileInformations.png')}
        onPress={openPersonalInformation}
      />
      <ProfileSettingsCard
        style={styles.settingsCard}
        title={i18n.t('profile.menu.notifications')}
        description={i18n.t('profile.menu.notifications_description')}
        image={require('../../assets/images/imageProfileNotifications.png')}
        onPress={openAppSettings}
      />
      <ProfileSettingsHeader title={i18n.t('profile.menu.legal')} />
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
  container: {
    flex: 1,
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.unit,
  },
  logout: {
    marginTop: Spacing.mediumMargin,
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
    ...Typography.largeTitle,
  },
  version: {
    marginTop: Spacing.mediumMargin,
    marginVertical: Spacing.largeMargin,
    textAlign: 'center',
    ...Typography.lightCallout,
  },
  settingsCard: {
    marginTop: Spacing.small,
    marginHorizontal: Spacing.margin,
  },
  certifiedBadge: {
    width: 32,
    height: 32,
    marginTop: -18,
  },
})

export default ProfileAuthenticated
