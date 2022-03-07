import { StackScreenProps } from '@react-navigation/stack'
import { UnauthenticatedRootNavigatorParamList } from './UnauthenticatedRootNavigatorParamList'

export type UnauthenticatedRootNavigatorScreenProps<
  T extends keyof UnauthenticatedRootNavigatorParamList
> = StackScreenProps<UnauthenticatedRootNavigatorParamList, T>
