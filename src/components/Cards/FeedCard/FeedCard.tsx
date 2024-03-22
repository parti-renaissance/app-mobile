import { ActionCard, ActionVoxCardProps } from '@/components/Cards/ActionCard'
import { EventCard, EventVoxCardProps } from '@/components/Cards/EventCard'
import { NewsCard, NewsVoxCardProps } from '@/components/Cards/NewsCard'

export type FeedCardProps =
  | ({
      type: 'event'
    } & EventVoxCardProps)
  | ({
      type: 'action'
    } & ActionVoxCardProps)
  | ({
      type: 'news'
    } & NewsVoxCardProps)

const FeedCard = (props: FeedCardProps) => {
  switch (props.type) {
    case 'event':
      return <EventCard {...props} />
    case 'action':
      return <ActionCard {...props} />
    case 'news':
      return <NewsCard {...props} />
    default:
      throw new Error('Invalid card type')
  }
}

export default FeedCard
