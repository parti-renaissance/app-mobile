import React from 'react'
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
            <MyProfileCard />
            <ProcurationCTA />
            <AuthFallbackWrapper>
              <AppDownloadCTA />
            </AuthFallbackWrapper>
          </YStack>
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          <BottomSheetFilter />
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
            <EventFeedList />
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
