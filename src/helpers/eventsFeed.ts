import { EventVoxCardProps, PartialEventVoxCardProps } from '@/components/Cards'
import { VoxCardAuthorProps, VoxCardDateProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { isFullEvent, RestEvent, RestFullEvent, RestPartialEvent } from '@/services/events/schema'

export const mapPropsLocation = (item: RestEvent): VoxCardLocationProps => {
  return {
    location:
      isFullEvent(item) && item.post_address
        ? {
            street: item.post_address.address,
            city: item.post_address.city_name,
            postalCode: item.post_address.postal_code,
          }
        : undefined,
  }
}

export const mapPropsAuthor = (item: RestEvent): Partial<VoxCardAuthorProps> => {
  return {
    author: item.organizer
      ? {
          role: item.organizer.role,
          name: `${item.organizer.first_name} ${item.organizer.last_name}`,
          title: item.organizer.instance,
          pictureLink: undefined,
        }
      : undefined,
  }
}

export const mapPropsDate = (item: RestEvent): VoxCardDateProps => {
  return {
    start: new Date(item.begin_at),
    end: new Date(item.finish_at),
    timeZone: item.time_zone,
  }
}

export const mapFullProps = (
  item: RestFullEvent,
  cb: {
    onShow: (id: string) => void
  },
): EventVoxCardProps => {
  return {
    payload: {
      id: item.uuid,
      title: item.name,
      tag: item.category?.name ?? '',
      image: item.image_url ?? undefined,
      isSubscribed: !!item.user_registered_at,
      isCompleted: Boolean(item.capacity && item.participants_count >= item.capacity),
      isOnline: item.mode === 'online',
      ...mapPropsLocation(item),
      date: mapPropsDate(item),
      ...mapPropsAuthor(item),
    },
    onShow: () => cb.onShow(item.uuid),
  }
}

export const mapPartialProps = (
  item: RestPartialEvent,
  cb: {
    onShow: (id: string) => void
  },
): PartialEventVoxCardProps => {
  return {
    payload: {
      id: item.uuid,
      title: item.name,
      image: item.image_url ?? undefined,

      isOnline: item.mode === 'online',
      ...mapPropsAuthor(item),
      date: mapPropsDate(item),
    },
    onShow: () => cb.onShow(item.uuid),
  }
}
