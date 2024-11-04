import VoxCard from '@/components/VoxCard/VoxCard'
import { RestItemEvent } from '@/services/events/schema'
import { XStack } from 'tamagui'
import { isEventFull } from '../utils'

export const EventLocation = ({ event }: { event: Partial<RestItemEvent> }) => {
  if (event.mode === 'online') {
    return (
      <XStack testID="event-location-visio">
        <VoxCard.Visio />
      </XStack>
    )
  }

  if (isEventFull(event) && event.post_address) {
    return (
      <XStack testID="event-location-location">
        <VoxCard.Location
          location={{
            city: event.post_address.city_name,
            postalCode: event.post_address.postal_code,
            street: event.post_address.address,
          }}
        />
      </XStack>
    )
  }

  return null
}
