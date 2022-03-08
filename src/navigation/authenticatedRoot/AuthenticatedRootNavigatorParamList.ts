import { PollDetailModalNavigatorParamList } from '../pollDetailModal/PollDetailModalNavigatorParamList'
import { ProfileModalNavigatorParamList } from '../profileModal/ProfileModalNavigatorParamList'
import { PhoningSessionModalNavigatorParamList } from '../phoningSessionModal/PhoningSessionModalNavigatorParamList'
import { DoorToDoorTunnelModalNavigatorParamList } from '../doorToDoorTunnelModal/DoorToDoorTunnelModalNavigatorParamList'
import { NavigatorScreenParams } from '@react-navigation/native'
import { NewsDetailModalNavigatorParamList } from '../newsDetailModal/NewsDetailModalNavigatorParamList'
import { EventsFilterModalNavigatorParamList } from '../eventsFilterModal/EventsFilterModalNavigatorParamList'
import { TabBarNavigatorParamList } from '../tabBar/TabBarNavigatorParamList'
import { LocationPickerModalNavigatorParamList } from '../locationPickerModal/LocationPickerModalNavigatorParamList'
import { PersonalInformationModalNavigatorParamList } from '../personalInformationModal/PersonalInformationModalNavigatorParamList'

export type AuthenticatedRootNavigatorParamList = {
  TabBarNavigator: NavigatorScreenParams<TabBarNavigatorParamList>
  PollDetailModal: NavigatorScreenParams<PollDetailModalNavigatorParamList>
  PhoningSessionModal: NavigatorScreenParams<PhoningSessionModalNavigatorParamList>
  ProfileModal: NavigatorScreenParams<ProfileModalNavigatorParamList>
  DoorToDoorTunnelModal: NavigatorScreenParams<DoorToDoorTunnelModalNavigatorParamList>
  NewsDetailModal: NavigatorScreenParams<NewsDetailModalNavigatorParamList>
  EventsFilterModal: NavigatorScreenParams<EventsFilterModalNavigatorParamList>
  LocationPickerModal: NavigatorScreenParams<LocationPickerModalNavigatorParamList>
  PersonalInformationModal: NavigatorScreenParams<PersonalInformationModalNavigatorParamList>
}
