import React from 'react'
import { Button } from '@/components'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import VoxCard from '@/components/VoxCard/VoxCard'
import { mapPropsAuthor, mapPropsDate, mapPropsLocation } from '@/helpers/eventsFeed'
import { useGetEvent, useIsShortEvent, useSubscribeEvent, useUnsubscribeEvent } from '@/hooks/useEvents'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, Separator, Stack, Text, useMedia } from 'tamagui'
import { useDebouncedCallback } from 'use-debounce'

const MemoizedSubscribeButton = React.memo(SubscribeButton)

const padding = '$7'

const HomeScreen: React.FC = () => {
  const params = useLocalSearchParams<{ id: string }>()
  return (
    <>
      <PageLayout>
        <PageLayout.SideBarLeft />
        <BoundarySuspenseWrapper loadingMessage="Nous chargons votre fil">
          <EventDetailScreen id={params.id} />
        </BoundarySuspenseWrapper>
      </PageLayout>
    </>
  )
}

function EventDetailScreen(props: { id: string }) {
  const { data } = useGetEvent(props.id)
  const isShortEvent = useIsShortEvent(data)
  const location = mapPropsLocation(data)
  const author = mapPropsAuthor(data)
  const date = mapPropsDate(data)
  const media = useMedia()

  const AsideCardContent = (
    <>
      <VoxCard.Date {...date} />
      {data.mode === 'online' ? <VoxCard.Visio /> : <VoxCard.Location {...location} />}
      {!isShortEvent && <VoxCard.Capacity>Capacité {data.capacity} personnes</VoxCard.Capacity>}
      {!isShortEvent && <VoxCard.Attendees attendees={{ count: data.participants_count }} />}

      <Text fontFamily="$PublicSans" textAlign="center" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$yellow9">
        Cette évènement est réservée aux adhérents à jour de cotisation.
      </Text>

      <Separator borderStyle="dashed" />

      <Stack gap="$2">
        <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$textDisabled">
          Évènement créer par:
        </Text>
        <VoxCard.Author {...author} />
      </Stack>
    </>
  )

  return (
    <>
      <PageLayout.MainSingleColumn>
        <ScrollView
          flex={1}
          contentContainerStyle={{
            pt: media.gtSm ? padding : '$4',
            pl: media.gtSm ? padding : undefined,
            pr: media.gtSm ? padding : undefined,
          }}
        >
          <VoxCard overflow="hidden" paddingBottom={media.gtLg ? 0 : '$10'}>
            <VoxCard.Image large image={data.image_url || 'https://picsum.photos/600/400'} />
            <VoxCard.Content>
              <VoxCard.Chip event>{data.category.name}</VoxCard.Chip>
              <VoxCard.Title>{data.name}</VoxCard.Title>
              {!isShortEvent && (
                <VoxCard.Description full markdown>
                  {data.description}
                </VoxCard.Description>
              )}
              {media.lg && AsideCardContent}
            </VoxCard.Content>
          </VoxCard>
        </ScrollView>
        {media.lg && (
          <Stack
            position="absolute"
            bottom="$3"
            $sm={{ left: '$3', right: '$3' }}
            $lg={{ left: '$10', right: '$10' }}
            bg="$white1"
            shadowColor="$shadow"
            shadowOffset={{ height: 0, width: 0 }}
            shadowOpacity={0.1}
            shadowRadius={4}
          >
            <MemoizedSubscribeButton key="EventSubsBtn" eventId={data.uuid} isSubscribed={!!data.user_registered_at} />
          </Stack>
        )}
      </PageLayout.MainSingleColumn>
      <PageLayout.SideBarRight>
        <VoxCard>
          <VoxCard.Content>
            <MemoizedSubscribeButton key="EventSubsBtn" eventId={data.uuid} isSubscribed={!!data.user_registered_at} />
            {AsideCardContent}
          </VoxCard.Content>
        </VoxCard>
      </PageLayout.SideBarRight>
    </>
  )
}

type SubscribeButtonProps = {
  eventId: string
  isSubscribed: boolean
}

function SubscribeButton({ eventId, isSubscribed }: SubscribeButtonProps) {
  const { mutate: subscribe } = useSubscribeEvent(eventId)
  const { mutate: unsubscribe } = useUnsubscribeEvent(eventId)
  const handleSubscribe = useDebouncedCallback(() => (isSubscribed ? unsubscribe() : subscribe()), 200)
  return (
    <Button variant={isSubscribed ? 'outlined' : 'contained'} onPress={handleSubscribe} size="lg" width="100%">
      <Button.Text color={isSubscribed ? '$blue7' : '$white1'}>{isSubscribed ? 'Me desinscrire' : "M'inscrire"}</Button.Text>
    </Button>
  )
}

export default HomeScreen
