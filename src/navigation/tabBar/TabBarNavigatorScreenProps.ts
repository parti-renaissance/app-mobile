import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { AuthenticatedRootNavigatorScreenProps } from '../authenticatedRoot/AuthenticatedRootNavigatorScreenProps'
import { TabBarNavigatorParamList } from './TabBarNavigatorParamList'

export type TabBarNavigatorScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabBarNavigatorParamList>,
  AuthenticatedRootNavigatorScreenProps
>
