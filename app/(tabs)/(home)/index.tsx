import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import CardListAuthSkeleton from '@/components/Skeleton/CardListUnAuthSkeleton'
import * as metatags from '@/config/metatags'
import { useSession } from '@/ctx/SessionProvider'
import HomeFeedList from '@/screens/home/feed/HomeFeedList'
import { Redirect, Stack as RouterStack } from 'expo-router'
import Head from 'expo-router/head'

const HomeScreen: React.FC = () => {
  const { isAuth, session, isLoading } = useSession()
  if (!session && isLoading) {
    return null
  }
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
        <PageLayout.SideBarLeft />
        <PageLayout.MainSingleColumn>
          <AuthFallbackWrapper fallback={<CardListAuthSkeleton title="Pour voir votre fil, connectez-vous ou créez un compte" />}>
            <BoundarySuspenseWrapper loadingMessage="Nous chargeons votre fil">
              <HomeFeedList />
            </BoundarySuspenseWrapper>
          </AuthFallbackWrapper>
        </PageLayout.MainSingleColumn>
        <PageLayout.SideBarRight />
      </PageLayout>
    </>
  )
}

export default HomeScreen
