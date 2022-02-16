import {
  CompositeNavigationProp,
  RouteProp,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import * as _Screen from './screen'
import { NotificationCategory } from '../core/entities/Notification'
import {
  PhoningSessionDevice,
  PhoningSessionNavigationData,
  PhoningSessionNavigationDataRequiredAdherent,
} from '../screens/shared/PhoningSessionNavigationData'
import { BuildingSelectedNavigationParams } from '../screens/doorToDoor/tunnel/BuildingSelectedNavigationParams'
import { ActionsNavigatorParamList } from './ActionsNavigator'
import { AuthenticatedRootNavigatorParamList } from './AuthenticatedRootNavigator'

export const Screen = _Screen

//----------- Param List -----------//

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

export type NewsDetailModalParamList = {
  NewsDetail: { newsId: string }
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
    canCloseFloor: boolean
  }
  TunnelDoorSelectionScreen: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
    canCloseFloor: boolean
  }
  TunnelDoorOpeningScreen: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorSuccessScreen: {
    campaignId: string
    interlocutorStatus: string
    buildingParams: BuildingSelectedNavigationParams
  }
}

//----------- Screen Props -----------//

// DoorToDoorTunnelModal

export type DoorToDoorTunnelModalNavigationProp = CompositeNavigationProp<
  StackNavigationProp<DoorToDoorTunnelModalParamList>,
  StackNavigationProp<AuthenticatedRootNavigatorParamList>
>
export type DoorToDoorTunnelModalRouteProp = RouteProp<
  AuthenticatedRootNavigatorParamList,
  typeof Screen.doorToDoorTunnelModal
>
export type DoorToDoorTunnelModalProps = Readonly<{
  route: DoorToDoorTunnelModalRouteProp
  navigation: DoorToDoorTunnelModalNavigationProp
}>

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
  navigation: StackNavigationProp<ParamListBase>
}>

// PollDetailModal
export type PollDetailModalNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PollDetailModalParamList>,
  StackNavigationProp<AuthenticatedRootNavigatorParamList>
>
export type PollDetailModalRouteProp = RouteProp<
  AuthenticatedRootNavigatorParamList,
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
  StackNavigationProp<AuthenticatedRootNavigatorParamList>
>
export type ProfileModalRouteProp = RouteProp<
  AuthenticatedRootNavigatorParamList,
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
  StackNavigationProp<ActionsNavigatorParamList>,
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
  StackNavigationProp<AuthenticatedRootNavigatorParamList>
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
  StackNavigationProp<ActionsNavigatorParamList>,
  CompositeNavigationProp<
    StackNavigationProp<PhoningSessionModalParamList>,
    StackNavigationProp<AuthenticatedRootNavigatorParamList>
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

// PersonalInformation
export type PersonalInformationScreenProps = StackScreenProps<
  ProfileParamList,
  typeof Screen.personalInformation
>

// News Detail Modal
export type NewsDetailModalNavigationProp = CompositeNavigationProp<
  StackNavigationProp<NewsDetailModalParamList>,
  StackNavigationProp<AuthenticatedRootNavigatorParamList>
>
export type NewsDetailModalRouteProp = RouteProp<
  AuthenticatedRootNavigatorParamList,
  typeof Screen.newsDetailModal
>
export type NewsDetailModalProps = Readonly<{
  route: NewsDetailModalRouteProp
  navigation: NewsDetailModalNavigationProp
}>

// News Detail
export type NewsDetailScreenProps = StackScreenProps<
  NewsDetailModalParamList,
  typeof Screen.newsDetail
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
  StackNavigationProp<ActionsNavigatorParamList>,
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
  StackNavigationProp<ActionsNavigatorParamList>,
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
