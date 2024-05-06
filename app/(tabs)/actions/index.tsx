import React from 'react'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import MobileWall from '@/components/MobileWall/MobileWall'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import BotBilanCTA from '@/components/ProfileCards/BotBilanCTA/BotBilanCTA'
import ProcurationCTA from '@/components/ProfileCards/ProcurationCTA/ProcurationCTA'
import MyProfileCard from '@/components/ProfileCards/ProfileCard/MyProfileCard'
import { useSession } from '@/ctx/SessionProvider'
import CompActionsScreen from '@/screens/actions/ActionsScreen'
import { Redirect } from 'expo-router'
import { isWeb, useMedia, YStack } from 'tamagui'

export default function ActionsScreen() {
  const { isAuth } = useSession()
  const { gtMd } = useMedia()

  if (!isAuth) {
    return <Redirect href={'/(tabs)/evenements/'} />
  }

  if (isWeb) {
    return (
      <PageLayout>
        <PageLayout.SideBarLeft>
          <YStack gap="$3">
            <MyProfileCard />
            <ProcurationCTA />
          </YStack>
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          {gtMd ? (
            <YStack p={'$7'}>
              <AppDownloadCTA variant={'screenshots'} />
            </YStack>
          ) : (
            <PageLayout.StateFrame paddingHorizontal={'$4'}>
              <MobileWall />
            </PageLayout.StateFrame>
          )}
        </PageLayout.MainSingleColumn>
        <PageLayout.SideBarRight>
          <BotBilanCTA />
        </PageLayout.SideBarRight>
      </PageLayout>
    )
  }

  // @ts-ignore
  return <CompActionsScreen />
}
