import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import BotBilanCTA from '@/components/ProfileCards/BotBilanCTA/BotBilanCTA'
import ProcurationCTA from '@/components/ProfileCards/ProcurationCTA/ProcurationCTA'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import CardListAuthSkeleton from '@/components/Skeleton/CardListUnAuthSkeleton'
import * as metatags from '@/config/metatags'
import { useSession } from '@/ctx/SessionProvider'
import HomeFeedList from '@/screens/home/feed/HomeFeedList'
import { Redirect, Stack as RouterStack } from 'expo-router'
import Head from 'expo-router/head'
import { YStack } from 'tamagui'

const HomeScreen: React.FC = () => {
  const { isAuth } = useSession()

  if (!isAuth) {
    return <Redirect href={'/(tabs)/evenements/'} />
  }

  return (
    <>
      <RouterStack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Head>
        <title>{metatags.createTitle('Le fil')}</title>
      </Head>
      <PageLayout>
        <PageLayout.SideBarLeft>
          <YStack gap="$3">
            <ProcurationCTA />
            <AppDownloadCTA />
          </YStack>
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          <AuthFallbackWrapper fallback={<CardListAuthSkeleton title="Pour voir votre fil, connectez-vous ou créez un compte" />}>
            <BoundarySuspenseWrapper>
              <HomeFeedList />
            </BoundarySuspenseWrapper>
          </AuthFallbackWrapper>
        </PageLayout.MainSingleColumn>
        <PageLayout.SideBarRight>
          <BotBilanCTA />
        </PageLayout.SideBarRight>
      </PageLayout>
    </>
  )
}

export default HomeScreen
