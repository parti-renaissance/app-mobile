import { EventVoxCardProps, PartialEventVoxCardProps } from '@/components/Cards'
import { VoxCardAuthorProps, VoxCardDateProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { RestDetailedEvent, RestFullShortEvent, RestPartialShortEvent, RestShortEvent } from '@/data/restObjects/RestEvents'

export const mapPropsLocation = (item: RestShortEvent | RestDetailedEvent): VoxCardLocationProps => {
  return {
    location: item.post_address
      ? {
          street: item.post_address.address,
          city: item.post_address.city_name,
          postalCode: item.post_address.postal_code,
        }
      : undefined,
  }
}

export const mapPropsAuthor = (item: RestShortEvent | RestDetailedEvent): Partial<VoxCardAuthorProps> => {
  return {
    author: item.organizer
      ? {
          role: 'Role data missing',
          name: `${item.organizer.first_name} ${item.organizer.last_name}`,
          title: 'title data missing',
          pictureLink: undefined,
        }
      : undefined,
  }
}

export const mapPropsDate = (item: RestShortEvent | RestDetailedEvent): VoxCardDateProps => {
  return {
    start: new Date(item.begin_at),
    end: new Date(item.finish_at),
    timeZone: item.time_zone,
  }
}

export const mapFullProps = (
  item: RestFullShortEvent,
  cb: {
    onSubscribe: (id: string) => void
    onShow: (id: string) => void
  },
): EventVoxCardProps => {
  return {
    payload: {
      id: item.uuid,
      title: item.name,
      tag: item.category.name,
      image: item.image_url ?? undefined,
      isSubscribed: !!item.user_registered_at,
      isOnline: item.mode === 'online',
      ...mapPropsLocation(item),
      date: mapPropsDate(item),
      ...mapPropsAuthor(item),
    },
    onSubscribe: () => cb.onSubscribe(item.uuid),
    onShow: () => cb.onShow(item.uuid),
  }
}

export const mapPartialProps = (
  item: RestPartialShortEvent,
  cb: {
    onSubscribe: (id: string) => void
    onShow: (id: string) => void
  },
): PartialEventVoxCardProps => {
  return {
    payload: {
      id: item.uuid,
      title: item.name,
      image: item.image_url ?? require('@/assets/images/eventRestrictedImagePlaceholder.png'),
      isOnline: item.mode === 'online',
      date: mapPropsDate(item),
    },
    onSubscribe: () => cb.onSubscribe(item.uuid),
    onShow: () => cb.onShow(item.uuid),
  }
}
