import React from 'react'
import MobileWallLayout from '@/components/MobileWallLayout/MobileWallLayout'
import { useSession } from '@/ctx/SessionProvider'
import CompActionsScreen from '@/screens/actions/ActionsScreen'
import { Redirect } from 'expo-router'
import { isWeb } from 'tamagui'

export default function ActionsScreen() {
  const { isAuth } = useSession()

  if (!isAuth) {
    return <Redirect href={'/(tabs)/evenements/'} />
  }

  if (isWeb) {
    return <MobileWallLayout />
  }

  return <CompActionsScreen />
}
