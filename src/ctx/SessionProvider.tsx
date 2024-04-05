import React from 'react'
import { LoginInteractor } from '@/core/interactor/LoginInteractor'
import AuthenticationRepository from '@/data/AuthenticationRepository'
import { useLazyRef } from '@/hooks/useLazyRef'
import { useQueryClient } from '@tanstack/react-query'
import { useStorageState } from '../hooks/useStorageState'

export let sessionSetter: (session: string) => void | null = null

const AuthContext = React.createContext<{
  signIn: (credentials: { email: string; password: string }) => Promise<void>
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
  sessionSetter = setSession
  const loginInteractor = useLazyRef(() => new LoginInteractor())
  const authenticationRepository = useLazyRef(() => AuthenticationRepository.getInstance())
  const queryClient = useQueryClient()

  const handleSignIn = async (credentials: { email: string; password: string }) => {
    return loginInteractor.current.login(credentials, setSession).then(([session, profile]) => {
      queryClient.setQueryData(['profile'], profile)
    })
  }

  const handleSignOut = async () => {
    await authenticationRepository.current.logout(false).then(() => {
      queryClient.setQueryData(['profile'], null)
      setSession(null)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
        signOut: handleSignOut,
        session: session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
