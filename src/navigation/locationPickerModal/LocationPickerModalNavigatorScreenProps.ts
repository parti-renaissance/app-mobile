import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthenticatedRootNavigatorScreenProps } from '../authenticatedRoot/AuthenticatedRootNavigatorScreenProps'
import { LocationPickerModalNavigatorParamList } from './LocationPickerModalNavigatorParamList'

export type LocationPickerModalNavigatorScreenProps<
  T extends keyof LocationPickerModalNavigatorParamList,
> = CompositeScreenProps<
  StackScreenProps<LocationPickerModalNavigatorParamList, T>,
  AuthenticatedRootNavigatorScreenProps
>
