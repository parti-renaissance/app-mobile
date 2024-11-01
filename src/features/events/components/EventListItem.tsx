import { VoxButton } from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { RestItemEvent } from '@/services/events/schema'
import { Eye } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import { isWeb } from 'tamagui'
import { CategoryChip } from './CategoryChip'
import { EventItemActions } from './EventItemActions'
import { EventItemHandleButton } from './EventItemHandleButton'
import { EventItemHeader } from './EventItemHeader'
import { EventItemToggleSubscribeButton } from './EventItemSubscribeButton'
import { EventPremiumChip } from './EventPremiumChip'
import { StatusChip } from './StatusChip'

type EventListItemProps = {
  event: Partial<RestItemEvent> & { uuid: string }
}

const DateItem = (props: Partial<Pick<RestItemEvent, 'begin_at' | 'finish_at' | 'time_zone'>>) => {
  if (!props.begin_at) {
    return null
  }
  return <VoxCard.Date start={new Date(props.begin_at)} end={props.finish_at ? new Date(props.finish_at) : undefined} timeZone={props.time_zone} />
}

const GoToButton = ({ eventUuid }: { eventUuid: string }) => {
  return (
    <Link href={`/evenements/${eventUuid}`} asChild={!isWeb}>
      <VoxButton variant="outlined" theme="gray" iconLeft={Eye} testID="event-show-button">
        Voir
      </VoxButton>
    </Link>
  )
}

const EventListItem = ({ event, userUuid }: EventListItemProps & { userUuid?: string }) => {
  return (
    <VoxCard>
      <VoxCard.Content>
        <EventItemHeader>
          <CategoryChip>{event.category?.name}</CategoryChip>
          <StatusChip event={event} />
          <EventPremiumChip event={event} />
        </EventItemHeader>
        {event.name ? <VoxCard.Title underline={!event.image_url}>{event.name}</VoxCard.Title> : null}
        {event.image_url ? <VoxCard.Image image={event.image_url} /> : null}
        <DateItem begin_at={event.begin_at} finish_at={event.finish_at} time_zone={event.time_zone} />
        <VoxCard.Author
          author={{
            role: event.organizer?.role,
            name: [event.organizer?.first_name, event.organizer?.last_name].filter(Boolean).join(' '),
            zone: event.organizer?.zone,
            title: event.organizer?.instance,
            pictureLink: event.organizer?.image_url ?? undefined,
          }}
        />
        <EventItemActions>
          <GoToButton eventUuid={event.uuid} />
          <EventItemToggleSubscribeButton event={event} userUuid={userUuid} />
          <EventItemHandleButton event={event} />
        </EventItemActions>
      </VoxCard.Content>
    </VoxCard>
  )
}

export default EventListItem
