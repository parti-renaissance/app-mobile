import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import ProcurationCTA from '@/components/ProfileCards/ProcurationCTA/ProcurationCTA'
import ProfileLoginCTA from '@/components/ProfileCards/ProfileLoginCTA/ProfileLoginCTA'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import * as metatags from '@/config/metatags'
import { useGetEvent } from '@/hooks/useEvents'
import EventDetailsScreen from '@/screens/eventDetail/EventDetailsScreen'
import { Stack as RouterStack, useLocalSearchParams } from 'expo-router'
import Head from 'expo-router/head'
import { YStack } from 'tamagui'

const HomeScreen: React.FC = () => {
  const params = useLocalSearchParams<{ id: string }>()
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
      <BoundarySuspenseWrapper>
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
