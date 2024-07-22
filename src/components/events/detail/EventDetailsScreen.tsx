import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components'
import Text from '@/components/base/Text'
import { SubscribeEventButton } from '@/components/Cards'
import EventRegisterForm from '@/components/events/EventRegisterForm/EventRegisterForm'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useSession } from '@/ctx/SessionProvider'
import * as eventTypes from '@/services/events/schema'
import { ScrollView, useMedia, YStack } from 'tamagui'
import { AsideCardContent, AsideShare, EventStatus, LockLeftCard, RegisterButtonSheet, ScrollStack } from './EventComponents'

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
  const { imageSource, media, session } = useSharedState(data)
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
          <AuthFallbackWrapper
            fallback={
              data.visibility !== 'public' ? (
                <LockLeftCard />
              ) : (
                <YStack gap="$3" width="100%">
                  <RegisterButtonSheet id={data.uuid} />
                  <Button variant="text" size="lg" width="100%" onPress={() => session.signIn()}>
                    <Text fontSize="$1">
                      <Text color="$textPrimary" fontWeight="$7">
                        Me connecter
                      </Text>{' '}
                      <Text color="$textSecondary">pour m’inscrire en un clic.</Text>
                    </Text>
                  </Button>
                </YStack>
              )
            }
          >
            {eventTypes.isFullEvent(data) && <SubscribeEventButton key="EventSubsBtn" outside eventId={data.uuid} isSubscribed={!!data.user_registered_at} />}
          </AuthFallbackWrapper>
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
              {!session.isAuth && data.visibility === 'public' && (
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
                <AuthFallbackWrapper
                  fallback={
                    <>
                      {data.visibility !== 'public' ? (
                        <>
                          <LockLeftCard />
                          <AsideShare data={data} id={data.uuid} />
                        </>
                      ) : (
                        <EventRegisterForm eventId={data.uuid} />
                      )}
                    </>
                  }
                >
                  <AsideCardContent data={data} />
                  <AsideShare data={data} id={data.uuid} />
                  {eventTypes.isFullEvent(data) && (
                    <SubscribeEventButton key="EventSubsBtn" outside eventId={data.uuid} isSubscribed={!!data.user_registered_at} />
                  )}
                </AuthFallbackWrapper>
              </VoxCard.Content>
            </VoxCard>
          </YStack>
        </ScrollView>
      </PageLayout.SideBarRight>
    </>
  )
}
