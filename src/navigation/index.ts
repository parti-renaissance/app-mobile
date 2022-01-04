import { DoorToDoorAddress } from './../core/entities/DoorToDoor'
import { Retaliation } from './../core/entities/Retaliation'
import {
  NavigatorScreenParams,
  CompositeNavigationProp,
  RouteProp,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import * as _Screen from './screen'
import { NotificationCategory } from '../core/entities/Notification'
import {
  PhoningSessionDevice,
  PhoningSessionNavigationData,
  PhoningSessionNavigationDataRequiredAdherent,
} from '../screens/shared/PhoningSessionNavigationData'
import { PhoningCampaignBriefNavigationData } from '../screens/phoningCampaignBrief/PhoningCampaignBriefNavigationData'
import { PhoningCampaignScoreboardNavigationData } from '../screens/phoningCampaignScoreboard/PhoningCampaignScoreboardNavigationData'
import { PhoningCharterNavigationData } from '../screens/phoningCharter/PhoningCharterNavigationData'
import { BuildingSelectedNavigationParams } from '../screens/doorToDoor/tunnel/BuildingSelectedNavigationParams'

export const Screen = _Screen

//----------- Param List -----------//

export type HomeParamList = {
  Home: undefined
  Region: { zipCode: string }
  News: undefined
  EventDetails: { eventId: string }
  RetaliationDetailScreen: { retaliation: Retaliation }
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

export type PhoningParamList = {
  Phoning: undefined
  PhoningCharter: { data: PhoningCharterNavigationData }
  PhoningTutorial: undefined
  PhoningCampaignBrief: { data: PhoningCampaignBriefNavigationData }
  PhoningCampaignScoreboard: { data: PhoningCampaignScoreboardNavigationData }
}
export type DoorToDoorParamList = {
  BuildingDetail: { address: DoorToDoorAddress }
}

export type AuthenticatedHomeParamList = {
  HomeNavigator: NavigatorScreenParams<HomeParamList>
  Actions: undefined
  Polls: undefined
  Tools: undefined
  EventNavigator: NavigatorScreenParams<EventParamList>
  PhoningNavigator: NavigatorScreenParams<PhoningParamList>
}

export type PollDetailModalParamList = {
  PollDetail: { pollId: number }
  PollDetailSuccess: { pollId: number; title: string }
}

export type PhoningSessionModalParamList = {
  PhoningSessionLoader: {
    campaignId: string
    campaignTitle: string
    device: PhoningSessionDevice
  }
  PhoningSessionLoaderPermanentCampaign: {
    campaignId: string
    campaignTitle: string
  }
  PhoningSessionNumberFound: {
    data: PhoningSessionNavigationDataRequiredAdherent
  }
  PhoningSessionNumberFoundOtherDevice: {
    data: PhoningSessionNavigationDataRequiredAdherent
  }
  PhoningSessionNoNumberAvailable: { message: string }
  PhoneCallStatusPicker: { data: PhoningSessionNavigationDataRequiredAdherent }
  PhoneCallFailure: { data: PhoningSessionNavigationData }
  PhonePollDetail: { data: PhoningSessionNavigationData }
  PhonePollDetailSuccess: { data: PhoningSessionNavigationData; title: string }
}

export type RootStackParamList = {
  AuthenticatedHome: NavigatorScreenParams<AuthenticatedHomeParamList>
  PollDetailModal: NavigatorScreenParams<PollDetailModalParamList>
  PhoningSessionModal: NavigatorScreenParams<PhoningSessionModalParamList>
  ProfileModal: undefined
  Login: NavigatorScreenParams<ProfileParamList>
  TermsOfUse: undefined
  News: undefined
  DoorToDoorTunnelModal: undefined
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

// Retaliation Detail
export type RetaliationDetailScreenProp = StackScreenProps<
  HomeParamList,
  typeof Screen.retaliationDetailScreen
>

// Phoning Tutorial
export type PhoningTutorialScreenProp = StackScreenProps<
  PhoningParamList,
  typeof Screen.phoningTutorial
>

// Phoning
export type PhoningScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PhoningParamList>,
  CompositeNavigationProp<
    BottomTabNavigationProp<
      AuthenticatedHomeParamList,
      typeof Screen.phoningNavigator
    >,
    StackNavigationProp<RootStackParamList>
  >
>
export type PhoningScreenProp = Readonly<{
  navigation: PhoningScreenNavigationProp
}>

// Actions
export type ActionsScreenProp = Readonly<{
  navigation: NavigationProp<ParamListBase>
}>

// Door to Door
export type DoorToDoorScreenProp = Readonly<{
  navigation: NavigationProp<ParamListBase>
}>

// BuildingDetail

export type BuildingDetailScreenRouteProp = RouteProp<
  DoorToDoorParamList,
  typeof Screen.buildingDetail
>

export type BuildingDetailScreenProp = Readonly<{
  route: BuildingDetailScreenRouteProp
  navigation: NavigationProp<ParamListBase>
}>

// DoorToDoorTunnelModal
export type DoorToDoorTunnelModalParamList = {
  TunnelDoorInterlocutorScreen: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorPollScreen: {
    campaignId: string
    interlocutorStatus: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorBriefScreen: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorSelectionScreen: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorOpeningScreen: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorSuccessScreen: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
  }
}

export type DoorToDoorBriefScreenProp = StackScreenProps<
  DoorToDoorTunnelModalParamList,
  typeof Screen.tunnelDoorBrief
>

export type DoorToDoorTunnelStartScreenProp = StackScreenProps<
  DoorToDoorTunnelModalParamList,
  typeof Screen.tunnelDoorSelectionScreen
>

export type DoorToDoorTunnelOpeningScreenProp = StackScreenProps<
  DoorToDoorTunnelModalParamList,
  typeof Screen.tunnelDoorOpening
>

export type DoorToDoorTunnelSuccessScreenProp = StackScreenProps<
  DoorToDoorTunnelModalParamList,
  typeof Screen.tunnelDoorSuccess
>

export type TunnelDoorInterlocutorScreenRouteProp = RouteProp<
  DoorToDoorTunnelModalParamList,
  typeof Screen.tunnelDoorInterlocutor
>
export type TunnelDoorInterlocutorScreenProp = Readonly<{
  route: TunnelDoorInterlocutorScreenRouteProp
  navigation: NavigationProp<ParamListBase>
}>

export type TunnelDoorPollScreenRouteProp = RouteProp<
  DoorToDoorTunnelModalParamList,
  typeof Screen.tunnelDoorPoll
>

export type TunnelDoorPollScreenProp = Readonly<{
  route: TunnelDoorPollScreenRouteProp
  navigation: NavigationProp<ParamListBase>
}>

// Phoning charter
export type PhoningCharterScreenProp = StackScreenProps<
  PhoningParamList,
  typeof Screen.phoningCharter
>

// Phoning Campaign Brief
export type PhoningCampaignBriefScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PhoningParamList>,
  CompositeNavigationProp<
    BottomTabNavigationProp<
      AuthenticatedHomeParamList,
      typeof Screen.phoningNavigator
    >,
    StackNavigationProp<RootStackParamList>
  >
>
export type PhoningCampaignBriefScreenRouteProp = RouteProp<
  PhoningParamList,
  typeof Screen.phoningCampaignBrief
>

export type PhoningCampaignBriefScreenProp = Readonly<{
  route: PhoningCampaignBriefScreenRouteProp
  navigation: PhoningCampaignBriefScreenNavigationProp
}>

// Phoning Campaign Scoreboard
export type PhoningCampaignScoreboardScreenProp = StackScreenProps<
  PhoningParamList,
  typeof Screen.phoningCampaignScoreboard
>

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

// Phoning contact tutorial
export type PhoningSessionLoaderPermanentCampaignScreenProp = StackScreenProps<
  PhoningSessionModalParamList,
  typeof Screen.phoningSessionLoaderPermanentCampaign
>

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
export type PhonePollDetailScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PhoningParamList>,
  StackNavigationProp<PhoningSessionModalParamList>
>
export type PhonePollDetailScreenRouteProp = RouteProp<
  PhoningSessionModalParamList,
  typeof Screen.phonePollDetail
>
export type PhonePollDetailScreenProps = Readonly<{
  route: PhonePollDetailScreenRouteProp
  navigation: PhonePollDetailScreenNavigationProp
}>

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
  StackNavigationProp<PhoningParamList>,
  CompositeNavigationProp<
    StackNavigationProp<PhoningSessionModalParamList>,
    PhoningScreenNavigationProp
  >
>
export type PhonePollDetailSuccessScreenRouteProp = RouteProp<
  PhoningSessionModalParamList,
  typeof Screen.phonePollDetailSuccess
>
export type PhonePollDetailSuccessScreenProps = Readonly<{
  route: PhonePollDetailSuccessScreenRouteProp
  navigation: PhonePollDetailSuccessScreenNavigationProp
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

// Phoning Session Loader
export type PhoningSessionLoaderScreenProps = StackScreenProps<
  PhoningSessionModalParamList,
  typeof Screen.phoningSessionLoader
>

// Phoning Session Number Found
export type PhoningSessionNumberFoundScreenProps = StackScreenProps<
  PhoningSessionModalParamList,
  typeof Screen.phoningSessionNumberFound
>

// Phoning Session Number Found Other Device
export type PhoningSessionNumberFoundOtherDeviceScreenProps = StackScreenProps<
  PhoningSessionModalParamList,
  typeof Screen.phoningSessionNumberFoundOtherDevice
>

// Phone Call Status Picker
export type PhoneCallStatusPickerScreenProps = StackScreenProps<
  PhoningSessionModalParamList,
  typeof Screen.phoneCallStatusPicker
>

// Phone Call Failure
export type PhoneCallFailureScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PhoningParamList>,
  StackNavigationProp<PhoningSessionModalParamList>
>
export type PhoneCallFailureScreenRouteProp = RouteProp<
  PhoningSessionModalParamList,
  typeof Screen.phoneCallFailure
>
export type PhoneCallFailureScreenProps = Readonly<{
  route: PhoneCallFailureScreenRouteProp
  navigation: PhoneCallFailureScreenNavigationProp
}>

// Phoning Session No Number Available
export type PhoningSessionNoNumberAvailableScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PhoningParamList>,
  StackNavigationProp<PhoningSessionModalParamList>
>
export type PhoningSessionNoNumberAvailableScreenRouteProp = RouteProp<
  PhoningSessionModalParamList,
  typeof Screen.phoningSessionNoNumberAvailable
>
export type PhoningSessionNoNumberAvailableScreenProps = Readonly<{
  route: PhoningSessionNoNumberAvailableScreenRouteProp
  navigation: PhoningSessionNoNumberAvailableScreenNavigationProp
}>
