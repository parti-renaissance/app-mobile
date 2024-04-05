import React from 'react'
import { Platform } from 'react-native'
import { Button } from '@/components'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import { SubscribeEventButton } from '@/components/Cards'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import VoxCard from '@/components/VoxCard/VoxCard'
import { mapPropsAuthor, mapPropsDate, mapPropsLocation } from '@/helpers/eventsFeed'
import { useGetEvent, useIsShortEvent } from '@/hooks/useEvents'
import useShareApi from '@/hooks/useShareApi'
import * as Calendar from '@/modules/Calendar/Calendar'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { Link as LinkIcon } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import * as Clipboard from 'expo-clipboard'
import { Stack as RouterStack, useLocalSearchParams, usePathname } from 'expo-router'
import { ScrollView, Stack, Text, useMedia } from 'tamagui'

const padding = '$7'

const HomeScreen: React.FC = () => {
  const params = useLocalSearchParams<{ id: string }>()
  return (
    <PageLayout>
      <PageLayout.SideBarLeft />
      <BoundarySuspenseWrapper loadingMessage="Nous chargeons votre fil">
        <EventDetailScreen id={params.id} />
      </BoundarySuspenseWrapper>
    </PageLayout>
  )
}

function EventDetailScreen(props: Readonly<{ id: string }>) {
  const { data } = useGetEvent({ id: props.id })
  const isShortEvent = useIsShortEvent(data)
  const toast = useToastController()
  const location = mapPropsLocation(data)
  const author = mapPropsAuthor(data)
  const date = mapPropsDate(data)
  const media = useMedia()
  const pathname = usePathname()

  const shareUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}${pathname}`

  const { shareAsync, isShareAvailable } = useShareApi()

  const handleCopyUrl = () => {
    Clipboard.setStringAsync(shareUrl)
      .then(() => {
        toast.show('Lien copié', { type: 'info' })
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
          message: (!isShortEvent ? `${data.description}\n\n${shareUrl}` : undefined) ?? shareUrl,
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
    location: data.mode === 'online' ? 'En ligne' : `${data.post_address.address}, ${data.post_address.city_name} ${data.post_address.postal_code}`,
    notes: isShortEvent ? '' : data.description + data.visio_url ? `\n\nLien: ${data.visio_url}` : '',
    url: shareUrl,
  }

  const addToCalendar = Calendar.useCreateEvent(eventData)

  const AsideCardContent = (
    <>
      <VoxCard.Date {...date} />
      {data.mode === 'online' ? <VoxCard.Visio /> : <VoxCard.Location {...location} />}
      {!isShortEvent && data.capacity && <VoxCard.Capacity>Capacité {data.capacity} personnes</VoxCard.Capacity>}
      {!isShortEvent && <VoxCard.Attendees attendees={{ count: data.participants_count }} />}

      <Text fontFamily="$PublicSans" textAlign="center" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$yellow9">
        Cet événement est réservé aux adhérents à jour de cotisation.
      </Text>

      <VoxCard.Section title="Événement créé par :">
        <VoxCard.Author {...author} />
      </VoxCard.Section>

      <VoxCard.Section title="Partager :" gap="$3">
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

        {!isShortEvent && (
          <Button variant="outlined" width="100%" size="lg" onPress={addToCalendar}>
            <Button.Text variant="outlined">Ajouter à mon calendrier</Button.Text>
          </Button>
        )}
      </VoxCard.Section>
    </>
  )

  return (
    <>
      <RouterStack.Screen
        options={{
          title: data.name,
        }}
      />
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
            {data.image_url && <VoxCard.Image large image={data.image_url} /> }
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
          <Stack position="absolute" bottom="$3" $sm={{ left: '$4', right: '$4' }} $lg={{ left: '$10', right: '$10' }}>
            <SubscribeEventButton key="EventSubsBtn" outside eventId={data.uuid} isSubscribed={!!data.user_registered_at} />
          </Stack>
        )}
      </PageLayout.MainSingleColumn>
      <PageLayout.SideBarRight>
        <VoxCard>
          <VoxCard.Content>
            <SubscribeEventButton key="EventSubsBtn" outside eventId={data.uuid} isSubscribed={!!data.user_registered_at} />
            <VoxCard.Separator />
            {AsideCardContent}
          </VoxCard.Content>
        </VoxCard>
      </PageLayout.SideBarRight>
    </>
  )
}

export default HomeScreen
