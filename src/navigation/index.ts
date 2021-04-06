import {
  NavigatorScreenParams,
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import * as _Screen from './screen'

export const Screen = _Screen

//----------- Param List -----------//

export type HomeParamList = {
  Home: undefined
  Region: { zipCode: string }
  News: undefined
}

export type ProfileParamList = {
  Profile: undefined
  ProfileLogin: undefined
  ProfileZipCode: { zipCode: string }
  ProfileTermsOfUse: undefined
  ProfileDataProtection: undefined
  PersonalInformation: undefined
  CenterOfInterest: undefined
}

export type AuthenticatedHomeParamList = {
  HomeNavigator: NavigatorScreenParams<HomeParamList>
  Polls: undefined
  Tools: undefined
  ProfileNavigator: NavigatorScreenParams<ProfileParamList>
}

export type PollDetailModalParamList = {
  PollDetail: { pollId: number }
  PollDetailSuccess: { pollId: number; title: string }
}

export type RootStackParamList = {
  AuthenticatedHome: NavigatorScreenParams<AuthenticatedHomeParamList>
  PollDetailModal: NavigatorScreenParams<PollDetailModalParamList>
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
