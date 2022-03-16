import React, { FC, useCallback, useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, Linking } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Colors } from '../../styles'
import { StatefulView } from '../shared/StatefulView'
import { ViewState } from '../shared/ViewState'
import ProfileAuthenticated from './ProfileAuthenticated'
import {
  GetUserProfileInteractor,
  GetUserProfileInteractorResult,
} from '../../core/interactor/GetUserProfileInteractor'
import { ProfileScreenViewModelMapper } from './ProfileScreenViewModelMapper'
import { ServerTimeoutError } from '../../core/errors'
import { CloseButton } from '../shared/NavigationHeaderButton'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { ProfileModalNavigatorScreenProps } from '../../navigation/profileModal/ProfileModalNavigatorScreenProps'
import { useStatefulQuery } from '../newsDetail/useStatefulQuery.hook'
import { useProfileQuery } from './useProfileQuery.hook'

type ProfileScreenProps = ProfileModalNavigatorScreenProps<'Profile'>

const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const ProfileDispatcher = (content: GetUserProfileInteractorResult) => {
    const openApplicationSettings = async () => {
      await Linking.openSettings()
    }
    const openNotificationMenu = () => {
      navigation.navigate('NotificationMenu')
    }
    const openPersonalInformation = () => {
      navigation.navigate('PersonalInformationModal', {
        screen: 'PersonalInformation',
      })
    }
    const openCenterOfInterest = () => {
      navigation.navigate('CenterOfInterest')
    }
    const viewModel = ProfileScreenViewModelMapper.map(
      content.profile,
      content.department,
    )
    return (
      <ProfileAuthenticated
        openPersonalInformation={openPersonalInformation}
        openCenterOfInterest={openCenterOfInterest}
        openApplicationSettings={openApplicationSettings}
        openNotificationMenu={openNotificationMenu}
        viewModel={viewModel}
      />
    )
  }

  const { statefulState } = useProfileQuery()

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
    })
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView
        state={statefulState}
        contentComponent={ProfileDispatcher}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
})

export default ProfileScreen
