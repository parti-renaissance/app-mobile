import { StackScreenProps } from '@react-navigation/stack'
import { CompositeScreenProps } from '@react-navigation/native'
import { EventNavigatorParamList } from '../event/EventNavigatorParamList'
import { TabBarNavigatorScreenProps } from '../tabBar/TabBarNavigatorScreenProps'
import { EventsFilterModalNavigatorParamList } from './EventsFilterModalNavigatorParamList'

export type EventsFilterModalNavigatorScreenProps<
  T extends keyof EventsFilterModalNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<EventsFilterModalNavigatorParamList, T>,
  CompositeScreenProps<
    StackScreenProps<EventNavigatorParamList>, // we need to go from modal to Events screen
    TabBarNavigatorScreenProps
  >
>
