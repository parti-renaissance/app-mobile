import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import BotBilanCTA from '@/components/ProfileCards/BotBilanCTA/BotBilanCTA'
import ProcurationCTA from '@/components/ProfileCards/ProcurationCTA/ProcurationCTA'
import MyProfileCard from '@/components/ProfileCards/ProfileCard/MyProfileCard'
import ProgramCTA from '@/components/ProfileCards/ProgramCTA/ProgramCTA'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import * as metatags from '@/config/metatags'
import { useSession } from '@/ctx/SessionProvider'
import HomeFeedList from '@/screens/home/feed/HomeFeedList'
import { Redirect, Stack as RouterStack } from 'expo-router'
import Head from 'expo-router/head'
import { YStack } from 'tamagui'

const HomeScreen: React.FC = () => {
  return (
    <>
      <Head>
        <title>{metatags.createTitle('Le fil')}</title>
      </Head>
      <PageLayout>
        <PageLayout.SideBarLeft>
          <YStack gap="$3">
            <MyProfileCard />
            <ProcurationCTA />
            <AppDownloadCTA />
          </YStack>
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          <BoundarySuspenseWrapper
            fallback={
              <YStack gap="$4" padding="$8" $sm={{ paddingHorizontal: 0, paddingTop: '$4' }}>
                <SkeCard>
                  <SkeCard.Content>
                    <SkeCard.Chip />
                    <SkeCard.Title />
                    <SkeCard.Description />
                    <SkeCard.Description />
                    <SkeCard.Description />
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
                    <SkeCard.Description />
                    <SkeCard.Description />
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
            <HomeFeedList />
          </BoundarySuspenseWrapper>
        </PageLayout.MainSingleColumn>
        <PageLayout.SideBarRight>
          <ProgramCTA />
          <BotBilanCTA />
        </PageLayout.SideBarRight>
      </PageLayout>
    </>
  )
}

export default HomeScreen
