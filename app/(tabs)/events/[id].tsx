import React from 'react'
import { Button } from '@/components'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import VoxCard from '@/components/VoxCard/VoxCard'
import { mapPropsAuthor, mapPropsDate, mapPropsLocation } from '@/helpers/eventsFeed'
import { useGetEvent, useIsShortEvent, useSubscribeEvent, useUnsubscribeEvent } from '@/hooks/useEvents'
import i18n from '@/utils/i18n'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, Separator, Stack, Text, useMedia, YStack } from 'tamagui'
import { useDebouncedCallback } from 'use-debounce'

const MemoizedSubscribeButton = React.memo(SubscribeButton)

const HomeScreen: React.FC = () => {
  const params = useLocalSearchParams<{ id: string }>()
  return (
    <>
      <YStack flex={1}>
        <PageLayout sidebar={<Text>Test</Text>}>
          <Stack $gtSm={{ flexDirection: 'row', gap: 8 }} flex={1}>
            <BoundarySuspenseWrapper loadingMessage="Nous chargons votre evement">
              <Stack flex={1} $gtSm={{ alignItems: 'center' }} gap={2}>
                <Stack flex={1} $gtSm={{ maxWidth: 1200 }} gap={2}>
                  <EventDetailScreen id={params.id} />
                </Stack>
              </Stack>
            </BoundarySuspenseWrapper>
          </Stack>
        </PageLayout>
      </YStack>
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
    <Stack height="100%" $gtSm={{ gap: '$8', padding: '$8', flexDirection: 'row' }}>
      <>
        <ScrollView flex={1}>
          <VoxCard overflow="hidden" paddingBottom={media.sm ? '$9' : undefined}>
            <VoxCard.Image large image={data.image_url || 'https://picsum.photos/600/400'} />
            <VoxCard.Content>
              <VoxCard.Chip event>{data.category.name}</VoxCard.Chip>
              <VoxCard.Title>{data.name}</VoxCard.Title>
              {!isShortEvent && <VoxCard.Description full>{data.description}</VoxCard.Description>}
              {media.sm && AsideCardContent}
            </VoxCard.Content>
          </VoxCard>
        </ScrollView>
        {media.sm && (
          <Stack position="absolute" bottom="$3" left="$3" right="$3">
            <MemoizedSubscribeButton key="EventSubsBtn" eventId={data.uuid} isSubscribed={!!data.user_registered_at} />
          </Stack>
        )}
      </>
      {media.gtSm && (
        <Stack>
          <VoxCard>
            <VoxCard.Content>
              <MemoizedSubscribeButton key="EventSubsBtn" eventId={data.uuid} isSubscribed={!!data.user_registered_at} />
              {AsideCardContent}
            </VoxCard.Content>
          </VoxCard>
        </Stack>
      )}
    </Stack>
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
      <Button.Text color={isSubscribed ? '$blue7' : '$white1' }>{isSubscribed ? 'Me desinscrire' : "M'inscrire"}</Button.Text>
    </Button>
  )
}

export default HomeScreen
