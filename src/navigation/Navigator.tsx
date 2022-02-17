import React, { useEffect, useState } from 'react'
import { FunctionComponent } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { AuthenticationState } from '../core/entities/AuthenticationState'
import AuthenticationRepository from '../data/AuthenticationRepository'
import { PushNotification } from '../utils/PushNotification'
import { Analytics } from '../utils/Analytics'
import PushRepository from '../data/PushRepository'
import { ApplicationUpgradeInteractor } from '../core/interactor/ApplicationUpgradeInteractor'
import { AuthenticatedRootNavigator } from './AuthenticatedRootNavigator'
import { UnauthenticatedRootNavigator } from './UnauthenticatedRootNavigator'

const authenticationRepository = AuthenticationRepository.getInstance()

const Navigator: FunctionComponent = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)
  authenticationRepository.stateListener = (state) => {
    updateFromState(state)
  }

  const updateFromState = (authenticationState: AuthenticationState) => {
    if (authenticationState === AuthenticationState.Unauthenticated) {
      Analytics.disable()
      setLoggedIn(false)
    } else if (authenticationState === AuthenticationState.Anonymous) {
      // Only useful for users that migrate from old version where they were
      // logged in as anonymous users
      Analytics.disable()
      setLoggedIn(false)
      authenticationRepository.logout()
    } else {
      PushNotification.requestPermission()
      Analytics.enable()
      PushRepository.getInstance()
        .synchronizeGeneralTopicSubscription()
        .catch((error) => {
          console.log(error)
        })
      setLoggedIn(true)
    }
    SplashScreen.hide()
  }

  useEffect(() => {
    new ApplicationUpgradeInteractor().execute().then(() => {
      authenticationRepository.getAuthenticationState().then(updateFromState)
    })
  }, [])

  if (isLoggedIn === undefined) {
    return null
  } else if (isLoggedIn) {
    return <AuthenticatedRootNavigator />
  } else {
    return <UnauthenticatedRootNavigator />
  }
}

export default Navigator
