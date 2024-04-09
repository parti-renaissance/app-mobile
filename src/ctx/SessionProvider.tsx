import React from 'react'
import { LoginInteractor } from '@/core/interactor/LoginInteractor'
import AuthenticationRepository from '@/data/AuthenticationRepository'
import { useLazyRef } from '@/hooks/useLazyRef'
import useLogin, { useSignUp } from '@/hooks/useLogin'
import { useQueryClient } from '@tanstack/react-query'
import { AllRoutes, router, useLocalSearchParams } from 'expo-router'
import { useStorageState } from '../hooks/useStorageState'

const AuthContext = React.createContext<{
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  signUp: () => Promise<void>
  session?: string
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  signUp: () => null,
  session: null,
  isLoading: false,
})

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('credentials')
  const { redirect } = useLocalSearchParams<{ redirect?: AllRoutes }>()

  const loginInteractor = useLazyRef(() => new LoginInteractor())
  const authenticationRepository = useLazyRef(() => AuthenticationRepository.getInstance())
  authenticationRepository.current.sessionSetter = setSession
  const queryClient = useQueryClient()
  const login = useLogin()
  const register = useSignUp()

  const handleSignIn = async () => {
    return login().then((session) => {
      if (!session) return
      const { accessToken, refreshToken } = session
      setSession(JSON.stringify({ accessToken, refreshToken }))
      loginInteractor.current.setUpLogin().then((profile) => {
        queryClient.setQueryData(['profile'], profile)
      })
      router.replace({ pathname: redirect || '/(tabs)/home' })
    })
  }

  const handleSignOut = async () => {
    await authenticationRepository.current.logout(false).then(() => {
      queryClient.setQueryData(['profile'], null)
    })
  }

  const handleSignUp = async () => {
    return register().then(() => {
      // router.replace({ pathname: '/(auth)/onboarding' })
    })
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUp: handleSignUp,
        session: session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
