import { StackScreenProps } from '@react-navigation/stack'
import { AuthenticatedRootNavigatorScreenProps } from '../authenticatedRoot/AuthenticatedRootNavigatorScreenProps'
import { CompositeScreenProps } from '@react-navigation/native'
import { NewsDetailModalNavigatorParamList } from './NewsDetailModalNavigatorParamList'

export type NewsDetailModalNavigatorScreenProps<
  T extends keyof NewsDetailModalNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<NewsDetailModalNavigatorParamList, T>,
  AuthenticatedRootNavigatorScreenProps
>
