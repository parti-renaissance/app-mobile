import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { TabBarNavigatorScreenProps } from '../tabBar/TabBarNavigatorScreenProps'
import { EventNavigatorParamList } from './EventNavigatorParamList'

export type EventNavigatorScreenProps<T extends keyof EventNavigatorParamList> =
  CompositeScreenProps<
    StackScreenProps<EventNavigatorParamList, T>,
    TabBarNavigatorScreenProps
  >
