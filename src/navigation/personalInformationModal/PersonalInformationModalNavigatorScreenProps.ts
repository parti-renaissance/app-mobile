import { StackScreenProps } from '@react-navigation/stack'
import { CompositeScreenProps } from '@react-navigation/native'
import { AuthenticatedRootNavigatorScreenProps } from '../authenticatedRoot/AuthenticatedRootNavigatorScreenProps'
import { PersonalInformationModalNavigatorParamList } from './PersonalInformationModalNavigatorParamList'

export type PersonalInformationModalNavigatorScreenProps<
  T extends keyof PersonalInformationModalNavigatorParamList
> = CompositeScreenProps<
  StackScreenProps<PersonalInformationModalNavigatorParamList, T>,
  AuthenticatedRootNavigatorScreenProps
>
