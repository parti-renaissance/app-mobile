import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import ProcurationCTA from '@/components/ProfileCards/ProcurationCTA/ProcurationCTA'
import MyProfileCard from '@/components/ProfileCards/ProfileCard/MyProfileCard'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import * as metatags from '@/config/metatags'
import HomeFeedList from '@/features/homefeed/HomeFeedList'
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
          </YStack>
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          <BoundarySuspenseWrapper
            fallback={
              <YStack gap="$4" padding="$5" $sm={{ paddingHorizontal: 0 }}>
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
          <AppDownloadCTA />
        </PageLayout.SideBarRight>
      </PageLayout>
    </>
  )
}

export default HomeScreen
