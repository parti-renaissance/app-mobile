import { StackScreenProps } from '@react-navigation/stack'
import { CompositeScreenProps } from '@react-navigation/native'
import { ForgottenPasswordModalNavigatorParamList } from './ForgottenPasswordModalNavigatorParamList'
import { UnauthenticatedRootNavigatorScreenProps } from '../unauthenticatedRoot/UnauthenticatedRootNavigatorScreenProps'

export type ForgottenPasswordModalNavigatorScreenProps<
  T extends keyof ForgottenPasswordModalNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<ForgottenPasswordModalNavigatorParamList, T>,
  UnauthenticatedRootNavigatorScreenProps
>
