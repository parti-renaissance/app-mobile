import React, { FC, useCallback, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import * as Linking from 'expo-linking'
import { useFocusEffect } from '@react-navigation/native'
import { ServerTimeoutError } from '../../core/errors'
import {
  GetUserProfileInteractor,
  GetUserProfileInteractorResult,
} from '../../core/interactor/GetUserProfileInteractor'
import { Colors } from '../../styles'
import { StatefulView } from '../shared/StatefulView'
import { ViewState } from '../shared/ViewState'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import ProfileAuthenticated from './ProfileAuthenticated'
import { ProfileScreenViewModelMapper } from './ProfileScreenViewModelMapper'
import { router } from 'expo-router'


const ProfileScreen = () => {
  const [statefulState, setStatefulState] = useState<
    ViewState<GetUserProfileInteractorResult>
  >(ViewState.Loading())

  const ProfileDispatcher = (content: GetUserProfileInteractorResult) => {
    const openApplicationSettings = async () => {
      await Linking.openSettings()
    }
    const openNotificationMenu = () => {
      router.push('/(tabs)/home/profile/notification')
    }
    const openPersonalInformation = () => {
      router.push('/(tabs)/home/profile/personal-information')
    }
    const viewModel = ProfileScreenViewModelMapper.map(
      content.profile,
      content.department,
    )
    return (
      <ProfileAuthenticated
        openPersonalInformation={openPersonalInformation}
        // openCenterOfInterest={openCenterOfInterest}
        openApplicationSettings={openApplicationSettings}
        openNotificationMenu={openNotificationMenu}
        viewModel={viewModel}
      />
    )
  }

  useFocusEffect(
    useCallback(() => {
      const getProfileInteractor = new GetUserProfileInteractor()
      const remoteDataFetch = (cacheJustLoaded: boolean = false) => {
        getProfileInteractor
          .execute('remote')
          .then((result) => {
            setStatefulState(ViewState.Content(result))
          })
          .catch((error) => {
            const isNetworkError = error instanceof ServerTimeoutError
            if (isNetworkError && cacheJustLoaded) {
              return
            }
            setStatefulState(ViewStateUtils.networkError(error))
          })
      }

      setStatefulState(ViewState.Loading())
      getProfileInteractor
        .execute('cache')
        .then((cachedProfile) => {
          setStatefulState(ViewState.Content(cachedProfile))
          remoteDataFetch(true)
        })
        .catch(() => {
          remoteDataFetch()
        })
    }, []),
  )

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
