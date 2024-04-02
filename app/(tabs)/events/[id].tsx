import React from 'react'
import { Platform } from 'react-native'
import { Button } from '@/components'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import VoxCard from '@/components/VoxCard/VoxCard'
import { BASE_URL } from '@/config/env'
import { mapPropsAuthor, mapPropsDate, mapPropsLocation } from '@/helpers/eventsFeed'
import { useGetEvent, useIsShortEvent, useSubscribeEvent, useUnsubscribeEvent } from '@/hooks/useEvents'
import useShareApi from '@/hooks/useShareApi'
import * as Calendar from '@/modules/Calendar/Calendar'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { Link as LinkIcon } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import * as Clipboard from 'expo-clipboard'
import { useLocalSearchParams, usePathname } from 'expo-router'
import { ScrollView, Stack, Text, useMedia } from 'tamagui'
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
  const { data } = useGetEvent({ id: props.id })
  const isShortEvent = useIsShortEvent(data)
  const toast = useToastController()
  const location = mapPropsLocation(data)
  const author = mapPropsAuthor(data)
  const date = mapPropsDate(data)
  const media = useMedia()
  const pathname = usePathname()

  const shareUrl = `${BASE_URL}${pathname}`

  const { shareAsync, isShareAvailable } = useShareApi()

  const handleCopyUrl = () => {
    Clipboard.setStringAsync(shareUrl)
      .then(() => {
        toast.show('Lien copié dans le presse-papier', { type: 'info' })
      })
      .catch(() => {
        toast.show('Erreur lors de la copie du lien', { type: 'error' })
      })
  }

  const handleShareUrl = () => {
    shareAsync(
      Platform.select({
        android: {
          title: data.name,
          message: !isShortEvent ? `${data.description}\n\n${shareUrl}` : undefined || shareUrl,
        },
        ios: {
          message: data.name,
          url: shareUrl,
        },
        web: {
          title: data.name,
          message: !isShortEvent ? data.description : data.name,
          url: shareUrl,
        },
      }),
    ).catch((e) => {
      ErrorMonitor.log(e.message, { e })
      toast.show('Erreur lors du partage du lien', { type: 'error' })
    })
  }

  const eventData = {
    title: data.name,
    startDate: new Date(data.begin_at).toISOString(),
    endDate: new Date(data.finish_at).toISOString(),
    location: `${data.post_address.address}, ${data.post_address.city_name} ${data.post_address.postal_code}`,
    notes: isShortEvent ? '' : data.description,
    url: shareUrl,
  }

  const addToCalendar = Calendar.useCreateEvent(eventData)

  const AsideCardContent = (
    <>
      <VoxCard.Date {...date} />
      {data.mode === 'online' ? <VoxCard.Visio /> : <VoxCard.Location {...location} />}
      {!isShortEvent && <VoxCard.Capacity>Capacité {data.capacity} personnes</VoxCard.Capacity>}
      {!isShortEvent && <VoxCard.Attendees attendees={{ count: data.participants_count }} />}

      <Text fontFamily="$PublicSans" textAlign="center" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$yellow9">
        Cette évènement est réservée aux adhérents à jour de cotisation.
      </Text>

      <VoxCard.Section title="Évènement créer par:">
        <VoxCard.Author {...author} />
      </VoxCard.Section>

      <VoxCard.Section title="Partager:" gap="$3">
        <Button variant="outlined" width="100%" onPress={handleCopyUrl}>
          <Button.Text variant="outlined" color="$purple6" fontWeight="$4" numberOfLines={1} flex={1}>
            {shareUrl}
          </Button.Text>
          <LinkIcon color="$textDisabled" />
        </Button>

        {isShareAvailable && (
          <Button variant="outlined" width="100%" size="lg" onPress={handleShareUrl}>
            <Button.Text variant="outlined">Partager</Button.Text>
          </Button>
        )}

        <VoxCard.Separator />

        <Button variant="outlined" width="100%" size="lg" onPress={addToCalendar}>
          <Button.Text variant="outlined">Ajouter à mon calendrier</Button.Text>
        </Button>
      </VoxCard.Section>
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
            <VoxCard.Separator />
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
  const { mutate: subscribe } = useSubscribeEvent({ id: eventId })
  const { mutate: unsubscribe } = useUnsubscribeEvent({ id: eventId })
  const handleSubscribe = useDebouncedCallback(() => (isSubscribed ? unsubscribe() : subscribe()), 200)
  return (
    <Button variant={isSubscribed ? 'outlined' : 'contained'} onPress={handleSubscribe} size="lg" width="100%">
      <Button.Text color={isSubscribed ? '$blue7' : '$white1'}>{isSubscribed ? 'Me desinscrire' : "M'inscrire"}</Button.Text>
    </Button>
  )
}

export default HomeScreen
