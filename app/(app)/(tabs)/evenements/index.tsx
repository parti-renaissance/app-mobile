import React, { useState } from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import EventFeedList from '@/components/events/EventFeedList'
import BottomSheetFilter from '@/components/events/EventFilterForm/BottomSheetFilters'
import EventFilterForm from '@/components/events/EventFilterForm/EventFilterForm'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import ProcurationCTA from '@/components/ProfileCards/ProcurationCTA/ProcurationCTA'
import MyProfileCard from '@/components/ProfileCards/ProfileCard/MyProfileCard'
import ProfileLoginCTA from '@/components/ProfileCards/ProfileLoginCTA/ProfileLoginCTA'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import { Tabs } from '@/components/Tabs/Tabs'
import VoxCard from '@/components/VoxCard/VoxCard'
import * as metatags from '@/config/metatags'
import { useSession } from '@/ctx/SessionProvider'
import Head from 'expo-router/head'
import { useMedia, YStack } from 'tamagui'

const EventsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'myEvents'>('events')
  const media = useMedia()
  const { isAuth } = useSession()
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
          </YStack>
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          <BottomSheetFilter />
          {isAuth && (
            <Tabs<'events' | 'myEvents'>
              value={activeTab}
              onChange={setActiveTab}
              grouped={media.gtMd}
              $gtMd={{ paddingHorizontal: '$5', paddingTop: '$4', paddingBottom: 0 }}
            >
              <Tabs.Tab id="events">Tous les événements</Tabs.Tab>
              <Tabs.Tab id="myEvents">J'y participe</Tabs.Tab>
            </Tabs>
          )}
          <BoundarySuspenseWrapper
            fallback={
              <YStack gap="$4" padding="$5" $sm={{ paddingHorizontal: 0, paddingTop: '$4' }}>
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
          <VoxCard.Content>
            <EventFilterForm />
            <ProcurationCTA />
            <AuthFallbackWrapper>
              <AppDownloadCTA />
            </AuthFallbackWrapper>
          </VoxCard.Content>
        </PageLayout.SideBarRight>
      </PageLayout>
    </>
  )
}

export default EventsScreen
