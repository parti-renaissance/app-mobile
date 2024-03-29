import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { UnauthenticatedRootNavigatorScreenProps } from '../unauthenticatedRoot/UnauthenticatedRootNavigatorScreenProps'
import { ForgottenPasswordModalNavigatorParamList } from './ForgottenPasswordModalNavigatorParamList'

export type ForgottenPasswordModalNavigatorScreenProps<
  T extends keyof ForgottenPasswordModalNavigatorParamList,
> = CompositeScreenProps<
  StackScreenProps<ForgottenPasswordModalNavigatorParamList, T>,
  UnauthenticatedRootNavigatorScreenProps
>
