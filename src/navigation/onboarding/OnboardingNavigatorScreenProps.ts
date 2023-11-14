import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { UnauthenticatedRootNavigatorScreenProps } from '../unauthenticatedRoot/UnauthenticatedRootNavigatorScreenProps'
import { OnboardingNavigatorParamList } from './OnboardingNavigatorParamList'

export type OnboardingNavigatorScreenProps<
  T extends keyof OnboardingNavigatorParamList,
> = CompositeScreenProps<
  StackScreenProps<OnboardingNavigatorParamList, T>,
  UnauthenticatedRootNavigatorScreenProps
>
