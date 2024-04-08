import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import HomeFeedList from '@/screens/home/feed/HomeFeedList'
import { Stack as RouterStack } from 'expo-router'
import { Stack, Text, Theme, YStack } from 'tamagui'

const HomeScreen: React.FC = () => {
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
          <BoundarySuspenseWrapper loadingMessage="Nous chargeons votre fil">
            <HomeFeedList />
          </BoundarySuspenseWrapper>
        </PageLayout.MainSingleColumn>
        <PageLayout.SideBarRight />
      </PageLayout>
    </>
  )
}

export default HomeScreen
