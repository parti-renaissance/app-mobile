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
import { getToken, useMedia, XStack, YStack } from 'tamagui'

const options = [{ label: 'Tous les événements', value: 'events' } as const, { label: "J'y participe", value: 'myEvents' } as const]

const EventsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'myEvents'>('events')
  const insets = useSafeAreaInsets()
  const { isAuth } = useSession()
  return (
    <>
      <Head>
        <title>{metatags.createTitle('Nos événements')}</title>
      </Head>

      <PageLayout>
        <PageLayout.SideBarLeft>
          <YStack gap="$medium">
            <AuthFallbackWrapper fallback={<ProfileLoginCTA />} />
            <MyProfileCard />
          </YStack>
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          <YStack flex={1} flexGrow={1} flexBasis={0} gap="$medium">
            <YStack $gtLg={{ display: 'none' }} gap="$medium" paddingTop={isAuth ? insets.top + getToken('$large', 'space') : '$medium'}>
              <XStack pl={24} display={isAuth ? 'flex' : 'none'}>
                {isAuth ? <ButtonGroup theme="blue" options={options} value={activeTab} onChange={(x) => setActiveTab(x ?? 'events')} /> : null}
              </XStack>
              <YStack paddingHorizontal="$medium" height={50}>
                <EventFilterForm />
              </YStack>
            </YStack>

            <BoundarySuspenseWrapper
              fallback={
                <YStack gap="$medium" padding="$medium" $sm={{ paddingHorizontal: 0, paddingTop: '$medium' }}>
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
            <YStack gap="$medium" $lg={{ display: 'none' }}>
              <XStack gap="$medium">
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
