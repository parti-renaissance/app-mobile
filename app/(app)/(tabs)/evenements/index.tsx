import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ButtonGroup from '@/components/base/ButtonGroup/ButtonGroup'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import MyProfileCard from '@/components/ProfileCards/ProfileCard/MyProfileCard'
import ProfileLoginCTA from '@/components/ProfileCards/ProfileLoginCTA/ProfileLoginCTA'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import VoxCard from '@/components/VoxCard/VoxCard'
import * as metatags from '@/config/metatags'
import { useSession } from '@/ctx/SessionProvider'
import EventFilterForm from '@/features/events/components/EventFilterForm/EventFilterForm'
import EventFeedList from '@/features/events/pages'
import Head from 'expo-router/head'
import { useMedia, XStack, YStack } from 'tamagui'

const options = [{ label: 'Tous les événements', value: 'events' } as const, { label: "J'y participe", value: 'myEvents' } as const]

const EventsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'myEvents'>('events')
  const media = useMedia()
  const insets = useSafeAreaInsets()
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
          <YStack flex={1} flexGrow={1} flexBasis={0} gap={16}>
            <YStack $gtLg={{ display: 'none' }} gap={16} paddingTop={!isAuth ? insets.top + 24 : 24}>
              <XStack pl={24}>
                {isAuth ? <ButtonGroup theme="blue" options={options} value={activeTab} onChange={(x) => setActiveTab(x ?? 'events')} /> : null}
              </XStack>
              <YStack paddingHorizontal={16} height={50}>
                <EventFilterForm />
              </YStack>
            </YStack>

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
              <YStack flex={1} height="100%">
                <EventFeedList activeTab={activeTab} />
              </YStack>
            </BoundarySuspenseWrapper>
          </YStack>
        </PageLayout.MainSingleColumn>
        <PageLayout.SideBarRight>
          <VoxCard.Content>
            <YStack gap={16} $lg={{ display: 'none' }}>
              <XStack gap={16}>
                {isAuth ? <ButtonGroup theme="blue" options={options} value={activeTab} onChange={(x) => setActiveTab(x ?? 'events')} /> : null}
              </XStack>
              <YStack>
                <EventFilterForm />
              </YStack>
            </YStack>
          </VoxCard.Content>
        </PageLayout.SideBarRight>
      </PageLayout>
    </>
  )
}

export default EventsScreen
