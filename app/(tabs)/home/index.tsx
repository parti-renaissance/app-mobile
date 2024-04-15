import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import CardListAuthSkeleton from '@/components/Skeleton/CardListUnAuthSkeleton'
import { useSession } from '@/ctx/SessionProvider'
import HomeFeedList from '@/screens/home/feed/HomeFeedList'
import { Redirect, Stack as RouterStack } from 'expo-router'

const HomeScreen: React.FC = () => {
  const { session } = useSession()
  if (!session) {
    return <Redirect href={'/(tabs)/events/'} />
  }
  return (
    <>
      <RouterStack.Screen
        options={{
          headerShown: false,
        }}
      />
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
