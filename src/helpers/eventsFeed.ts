import { EventVoxCardProps, type FeedCardProps } from '@/components/Cards'
import { VoxCardAuthorProps, VoxCardDateProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { RestDetailedEvent, RestShortEvent } from '@/data/restObjects/RestEvents'

export const mapPropsLocation = (item: RestShortEvent | RestDetailedEvent): VoxCardLocationProps => {
  return {
    location: {
      street: item.post_address.address,
      city: item.post_address.city_name,
      postalCode: item.post_address.postal_code,
    },
  }
}

export const mapPropsAuthor = (item: RestShortEvent | RestDetailedEvent): VoxCardAuthorProps => {
  return {
    author: {
      role: 'Role data missing',
      name: `${item.organizer.first_name} ${item.organizer.last_name}`,
      title: 'title data missing',
      pictureLink: 'https://picsum.photos/200/200',
    },
  }
}

export const mapPropsDate = (item: RestShortEvent | RestDetailedEvent): VoxCardDateProps => {
  return {
    start: new Date(item.begin_at),
    end: new Date(item.finish_at),
  }
}

export const mapProps = (
  item: RestShortEvent | RestDetailedEvent,
  cb: {
    onSubscribe: (id: string) => void
    onShow: (id: string) => void
  },
): EventVoxCardProps => {
  return {
    payload: {
      title: item.name,
      tag: item.category.name,
      image: item.image_url,
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
