import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import BotBilanCTA from '@/components/ProfileCards/BotBilanCTA/BotBilanCTA'
import ProcurationCTA from '@/components/ProfileCards/ProcurationCTA/ProcurationCTA'
import ProfileLoginCTA from '@/components/ProfileCards/ProfileLoginCTA/ProfileLoginCTA'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import * as metatags from '@/config/metatags'
import EventFeedList from '@/screens/events/EventFeedList'
import { Stack as RouterStack } from 'expo-router'
import Head from 'expo-router/head'
import { YStack } from 'tamagui'

const EventsScreen: React.FC = () => {
  return (
    <>
      <RouterStack.Screen
        options={{
          headerShown: false,
        }}
      />

      <Head>
        <title>{metatags.createTitle('Nos événements')}</title>
      </Head>

      <PageLayout>
        <PageLayout.SideBarLeft>
          <YStack gap="$3">
            <AuthFallbackWrapper fallback={<ProfileLoginCTA />} />
            <ProcurationCTA />
            <AuthFallbackWrapper>
              <AppDownloadCTA />
            </AuthFallbackWrapper>
          </YStack>
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          <BoundarySuspenseWrapper>
            <EventFeedList />
          </BoundarySuspenseWrapper>
        </PageLayout.MainSingleColumn>
        <PageLayout.SideBarRight>
          <BotBilanCTA />
        </PageLayout.SideBarRight>
      </PageLayout>
    </>
  )
}

export default EventsScreen
