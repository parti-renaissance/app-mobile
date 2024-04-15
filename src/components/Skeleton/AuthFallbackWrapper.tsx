import React from 'react'
import { ViewProps } from 'react-native'
import { useSession } from '@/ctx/SessionProvider'
import useProtectedRoute from '@/hooks/useProtectedRoute'

const AuthFallbackWrapper = (props: { children: ViewProps['children']; fallback: ViewProps['children'] }) => {
  const { session } = useSession()
  const { isProtectedRoute } = useProtectedRoute()

  return <>{isProtectedRoute && !session ? props.fallback : props.children}</>
}

export default AuthFallbackWrapper
