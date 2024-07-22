import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useSession } from '@/ctx/SessionProvider'
import * as eventTypes from '@/services/events/schema'
import { ScrollView, useMedia, YStack } from 'tamagui'
import { AsideCardContent, AsideShare, EventStatus, ScrollStack } from './EventComponents'
import { SubscribeCard } from './SubscribeCard'

const useSharedState = (data: eventTypes.RestEvent) => {
  const media = useMedia()
  const imageSource = data.image_url ?? (eventTypes.isPartialEvent(data) ? require('@/assets/images/eventRestrictedImagePlaceholder.png') : undefined)
  const session = useSession()
  return {
    imageSource,
    media,
    session,
  }
}

export default function EventDetailsScreen({ data }: { data: eventTypes.RestEvent }) {
  const media = useMedia()
  return media.lg ? <EventDetailsScreenMobile data={data} /> : <EventDetailsScreenDesktop data={data} />
}

function EventDetailsScreenMobile({ data }: { data: eventTypes.RestEvent }) {
  const { imageSource, media } = useSharedState(data)
  return (
    <PageLayout.MainSingleColumn>
      <ScrollStack>
        <VoxCard overflow="hidden" paddingBottom={media.gtLg ? 0 : '$10'}>
          {imageSource && <VoxCard.Image image={imageSource} />}
          <VoxCard.Content>
            <EventStatus data={data} />
            {data.category && <VoxCard.Chip event>{data.category.name}</VoxCard.Chip>}
            <VoxCard.Title>{data.name}</VoxCard.Title>
            {eventTypes.isFullEvent(data) && (
              <VoxCard.Description full markdown>
                {data.description}
              </VoxCard.Description>
            )}

            <AsideCardContent data={data} />
            <AsideShare data={data} id={data.uuid} />
          </VoxCard.Content>
        </VoxCard>
      </ScrollStack>
      <SafeAreaView edges={['bottom']}>
        <YStack position="absolute" bg="$white1" bottom={0} left="$0" width="100%" elevation="$1" p="$3">
          <SubscribeCard data={data} />
        </YStack>
      </SafeAreaView>
    </PageLayout.MainSingleColumn>
  )
}

function EventDetailsScreenDesktop({ data }: { data: eventTypes.RestEvent }) {
  const { imageSource, media, session } = useSharedState(data)
  return (
    <>
      <PageLayout.MainSingleColumn>
        <ScrollStack>
          <VoxCard overflow="hidden" paddingBottom={media.gtLg ? 0 : '$10'}>
            {imageSource && <VoxCard.Image image={imageSource} />}
            <VoxCard.Content>
              {data.category && <VoxCard.Chip event>{data.category.name}</VoxCard.Chip>}
              <VoxCard.Title>{data.name}</VoxCard.Title>
              {eventTypes.isFullEvent(data) && (
                <VoxCard.Description full markdown>
                  {data.description}
                </VoxCard.Description>
              )}
              {!session.isAuth && eventTypes.isFullEvent(data) && (
                <>
                  <AsideCardContent data={data} />
                  <AsideShare data={data} id={data.uuid} />
                </>
              )}
            </VoxCard.Content>
          </VoxCard>
        </ScrollStack>
      </PageLayout.MainSingleColumn>

      <PageLayout.SideBarRight>
        <ScrollView>
          <YStack gap="$6">
            <VoxCard>
              <VoxCard.Content pt="$6">
                <EventStatus data={data} />
                <SubscribeCard data={data} />
                {session.isAuth && <AsideCardContent data={data} />}
                {!session.isAuth && eventTypes.isFullEvent(data) && <AsideShare data={data} id={data.uuid} />}
              </VoxCard.Content>
            </VoxCard>
          </YStack>
        </ScrollView>
      </PageLayout.SideBarRight>
    </>
  )
}
