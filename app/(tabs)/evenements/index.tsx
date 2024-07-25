import React, { useState } from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import BottomSheetFilter from '@/components/EventFilterForm/BottomSheetFilters'
import EventFilterForm from '@/components/EventFilterForm/EventFilterForm'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import ProcurationCTA from '@/components/ProfileCards/ProcurationCTA/ProcurationCTA'
import MyProfileCard from '@/components/ProfileCards/ProfileCard/MyProfileCard'
import ProfileLoginCTA from '@/components/ProfileCards/ProfileLoginCTA/ProfileLoginCTA'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import { Tabs } from '@/components/Tabs/Tabs'
import * as metatags from '@/config/metatags'
import EventFeedList from '@/screens/events/EventFeedList'
import Head from 'expo-router/head'
import { useMedia, YStack } from 'tamagui'

const EventsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'myEvents'>('events')
  const media = useMedia()
  return (
    <>
      <Head>
        <title>{metatags.createTitle('Nos événements')}</title>
      </Head>

      <PageLayout>
        <PageLayout.SideBarLeft>
          <YStack gap="$3">
            <AuthFallbackWrapper fallback={<ProfileLoginCTA />} />
            <MyProfileCard />
            <ProcurationCTA />
            <AuthFallbackWrapper>
              <AppDownloadCTA />
            </AuthFallbackWrapper>
          </YStack>
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          <BottomSheetFilter />
          <Tabs<'events' | 'myEvents'>
            value={activeTab}
            onChange={setActiveTab}
            grouped={media.lg}
            $gtMd={{ paddingHorizontal: '$7', paddingTop: '$6', paddingBottom: 0 }}
          >
            <Tabs.Tab id="events">Tous les événements (update)</Tabs.Tab>
            <Tabs.Tab id="myEvents">J'y participe</Tabs.Tab>
          </Tabs>

          <BoundarySuspenseWrapper
            fallback={
              <YStack gap="$4" padding="$8" $sm={{ paddingHorizontal: 0, paddingTop: '$4' }}>
                <SkeCard>
                  <SkeCard.Content>
                    <SkeCard.Chip />
                    <SkeCard.Title />
                    <SkeCard.Date />
                    <SkeCard.Author />
                    <SkeCard.Author />
                    <SkeCard.Actions />
                  </SkeCard.Content>
                </SkeCard>
                <SkeCard>
                  <SkeCard.Content>
                    <SkeCard.Chip />
                    <SkeCard.Image />
                    <SkeCard.Title />
                    <SkeCard.Date />
                    <SkeCard.Author />
                    <SkeCard.Author />
                    <SkeCard.Actions />
                  </SkeCard.Content>
                </SkeCard>
                <SkeCard>
                  <SkeCard.Content>
                    <SkeCard.Chip />
                    <SkeCard.Image />
                    <SkeCard.Title />
                    <SkeCard.Date />
                    <SkeCard.Author />
                    <SkeCard.Author />
                    <SkeCard.Actions />
                  </SkeCard.Content>
                </SkeCard>
                <SkeCard>
                  <SkeCard.Content>
                    <SkeCard.Chip />
                    <SkeCard.Title />
                    <SkeCard.Date />
                    <SkeCard.Author />
                    <SkeCard.Author />
                    <SkeCard.Actions />
                  </SkeCard.Content>
                </SkeCard>
              </YStack>
            }
          >
            <EventFeedList activeTab={activeTab} />
          </BoundarySuspenseWrapper>
        </PageLayout.MainSingleColumn>
        <PageLayout.SideBarRight>
          <EventFilterForm />
        </PageLayout.SideBarRight>
      </PageLayout>
    </>
  )
}

export default EventsScreen
