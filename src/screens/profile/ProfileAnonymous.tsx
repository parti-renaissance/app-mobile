import React, { FC, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native'

import { Colors, Spacing, Typography } from '../../styles'
import ProfilePollsCompleted from './ProfilePollsCompleted'
import ProfileSettingsHeader from './ProfileSettingsHeader'
import ProfileSettingsItem from './ProfileSettingsItem'
import i18n from '../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../shared/Buttons'
import { versionLabel } from './version'
import ProfileRepository from '../../data/ProfileRepository'
import RegionsRepository from '../../data/RegionsRepository'
import { ProfileScreenViewModel } from './ProfileScreenViewModel'
import { ProfileScreenViewModelMapper } from './ProfileScreenViewModelMapper'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { useFocusEffect } from '@react-navigation/native'
import { ExternalLink } from '../shared/ExternalLink'

type Props = Readonly<{
  openTermsOfUse: () => void
  openLogin: () => void
  openZipCode: () => void
}>

type ContentProps = Readonly<{
  openTermsOfUse: () => void
  openLogin: () => void
  openZipCode: () => void
  viewModel: ProfileScreenViewModel
}>

const ProfileAnonymousContent: FC<ContentProps> = ({
  openTermsOfUse,
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
      <Text style={styles.version}>{versionLabel}</Text>
    </ScrollView>
  )
}

const ProfileAnonymous: FC<Props> = ({
  openTermsOfUse,
  openLogin,
  openZipCode,
}) => {
  const [zipCode, setZipCode] = useState('')
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<ProfileScreenViewModel>
  >(new ViewState.Loading())

  const fetchDepartment = (code: string) => {
    RegionsRepository.getInstance()
      .getDepartment(code)
      .then((department) =>
        setStatefulState(
          new ViewState.Content(
            ProfileScreenViewModelMapper.mapFromDepartment(department),
          ),
        ),
      )
      .catch((error) => {
        setStatefulState(
          new ViewState.Error(GenericErrorMapper.mapErrorMessage(error), () => {
            setStatefulState(new ViewState.Loading())
            fetchDepartment(code)
          }),
        )
      })
  }

  useFocusEffect(() => {
    ProfileRepository.getInstance()
      .getZipCode()
      .then((code) => {
        if (code !== zipCode) {
          // only fetch data on init and if zip code has changed
          fetchDepartment(code)
        }
        setZipCode(code)
      })
  })

  return (
    <StatefulView
      state={statefulState}
      contentComponent={(viewModel) => {
        return (
          <ProfileAnonymousContent
            viewModel={viewModel}
            openTermsOfUse={openTermsOfUse}
            openLogin={openLogin}
            openZipCode={openZipCode}
          />
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Spacing.unit,
    paddingHorizontal: Spacing.margin,
  },
  title: {
    marginTop: Spacing.mediumMargin,
    marginBottom: Spacing.margin,
    alignItems: 'center',
  },
  titleText: {
    ...Typography.largeTitle,
  },
  version: {
    textAlign: 'center',
    marginTop: Spacing.mediumMargin,
    marginVertical: Spacing.largeMargin,
    ...Typography.lightCallout,
  },
  notLogged: {
    ...Typography.caption1,
    color: Colors.lightText,
    marginBottom: Spacing.mediumMargin,
  },
  loginButton: {
    marginBottom: Spacing.unit,
  },
})

export default ProfileAnonymous
