import React from 'react'
import { AuthenticationState } from '@/core/entities/AuthenticationState'
import { IdentifyUserOnErrorMonitorInteractor } from '@/core/interactor/IdentifyUserOnErrorMonitorInteractor'
import AuthenticationRepository from '@/data/AuthenticationRepository'
import { ApplicationUpgradeInteractor } from '../core/interactor/ApplicationUpgradeInteractor'
import { Analytics } from '@/utils/Analytics'
import { PushNotification } from '@/utils/PushNotification'
import PushRepository from '@/data/PushRepository'
const authenticationRepository = AuthenticationRepository.getInstance()
import { SplashScreen } from 'expo-router'

import { useSegments, useRouter } from 'expo-router'

type SessionContextType = {
  isLoggedIn: boolean
  isLoading: boolean
}

const SessionContext = React.createContext<SessionContextType>(null)

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = React.useState<boolean | undefined>(
    undefined,
  )
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  useProtectedRoute(isLoggedIn)

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
  }

  authenticationRepository.stateListener = updateFromState
  React.useEffect(() => {
    new ApplicationUpgradeInteractor()
      .execute()
      .then(() =>
        authenticationRepository.getAuthenticationState().then(updateFromState),
      )
      .then(() => {
        setIsLoading(false)
        SplashScreen.hideAsync()
      })
  }, [])

  return (
    <SessionContext.Provider value={{ isLoggedIn, isLoading }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  const context = React.useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}


function useProtectedRoute(isLoggedIn: boolean) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    const isDevSection = segments[0] === "dev";

    // if (isDevSection) {
    //   return;
    // }

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !isLoggedIn &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/onboarding");
    } else if (isLoggedIn && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/home/");
    }
  }, [isLoggedIn, segments]);
}
