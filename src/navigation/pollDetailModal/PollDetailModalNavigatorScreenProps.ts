import { StackScreenProps } from '@react-navigation/stack'
import { AuthenticatedRootNavigatorScreenProps } from '../authenticatedRoot/AuthenticatedRootNavigatorScreenProps'
import { CompositeScreenProps } from '@react-navigation/native'
import { PollDetailModalNavigatorParamList } from './PollDetailModalNavigatorParamList'

export type PollDetailModalNavigatorScreenProps<
  T extends keyof PollDetailModalNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<PollDetailModalNavigatorParamList, T>,
  AuthenticatedRootNavigatorScreenProps
>
