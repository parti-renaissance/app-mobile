import {
  NavigatorScreenParams,
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import * as _Screen from './screen'
import { NotificationCategory } from '../core/entities/Notification'

export const Screen = _Screen

//----------- Param List -----------//

export type HomeParamList = {
  Home: undefined
  Region: { zipCode: string }
  News: undefined
  EventDetails: { eventId: string }
}

export type ProfileParamList = {
  Profile: undefined
  ProfileLogin: undefined
  ProfileZipCode: { zipCode: string }
  ProfileTermsOfUse: undefined
  ProfileDataProtection: undefined
  PersonalInformation: undefined
  CenterOfInterest: undefined
  NotificationMenu: undefined
  Notifications: { category: NotificationCategory }
}

export type EventParamList = {
  Events: undefined
  EventDetails: { eventId: string }
}

export type AuthenticatedHomeParamList = {
  HomeNavigator: NavigatorScreenParams<HomeParamList>
  Polls: undefined
  Tools: undefined
  EventNavigator: NavigatorScreenParams<EventParamList>
}

export type PollDetailModalParamList = {
  PollDetail: { pollId: number }
  PollDetailSuccess: { pollId: number; title: string }
}

export type RootStackParamList = {
  AuthenticatedHome: NavigatorScreenParams<AuthenticatedHomeParamList>
  PollDetailModal: NavigatorScreenParams<PollDetailModalParamList>
  ProfileModal: undefined
  Login: NavigatorScreenParams<ProfileParamList>
  TermsOfUse: undefined
  News: undefined
}

export type UnauthenticatedStackParamList = {
  UnauthenticatedHome: undefined
  Login: undefined
  AnonymousLoginZipCode: undefined
  ZipCodeConfirmation: { zipCode: string }
  DataCollect: undefined
  TermsOfUse: undefined
}

//----------- Screen Props -----------//

// Polls
export type PollsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthenticatedHomeParamList, typeof Screen.polls>,
  StackNavigationProp<RootStackParamList>
>
export type PollsScreenProps = Readonly<{
  navigation: PollsScreenNavigationProp
}>

// Home
export type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeParamList>,
  CompositeNavigationProp<
    BottomTabNavigationProp<
      AuthenticatedHomeParamList,
      typeof Screen.homeNavigator
    >,
    StackNavigationProp<RootStackParamList>
  >
>
export type HomeScreenProps = Readonly<{
  navigation: HomeScreenNavigationProp
}>

// PollDetailModal
export type PollDetailModalNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PollDetailModalParamList>,
  StackNavigationProp<RootStackParamList>
>
export type PollDetailModalRouteProp = RouteProp<
  RootStackParamList,
  typeof Screen.pollDetailModal
>
export type PollDetailModalProps = Readonly<{
  route: PollDetailModalRouteProp
  navigation: PollDetailModalNavigationProp
}>

// ProfileModal
export type ProfileModalNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProfileParamList>,
  StackNavigationProp<RootStackParamList>
>
export type ProfileModalRouteProp = RouteProp<
  RootStackParamList,
  typeof Screen.profileModal
>
export type ProfileModalProps = Readonly<{
  route: ProfileModalRouteProp
  navigation: ProfileModalNavigationProp
}>

// PollDetail
export type PollDetailScreenProps = StackScreenProps<
  PollDetailModalParamList,
  typeof Screen.pollDetail
>

// PollDetailSuccess
export type PollDetailSuccessScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PollDetailModalParamList>,
  PollsScreenNavigationProp
>
export type PollDetailSuccessScreenRouteProp = RouteProp<
  PollDetailModalParamList,
  typeof Screen.pollDetailSuccess
>
export type PollDetailSuccessScreenProps = Readonly<{
  route: PollDetailSuccessScreenRouteProp
  navigation: PollDetailSuccessScreenNavigationProp
}>

// Unauthenticated
export type UnauthenticatedHomeScreenNavigationProp = StackNavigationProp<
  UnauthenticatedStackParamList,
  typeof Screen.unauthenticatedHome
>
export type UnauthenticatedHomeScreenProps = Readonly<{
  navigation: UnauthenticatedHomeScreenNavigationProp
}>

// Login
export type LoginScreenNavigationProp = StackNavigationProp<
  UnauthenticatedStackParamList,
  typeof Screen.login
>
export type LoginScreenProps = Readonly<{
  navigation: LoginScreenNavigationProp
}>

// AnonymousLoginZipCode
export type AnonymousLoginZipCodeScreenNavigationProp = StackNavigationProp<
  UnauthenticatedStackParamList,
  typeof Screen.anonymousLoginZipCode
>
export type AnonymousLoginZipCodeScreenProps = Readonly<{
  navigation: AnonymousLoginZipCodeScreenNavigationProp
}>

// ZipCodeConfirmation
export type ZipCodeConfirmationScreenProps = StackScreenProps<
  UnauthenticatedStackParamList,
  typeof Screen.zipCodeConfirmation
>

// TermsOfUse
export type TermsOfUseScreenProps = StackScreenProps<
  UnauthenticatedStackParamList,
  typeof Screen.termsOfUse
>

// DataCollect
export type DataCollectScreenProps = StackScreenProps<
  UnauthenticatedStackParamList,
  typeof Screen.dataCollect
>

// Profile
export type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileParamList,
  typeof Screen.profile
>
export type ProfileScreenProps = Readonly<{
  navigation: ProfileScreenNavigationProp
}>

// ProfileZipCode
export type ProfileZipCodeScreenProps = StackScreenProps<
  ProfileParamList,
  typeof Screen.profileZipCode
>

// ProfileLogin
export type ProfileLoginScreenNavigationProp = StackNavigationProp<
  ProfileParamList,
  typeof Screen.profileLogin
>
export type ProfileLoginScreenProps = Readonly<{
  navigation: ProfileLoginScreenNavigationProp
}>

// Region
export type RegionScreenProps = StackScreenProps<
  HomeParamList,
  typeof Screen.region
>

// PersonalInformation
export type PersonalInformationScreenProps = StackScreenProps<
  ProfileParamList,
  typeof Screen.personalInformation
>

// Event
export type EventScreenNavigationProp = StackNavigationProp<
  EventParamList,
  typeof Screen.events
>
export type EventScreenProps = Readonly<{
  navigation: EventScreenNavigationProp
}>

export type EventDetailsScreenProps = StackScreenProps<
  EventParamList,
  typeof Screen.eventDetails
>

// Centers of interests
export type CentersOfInterestScreenProps = StackScreenProps<
  ProfileParamList,
  typeof Screen.centerOfInterest
>

// Notifications Menu
export type NotificationMenuScreenProps = StackScreenProps<
  ProfileParamList,
  typeof Screen.notificationMenu
>

// Notifications
export type NotificationsScreenProps = StackScreenProps<
  ProfileParamList,
  typeof Screen.notifications
>
