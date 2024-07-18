import React, { memo } from 'react'
import { Keyboard, Platform } from 'react-native'
import { Button } from '@/components'
import Text from '@/components/base/Text'
import { SignInButton, SignUpButton } from '@/components/Buttons/AuthButton'
import EventRegisterForm from '@/components/EventRegisterForm/EventRegisterForm'
import InternAlert from '@/components/InternAlert/InternAlert'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import VoxCard from '@/components/VoxCard/VoxCard'
import clientEnv from '@/config/clientEnv'
import { mapPropsAuthor, mapPropsDate, mapPropsLocation } from '@/helpers/eventsFeed'
import useShareApi from '@/hooks/useShareApi'
import useCreateEvent from '@/modules/Calendar/Calendar'
import * as eventTypes from '@/services/events/schema'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { Link as LinkIcon, Unlock } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { isPast } from 'date-fns'
import { ScrollView, ScrollViewProps, Sheet, useMedia, XStack, YStack } from 'tamagui'
import { useHandleCopyUrl } from './utils'

const padding = '$7'

export function ScrollStack({ children }: ScrollViewProps) {
  const media = useMedia()

  return (
    <PageLayout.MainSingleColumn>
      <ScrollView
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

export function LockLeftCard() {
  return (
    <YStack justifyContent="center" gap="$4.5">
      <YStack gap="$3" alignItems="center">
        <Unlock size="$3" rotate="-15deg" color="$textSecondary" />
        <Text fontWeight="$6" fontSize="$1" color="$textSecondary">
          Connectez-vous pour participer à cet événement
        </Text>
      </YStack>
      <SignUpButton size="lg" width="100%" />
      <SignInButton size="lg" width="100%" />
    </YStack>
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

      {data.visibility === 'adherent_dues' && (
        <Text fontFamily="$PublicSans" textAlign="center" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$yellow9">
          Cet événement est réservé aux adhérents à jour de cotisation.
        </Text>
      )}

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

      {isFullEvent && (
        <>
          <VoxCard.Separator />
          <Button variant="outlined" width="100%" size="lg" onPress={() => addToCalendar(createEventData(data))}>
            <Button.Text variant="outlined">Ajouter à mon calendrier</Button.Text>
          </Button>
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
      <Button
        variant="contained"
        size="lg"
        onPress={() => {
          setOpen(true)
        }}
        width="100%"
      >
        <Button.Text>M'inscrire</Button.Text>
      </Button>
      <Sheet modal dismissOnSnapToBottom dismissOnOverlayPress moveOnKeyboardChange open={open} onOpenChange={handleOpenChange} snapPoints={[80]}>
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" elevation="$1">
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

export function EventStatus({ data: { finish_at, status } }: { data: eventTypes.RestEvent }) {
  if (isPast(finish_at) && status === 'SCHEDULED') {
    return <InternAlert type="info">Événement passé.</InternAlert>
  }
  if (status === 'CANCELLED') {
    return <InternAlert type="danger">Événement annulé.</InternAlert>
  }
  return null
}
