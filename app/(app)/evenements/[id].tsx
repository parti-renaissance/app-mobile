import React from 'react'
import Error404 from '@/components/404/Error404'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import { VoxButton } from '@/components/Button'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import ProcurationCTA from '@/components/ProfileCards/ProcurationCTA/ProcurationCTA'
import ProfileLoginCTA from '@/components/ProfileCards/ProfileLoginCTA/ProfileLoginCTA'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import * as metatags from '@/config/metatags'
import EventDetailsScreen, { EventDetailsScreenSkeleton } from '@/features/events/pages/detail/EventDetailsScreen'
import { useGetEvent } from '@/services/events/hook'
import { Stack as RouterStack, useLocalSearchParams, useNavigation } from 'expo-router'
import Head from 'expo-router/head'
import { YStack } from 'tamagui'

const HomeScreen: React.FC = () => {
  const params = useLocalSearchParams<{ id: string }>()
  if (!params.id) return <Error404 />
  return (
    <PageLayout>
      <PageLayout.SideBarLeft showOn="gtLg">
        <YStack gap="$3">
          <AuthFallbackWrapper fallback={<ProfileLoginCTA />} />
          <ProcurationCTA />
          <AuthFallbackWrapper>
            <AppDownloadCTA />
          </AuthFallbackWrapper>
        </YStack>
      </PageLayout.SideBarLeft>
      <BoundarySuspenseWrapper fallback={<EventDetailsScreenSkeleton />}>
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
