import { EventVoxCardProps, type FeedCardProps } from '@/components/Cards'
import { RestShortEvent } from '@/data/restObjects/RestEvents'

export const mapProps = (item:RestShortEvent, cb: {
    onSubscribe: (id: string) => void
    onShow: (id: string) => void
}): EventVoxCardProps => {
    return {
        payload: {
            title: item.name,
            tag: item.category.name,
            image: item.image_url,
            isSubscribed: (()=> {
                console.warn('Not implemented, isSubscribed event props mapping')
                //@ts-ignore
                return item.is_subscribed || false
            })(),
            isOnline: item.mode === 'online',
            location: {
                street: item.post_address.address,
                city: item.post_address.city,
                postalCode: item.post_address.postal_code,
            
            },
            date: new Date(item.begin_at),
            author: {
                role: 'Role data missing',
                name: `${item.organizer.first_name} ${item.organizer.last_name}`,
                title: 'title data missing',
                pictureLink: 'https://picsum.photos/200/200',
            }

        },
        onSubscribe: () => cb.onSubscribe(item.uuid),
        onShow: () => cb.onShow(item.uuid)
    }
}
