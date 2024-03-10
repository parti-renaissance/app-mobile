import { props as actionProps } from '@/components/Cards/ActionCard/ActionCard.stories'
import { props as eventProps } from '@/components/Cards/EventCard/EventCard.stories'
import { props as newsProps } from '@/components/Cards/NewsCard/NewsCard.stories'
import FeedCard from './FeedCard'

export default {
  title: 'FeedCard',
  component: FeedCard,
}

export const FeedAction = {
  args: {
    ...actionProps,
    type: 'action',
  },
}

export const FeedEvent = {
  args: {
    ...eventProps,
    type: 'event',
  },
}

export const FeedNews = {
  args: {
    ...newsProps,
    type: 'news',
  },
}
