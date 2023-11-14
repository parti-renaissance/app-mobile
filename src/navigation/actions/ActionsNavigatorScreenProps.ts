import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { TabBarNavigatorScreenProps } from '../tabBar/TabBarNavigatorScreenProps'
import { ActionsNavigatorParamList } from './ActionsNavigatorParamList'

export type ActionsNavigatorScreenProps<
  T extends keyof ActionsNavigatorParamList,
> = CompositeScreenProps<
  StackScreenProps<ActionsNavigatorParamList, T>,
  TabBarNavigatorScreenProps
>
