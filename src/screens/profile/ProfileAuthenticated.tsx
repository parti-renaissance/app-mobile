import React, { FC, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { RemoveAccountInteractor } from '../../core/interactor/RemoveAccountInteractor'
import AuthenticationRepository from '../../data/AuthenticationRepository'
import { Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { AlertUtils } from '../shared/AlertUtils'
import { BorderlessButton, SecondaryButton } from '../shared/Buttons'
import { ExternalLink } from '../shared/ExternalLink'
import LoadingOverlay from '../shared/LoadingOverlay'
import ProfilePollsCompleted from './ProfilePollsCompleted'
import { ProfileScreenViewModel } from './ProfileScreenViewModel'
import ProfileSettingsCard from './ProfileSettingsCard'
import ProfileSettingsHeader from './ProfileSettingsHeader'
import ProfileSettingsItem from './ProfileSettingsItem'
import { router } from 'expo-router'
// import { versionLabel } from './version'

type Props = Readonly<{
  openPersonalInformation: () => void
  // openCenterOfInterest: () => void
  openApplicationSettings: () => void
  openNotificationMenu: () => void
  viewModel: ProfileScreenViewModel
}>

const ProfileAuthenticated: FC<Props> = ({
  openPersonalInformation,
  // openCenterOfInterest,
  openApplicationSettings,
  openNotificationMenu,
  viewModel,
}) => {
  const [isLoadingVisible, setIsLoadingVisible] = useState(false)

  const logout = () => {
    AlertUtils.showDestructiveAlert(
      i18n.t('profile.alert.logout.title'),
      i18n.t('profile.alert.logout.text'),
      i18n.t('profile.alert.logout.confirm'),
      i18n.t('profile.alert.logout.cancel'),
      () => AuthenticationRepository.getInstance().logout(),
    )
  }

  const onRemoveAccountConfirmed = async () => {
    setIsLoadingVisible(true)
    await new RemoveAccountInteractor()
      .execute()
      .catch((error) =>
        AlertUtils.showNetworkAlert(error, onRemoveAccountConfirmed),
      )
      .finally(() => setIsLoadingVisible(false))
  }

  const removeAccount = () => {
    AlertUtils.showDestructiveAlert(
      i18n.t('profile.alert.remove_account.title'),
      i18n.t('profile.alert.remove_account.text'),
      i18n.t('profile.alert.remove_account.confirm'),
      i18n.t('profile.alert.remove_account.cancel'),
      onRemoveAccountConfirmed,
    )
  }

  return (
    <>
      <LoadingOverlay visible={isLoadingVisible} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.avatar}>
            <Image source={require('../../assets/images/imageProfil.png')} />
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
            title: i18n.t('profile.menu.personal_information'),
            description: i18n.t(
              'profile.menu.personal_information_description',
            ),
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
        <ProfileSettingsItem
          title="StoryBook"
          onPress={() => {
            router.replace('/dev/storybook' )
          }} />
        <View style={styles.container}>
          <SecondaryButton
            onPress={logout}
            style={styles.logout}
            textStyle={styles.logoutText}
            title={i18n.t('profile.logout')}
          />
          <BorderlessButton
            onPress={removeAccount}
            textStyle={styles.removeAccountText}
            title={i18n.t('profile.remove_account')}
          />
          {/* <Text style={styles.version}>{versionLabel}</Text> */}
        </View>
      </ScrollView>
    </>
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
    marginBottom: Spacing.unit,
    marginTop: Spacing.margin,
  },
  logoutText: {
    ...Typography.callout,
  },
  removeAccountText: {
    ...Typography.callout,
  },
  settingsCard: {
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.small,
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
