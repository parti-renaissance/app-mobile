import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthenticatedRootNavigatorScreenProps } from '../authenticatedRoot/AuthenticatedRootNavigatorScreenProps'
import { NewsDetailModalNavigatorParamList } from './NewsDetailModalNavigatorParamList'

export type NewsDetailModalNavigatorScreenProps<
  T extends keyof NewsDetailModalNavigatorParamList,
> = CompositeScreenProps<
  StackScreenProps<NewsDetailModalNavigatorParamList, T>,
  AuthenticatedRootNavigatorScreenProps
>
