import React, { useMemo } from 'react'
import { LoginInteractor } from '@/core/interactor/LoginInteractor'
import AuthenticationRepository from '@/data/AuthenticationRepository'
import { useLazyRef } from '@/hooks/useLazyRef'
import useLogin, { useRegister } from '@/hooks/useLogin'
import { useGetProfil, useGetUserScopes } from '@/hooks/useProfil'
import { useStorageState } from '@/hooks/useStorageState'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { useToastController } from '@tamagui/toast'
import { useQueryClient } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'

type AuthContext = {
  signIn: (props?: { code: string }) => Promise<void>
  signOut: () => Promise<void>
  signUp: () => Promise<void>
  isAuth: boolean
  session?: string | null
  isLoading: boolean
  user: ReturnType<typeof useGetProfil>
  scope: ReturnType<typeof useGetUserScopes>
}

const AuthContext = React.createContext<AuthContext>({
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  isAuth: false,
  session: null,
  isLoading: false,
  user: {} as ReturnType<typeof useGetProfil>,
  scope: {} as ReturnType<typeof useGetUserScopes>,
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
  const { redirect: pRedirect } = useLocalSearchParams<{ redirect?: string }>()

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
  const register = useRegister()
  const user = useGetProfil({ enabled: !!session })
  const scope = useGetUserScopes({ enabled: !!session })
  const isGlobalLoading = [isLoginInProgress, isLoading, user.isLoading].some(Boolean)
  const isAuth = Boolean(session && !isGlobalLoading)

  const handleSignIn: AuthContext['signIn'] = async (props) => {
    try {
      setIsLoginInProgress(true)
      const session = await login(props?.code)
      if (!session) {
        return
      }
      const { accessToken, refreshToken } = session
      setSession(JSON.stringify({ accessToken, refreshToken }))
      await loginInteractor.current.setUpLogin()
    } catch (e) {
      console.log('error', e)
      ErrorMonitor.log(e.message, { e })
      toast.show('Erreur lors de la connexion', { type: 'error' })
    } finally {
      setIsLoginInProgress(false)
    }
  }

  const handleRegister = async () => {
    try {
      setIsLoginInProgress(true)
      const session = await register()
      if (!session) {
        return
      }
      const { accessToken, refreshToken } = session
      setSession(JSON.stringify({ accessToken, refreshToken }))
      await loginInteractor.current.setUpLogin()
    } catch (e) {
      console.log('error', e)
      ErrorMonitor.log(e.message, { e })
      toast.show('Erreur lors de la connexion', { type: 'error' })
    } finally {
      setIsLoginInProgress(false)
    }
  }

  const handleSignOut = async () => {
    await authenticationRepository.current.logout(false).then(async () => {
      await queryClient.invalidateQueries()
      queryClient.clear()

      router.replace({ pathname: '/(tabs)/evenements/' })
    })
  }

  const providerValue = useMemo(
    () =>
      ({
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUp: handleRegister,
        session,
        isLoading: isGlobalLoading,
        isAuth,
        user,
        scope,
      }) satisfies AuthContext,
    [handleSignIn, handleSignOut, session, isLoginInProgress, isLoading],
  )

  return <AuthContext.Provider value={providerValue}>{props.children}</AuthContext.Provider>
}
