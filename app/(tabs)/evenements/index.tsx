import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import ProfileLoginCTA from '@/components/ProfileCards/ProfileLoginCTA/ProfileLoginCTA'
import SpacedContainer from '@/components/SpacedContainer/SpacedContainer'
import * as metatags from '@/config/metatags'
import EventFeedList from '@/screens/events/EventFeedList'
import { Stack as RouterStack } from 'expo-router'
import Head from 'expo-router/head'

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
          <SpacedContainer>
            <ProfileLoginCTA />
          </SpacedContainer>
          <AppDownloadCTA />
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          <BoundarySuspenseWrapper>
            <EventFeedList />
          </BoundarySuspenseWrapper>
        </PageLayout.MainSingleColumn>
        <PageLayout.SideBarRight />
      </PageLayout>
    </>
  )
}

export default EventsScreen
