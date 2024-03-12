import React, { FunctionComponent, useEffect, useState } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { Calendar as CalendarSvg, Home as HomeSvg, Inbox as InboxSvg, Sparkle as SparkleSvg, Zap as ZapSvg } from '@tamagui/lucide-icons'
import * as SplashScreen from 'expo-splash-screen'
import { AuthenticationState } from '../core/entities/AuthenticationState'
import { ApplicationUpgradeInteractor } from '../core/interactor/ApplicationUpgradeInteractor'
import { IdentifyUserOnErrorMonitorInteractor } from '../core/interactor/IdentifyUserOnErrorMonitorInteractor'
import AuthenticationRepository from '../data/AuthenticationRepository'
import PushRepository from '../data/PushRepository'
import { Analytics } from '../utils/Analytics'
import { PushNotification } from '../utils/PushNotification'
import { AuthenticatedRootNavigator } from './authenticatedRoot/AuthenticatedRootNavigator'
import { UnauthenticatedRootNavigator } from './unauthenticatedRoot/UnauthenticatedRootNavigator'

const authenticationRepository = AuthenticationRepository.getInstance()

type TabRoute = {
  name: string
  screenName: string
  icon: React.NamedExoticComponent<IconProps>
  gradiant?: string[]
}

export const ROUTES: TabRoute[] = [
  {
    name: 'home',
    screenName: 'Fil',
    icon: HomeSvg,
    gradiant: ['#8D98FF', '#8050E6'],
  },
  {
    name: 'news',
    screenName: 'Événements',
    icon: CalendarSvg,
    gradiant: ['#52ABFB', '#0868E7'],
  },
  {
    name: 'actions',
    screenName: 'Actions',
    icon: ZapSvg,
    gradiant: ['#68F984', '#06B827'],
  },
  {
    name: 'events',
    screenName: 'Ripostes',
    icon: SparkleSvg,
    gradiant: ['#FDA302', '#F7681E'],
  },
  {
    name: 'tools',
    screenName: 'Ressources',
    icon: InboxSvg,
    gradiant: ['#E461E8', '#8B2DBF'],
  },
]

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
      new IdentifyUserOnErrorMonitorInteractor().execute()
      PushRepository.getInstance()
        .synchronizeGeneralTopicSubscription()
        .catch((error) => {
          console.log(error)
        })
      setLoggedIn(true)
    }
    SplashScreen.hideAsync()
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
