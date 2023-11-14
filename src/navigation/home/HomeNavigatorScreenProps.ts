import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { TabBarNavigatorScreenProps } from '../tabBar/TabBarNavigatorScreenProps'
import { HomeNavigatorParamList } from './HomeNavigatorParamList'

export type HomeNavigatorScreenProps<T extends keyof HomeNavigatorParamList> =
  CompositeScreenProps<
    StackScreenProps<HomeNavigatorParamList, T>,
    TabBarNavigatorScreenProps
  >
