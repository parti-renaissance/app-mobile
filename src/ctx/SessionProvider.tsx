import React from 'react'
import { LoginInteractor } from '@/core/interactor/LoginInteractor'
import AuthenticationRepository from '@/data/AuthenticationRepository'
import { useLazyRef } from '@/hooks/useLazyRef'
import useLogin from '@/hooks/useLogin'
import { useQueryClient } from '@tanstack/react-query'
import { set } from 'date-fns'
import { AllRoutes, router, useLocalSearchParams } from 'expo-router'
import { red } from 'theme/colors.hsl'
import { useStorageState } from '../hooks/useStorageState'

const AuthContext = React.createContext<{
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  session?: string
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
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

  const [mRedirect, setMredirect] = React.useState<AllRoutes | null>(null)

  const [isLoginInProgress, setIsLoginInProgress] = React.useState(false)

  React.useEffect(() => {
    if (session && (pRedirect || mRedirect)) {
      router.replace({ pathname: pRedirect || mRedirect })
      setIsLoginInProgress(false)
      setMredirect(null)
    }
  }, [session, pRedirect, mRedirect])

  const loginInteractor = useLazyRef(() => new LoginInteractor())
  const authenticationRepository = useLazyRef(() => AuthenticationRepository.getInstance())
  authenticationRepository.current.sessionSetter = setSession
  const queryClient = useQueryClient()
  const login = useLogin()

  const handleSignIn = async () => {
    setIsLoginInProgress(true)
    const session = await login()
    if (!session) {
      setIsLoginInProgress(false)
      return
    }
    const { accessToken, refreshToken } = session
    setSession(JSON.stringify({ accessToken, refreshToken }))
    await loginInteractor.current.setUpLogin()
    setMredirect('/home/')
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
        session: session,
        isLoading: isLoginInProgress || isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
