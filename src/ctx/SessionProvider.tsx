import React from 'react'
import { LoginInteractor } from '@/core/interactor/LoginInteractor'
import AuthenticationRepository from '@/data/AuthenticationRepository'
import { useLazyRef } from '@/hooks/useLazyRef'
import useLogin from '@/hooks/useLogin'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { useToastController } from '@tamagui/toast'
import { useQueryClient } from '@tanstack/react-query'
import { fi } from 'date-fns/locale'
import { AllRoutes, router, useLocalSearchParams } from 'expo-router'
import { useStorageState } from '../hooks/useStorageState'

const AuthContext = React.createContext<{
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  signUp: () => Promise<void>
  isAuth: boolean
  session?: string
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  signUp: () => null,
  isAuth: false,
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
  const { redirect: pRedirect } = useLocalSearchParams<{ redirect?: AllRoutes }>()

  const [isLoginInProgress, setIsLoginInProgress] = React.useState(false)
  const toast = useToastController()

  React.useEffect(() => {
    if (session && pRedirect) {
      pRedirect && router.replace({ pathname: pRedirect })
    }
  }, [session, pRedirect])

  const loginInteractor = useLazyRef(() => new LoginInteractor())
  const authenticationRepository = useLazyRef(() => AuthenticationRepository.getInstance())
  authenticationRepository.current.sessionSetter = setSession
  const queryClient = useQueryClient()
  const login = useLogin()

  const handleSignIn = async () => {
    try {
      setIsLoginInProgress(true)
      const session = await login()
      if (!session) {
        return
      }
      const { accessToken, refreshToken } = session
      setSession(JSON.stringify({ accessToken, refreshToken }))
      await loginInteractor.current.setUpLogin()
    } catch (e) {
      ErrorMonitor.log(e.message, { e })
      toast.show('Erreur lors de la connexion', { type: 'error' })
    } finally {
      setIsLoginInProgress(false)
    }
  }

  const handleSignOut = async () => {
    await authenticationRepository.current.logout(false).then(() => {
      queryClient.setQueryData(['profil'], null)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUp: handleSignIn,
        session: session,
        isLoading: isLoginInProgress || isLoading,
        isAuth: !!session && !!(isLoginInProgress || isLoading),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
