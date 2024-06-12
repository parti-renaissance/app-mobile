import React from 'react'
import Error404 from '@/components/404/Error404'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import ProcurationCTA from '@/components/ProfileCards/ProcurationCTA/ProcurationCTA'
import ProfileLoginCTA from '@/components/ProfileCards/ProfileLoginCTA/ProfileLoginCTA'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import * as metatags from '@/config/metatags'
import { useGetEvent } from '@/hooks/useEvents'
import EventDetailsScreen from '@/screens/eventDetail/EventDetailsScreen'
import { Stack as RouterStack, useLocalSearchParams } from 'expo-router'
import Head from 'expo-router/head'
import { isWeb, YStack } from 'tamagui'

const HomeScreen: React.FC = () => {
  const params = useLocalSearchParams<{ id: string }>()
  if (!params.id) return <Error404 />
  return (
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
      <BoundarySuspenseWrapper
        fallback={
          <>
            <PageLayout.MainSingleColumn>
              <YStack gap="$4" padding="$8" $sm={{ paddingHorizontal: 0, paddingTop: '$4' }}>
                <SkeCard>
                  {isWeb ? (
                    <>
                      <SkeCard.Image />
                      <SkeCard.Content>
                        <SkeCard.Chip />
                        <SkeCard.Title />
                        <SkeCard.Description />
                        <SkeCard.Description />
                        <SkeCard.Description />
                        <SkeCard.Description />
                      </SkeCard.Content>
                    </>
                  ) : (
                    <SkeCard.Content>
                      <SkeCard.Image />
                      <SkeCard.Chip />
                      <SkeCard.Title />
                      <SkeCard.Date />
                      <SkeCard.Description />
                      <SkeCard.Author />
                      <SkeCard.Author />
                      <SkeCard.Actions />
                    </SkeCard.Content>
                  )}
                </SkeCard>
              </YStack>
            </PageLayout.MainSingleColumn>
            <PageLayout.SideBarRight>
              <SkeCard>
                <SkeCard.Content>
                  <SkeCard.Date />
                  <SkeCard.Author />
                  <SkeCard.Author />
                  <SkeCard.Section>
                    <SkeCard.Author />
                  </SkeCard.Section>
                  <SkeCard.Section>
                    <SkeCard.Actions />
                  </SkeCard.Section>
                </SkeCard.Content>
              </SkeCard>
            </PageLayout.SideBarRight>
          </>
        }
      >
        <EventDetailScreen id={params.id} />
      </BoundarySuspenseWrapper>
    </PageLayout>
  )
}

function EventDetailScreen(props: Readonly<{ id: string }>) {
  const { data } = useGetEvent({ id: props.id })
  return (
    <>
      <RouterStack.Screen
        options={{
          title: data.name,
        }}
      />
      <Head>
        <title>{metatags.createTitle(data.name)}</title>
      </Head>
      <EventDetailsScreen data={data} />
    </>
  )
}

export default HomeScreen
