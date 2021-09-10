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
  Phoning: undefined
}

export type PollDetailModalParamList = {
  PollDetail: { pollId: number }
  PollDetailSuccess: { pollId: number; title: string }
}

export type PhonePollDetailModalParamList = {
  PhonePollDetail: { campaignId: string }
  PhonePollDetailSuccess: { title: string }
}

export type RootStackParamList = {
  AuthenticatedHome: NavigatorScreenParams<AuthenticatedHomeParamList>
  PollDetailModal: NavigatorScreenParams<PollDetailModalParamList>
  PhonePollDetailModal: NavigatorScreenParams<PhonePollDetailModalParamList>
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

// Phoning
export type PhoningScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthenticatedHomeParamList, typeof Screen.phoning>,
  StackNavigationProp<RootStackParamList>
>
export type PhoningScreenProp = Readonly<{
  navigation: PhoningScreenNavigationProp
}>

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

// PhonePollDetail
export type PhonePollDetailScreenProps = StackScreenProps<
  PhonePollDetailModalParamList,
  typeof Screen.phonePollDetail
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

// PhonePollDetailSuccess
export type PhonePollDetailSuccessScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PhonePollDetailModalParamList>,
  PhoningScreenNavigationProp
>
export type PhonePollDetailSuccessScreenRouteProp = RouteProp<
  PollDetailModalParamList,
  typeof Screen.pollDetailSuccess
>
export type PhonePollDetailSuccessScreenProps = Readonly<{
  route: PollDetailSuccessScreenRouteProp
  navigation: PollDetailSuccessScreenNavigationProp
}>

// Unauthenticated
export type UnauthenticatedHomeScreenProps = StackScreenProps<
  UnauthenticatedStackParamList,
  typeof Screen.unauthenticatedHome
>

// Login
export type LoginScreenProps = StackScreenProps<
  UnauthenticatedStackParamList,
  typeof Screen.login
>

// AnonymousLoginZipCode
export type AnonymousLoginZipCodeScreenProps = StackScreenProps<
  UnauthenticatedStackParamList,
  typeof Screen.anonymousLoginZipCode
>

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
export type ProfileScreenProps = StackScreenProps<
  ProfileParamList,
  typeof Screen.profile
>

// ProfileZipCode
export type ProfileZipCodeScreenProps = StackScreenProps<
  ProfileParamList,
  typeof Screen.profileZipCode
>

// ProfileLogin
export type ProfileLoginScreenProps = StackScreenProps<
  ProfileParamList,
  typeof Screen.profileLogin
>

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
export type EventScreenProps = StackScreenProps<
  EventParamList,
  typeof Screen.events
>

// Event Detail
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
