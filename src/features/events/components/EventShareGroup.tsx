import React, { memo, useMemo } from 'react'
import { Platform } from 'react-native'
import Text from '@/components/base/Text'
import Button, { VoxButton } from '@/components/Button'
import { getFormatedVoxCardDate } from '@/components/utils'
import VoxCard from '@/components/VoxCard/VoxCard'
import clientEnv from '@/config/clientEnv'
import useShareApi from '@/hooks/useShareApi'
import useCreateEvent from '@/modules/Calendar/Calendar'
import * as eventTypes from '@/services/events/schema'
import { RestEvent } from '@/services/events/schema'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { CalendarPlus, Copy, Link as LinkIcon, Share2 } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { XStack } from 'tamagui'
import { isEventFull, useHandleCopyUrl } from '../utils'

type Props = {
  event: Partial<RestEvent> & Pick<RestEvent, 'uuid'>
}

export function EventShareGroup({ event }: Props) {
  const isFullEvent = isEventFull(event)
  const handleCopyUrl = useHandleCopyUrl()
  const toast = useToastController()

  const shareUrl = `https://${clientEnv.ASSOCIATED_DOMAIN}/evenements/${event.uuid}`

  const { shareAsync, isShareAvailable } = useShareApi()

  const handleShareUrl = () => {
    if (!event.name || !isShareAvailable) {
      return
    }
    const date = () => {
      const start = event.begin_at ? new Date(event.begin_at) : null
      const endDate = event.finish_at ?? event.begin_at
      const end = endDate ? new Date(endDate) : undefined
      const formatedDateObj = start ? getFormatedVoxCardDate({ start, end, timeZone: event.time_zone }) : undefined
      const timezone = formatedDateObj?.timezone ? ` ${formatedDateObj?.timezone}` : ''

      return formatedDateObj ? formatedDateObj.date + timezone : ''
    }
    const name = event.name.toUpperCase()
    shareAsync(
      Platform.select({
        android: {
          message: `${name}\n${date()}\n\n${shareUrl}`,
          url: shareUrl,
        },
        ios: {
          message: `${name}\n${date()}`,
          url: shareUrl,
        },
        default: {
          title: `${name}\n${date()}\n`,
          url: shareUrl,
        },
      }),
    ).catch((e) => {
      ErrorMonitor.log(e.message, { e })
      toast.show('Erreur lors du partage du lien', { type: 'error' })
    })
  }

  const createEventData = (event: eventTypes.RestFullEvent) => {
    return {
      title: event.name,
      startDate: new Date(event.begin_at).toISOString(),
      endDate: new Date(event.finish_at).toISOString(),
      location:
        event.mode !== 'online' && event.post_address
          ? `${event.post_address.address}, ${event.post_address.city_name} ${event.post_address.postal_code}`
          : 'En ligne',
      notes: event.visio_url ? `${event.description}\n\nLien: ${event.visio_url}` : event.description,
      url: shareUrl,
      timeZone: event.time_zone,
    }
  }

  const addToCalendar = useCreateEvent()
  return (
    <VoxCard.Section title="Partagez cet événement avec vos contacts pour maximiser sa portée.">
      <Button variant="outlined" size="xl" theme="gray" width="100%" onPress={() => handleCopyUrl(shareUrl)} justifyContent="space-between">
        <XStack flex={1}>
          <Text.MD secondary numberOfLines={1} flex={1}>
            {shareUrl}
          </Text.MD>
        </XStack>
        <XStack flex={1} justifyContent="flex-end">
          <Copy color="$textSecondary" size={24} />
        </XStack>
      </Button>

      {isShareAvailable && (
        <VoxButton variant="outlined" full size="xl" iconLeft={Share2} onPress={handleShareUrl}>
          Partager
        </VoxButton>
      )}

      {isFullEvent && (
        <>
          <VoxButton variant="outlined" full size="xl" iconLeft={CalendarPlus} onPress={() => addToCalendar(createEventData(event))}>
            Ajouter à mon calendrier
          </VoxButton>
        </>
      )}
    </VoxCard.Section>
  )
}
