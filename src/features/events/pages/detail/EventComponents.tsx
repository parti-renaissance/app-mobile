import React, { memo } from 'react'
import { Keyboard, Platform } from 'react-native'
import { Button } from '@/components'
import { VoxButton } from '@/components/Button'
import InternAlert from '@/components/InternAlert/InternAlert'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import VoxCard from '@/components/VoxCard/VoxCard'
import clientEnv from '@/config/clientEnv'
import EventRegisterForm from '@/features/events/components/EventRegisterForm/EventRegisterForm'
import { mapPropsAuthor, mapPropsDate, mapPropsLocation } from '@/helpers/eventsFeed'
import useShareApi from '@/hooks/useShareApi'
import useCreateEvent from '@/modules/Calendar/Calendar'
import * as eventTypes from '@/services/events/schema'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { CalendarCheck2, CalendarPlus, Link as LinkIcon, Share, Share2 } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { isPast } from 'date-fns'
import { ScrollView, ScrollViewProps, Sheet, useMedia, XStack } from 'tamagui'
import { useHandleCopyUrl } from './utils'

const padding = '$medium'

export function ScrollStack({ children, ...props }: ScrollViewProps) {
  const media = useMedia()

  return (
    <PageLayout.MainSingleColumn>
      <ScrollView
        {...props}
        flex={1}
        contentContainerStyle={{
          pt: media.gtSm ? padding : undefined,
          pl: media.gtSm ? padding : undefined,
          pr: media.gtSm ? padding : undefined,
          pb: '$10',
        }}
      >
        {children}
      </ScrollView>
    </PageLayout.MainSingleColumn>
  )
}

export function AsideCardContent({ data }: Readonly<{ data: eventTypes.RestEvent }>) {
  const isFullEvent = eventTypes.isFullEvent(data)
  const author = mapPropsAuthor(data).author
  const date = mapPropsDate(data)
  return (
    <>
      <VoxCard.Date {...date} />
      {isFullEvent && (data.mode === 'online' ? <VoxCard.Visio /> : <VoxCard.Location {...mapPropsLocation(data)} />)}
      {isFullEvent && !!data.capacity && <VoxCard.Capacity>Capacité {data.capacity} personnes</VoxCard.Capacity>}
      {isFullEvent && <VoxCard.Attendees attendees={{ count: data.participants_count || 0 }} />}

      {isFullEvent && author && (
        <VoxCard.Section title="Événement créé par :">
          <VoxCard.Author author={author} />
        </VoxCard.Section>
      )}
    </>
  )
}

export function AsideShare({ data, id }: Readonly<{ data: eventTypes.RestEvent; id: string }>) {
  const isFullEvent = eventTypes.isFullEvent(data)
  const handleCopyUrl = useHandleCopyUrl()
  const toast = useToastController()

  const shareUrl = `https://${clientEnv.ASSOCIATED_DOMAIN}/evenements/${id}`

  const { shareAsync, isShareAvailable } = useShareApi()

  const handleShareUrl = () => {
    shareAsync(
      Platform.select({
        android: {
          title: data.name,
          message: (isFullEvent ? `${data.description}\n\n${shareUrl}` : undefined) ?? shareUrl,
        },
        ios: {
          message: data.name,
          url: shareUrl,
        },
        default: {
          title: data.name,
          message: isFullEvent ? data.description : data.name,
          url: shareUrl,
        },
      }),
    ).catch((e) => {
      ErrorMonitor.log(e.message, { e })
      toast.show('Erreur lors du partage du lien', { type: 'error' })
    })
  }

  const createEventData = (data: eventTypes.RestFullEvent) => {
    return {
      title: data.name,
      startDate: new Date(data.begin_at).toISOString(),
      endDate: new Date(data.finish_at).toISOString(),
      location:
        data.mode !== 'online' && data.post_address
          ? `${data.post_address.address}, ${data.post_address.city_name} ${data.post_address.postal_code}`
          : 'En ligne',
      notes: data.visio_url ? `${data.description}\n\nLien: ${data.visio_url}` : data.description,
      url: shareUrl,
      timeZone: data.time_zone,
    }
  }

  const addToCalendar = useCreateEvent()
  return (
    <VoxCard.Section title="Partager :" gap="$3">
      <Button variant="outlined" width="100%" onPress={() => handleCopyUrl(shareUrl)}>
        <Button.Text color="$purple6" fontWeight="$4" numberOfLines={1} flex={1}>
          {shareUrl}
        </Button.Text>
        <LinkIcon color="$textDisabled" />
      </Button>

      {isShareAvailable && (
        <VoxButton variant="outlined" full size="lg" iconLeft={Share2} onPress={handleShareUrl}>
          Partager
        </VoxButton>
      )}

      {isFullEvent && (
        <>
          <VoxCard.Separator />
          <VoxButton variant="outlined" full size="lg" iconLeft={CalendarPlus} onPress={() => addToCalendar(createEventData(data))}>
            Ajouter à mon calendrier
          </VoxButton>
        </>
      )}
    </VoxCard.Section>
  )
}

function _RegisterButtonSheet(props: { id: string }) {
  const [open, setOpen] = React.useState(false)
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      Keyboard.dismiss()
    }
    setOpen(nextOpen)
  }

  const scrollRef = React.useRef<ScrollView>(null)

  return (
    <>
      <VoxButton
        variant="contained"
        size="lg"
        onPress={() => {
          setOpen(true)
        }}
        theme="blue"
        iconLeft={CalendarCheck2}
        full
      >
        M'inscrire
      </VoxButton>
      <Sheet modal dismissOnSnapToBottom dismissOnOverlayPress moveOnKeyboardChange open={open} onOpenChange={handleOpenChange} snapPoints={[80]}>
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame padding="$medium" elevation="$1">
          {/* @ts-expect-error ref don't match  */}
          <Sheet.ScrollView ref={scrollRef} contentContainerStyle={{ alignItems: 'center' }}>
            <XStack maxWidth={600} alignItems="center">
              <EventRegisterForm
                eventId={props.id}
                onScrollTo={(a) => {
                  scrollRef.current?.scrollTo({ x: 0, y: a.y - 200 })
                }}
              />
            </XStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}

export const RegisterButtonSheet = memo(_RegisterButtonSheet)

export function EventStatus({ data }: Readonly<{ data: eventTypes.RestEvent }>) {
  if (isPast(data.finish_at) && data.status === 'SCHEDULED') {
    return <InternAlert type="info">Événement passé.</InternAlert>
  }
  if (data.status === 'CANCELLED') {
    return <InternAlert type="danger">Événement annulé.</InternAlert>
  }
  if (eventTypes.isFullEvent(data) && data.capacity && data.participants_count >= data.capacity) {
    return <InternAlert type="info">Événement complet.</InternAlert>
  }
  return null
}
