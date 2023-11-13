import { NavigatorScreenParams } from "@react-navigation/native";
import { DoorToDoorTunnelModalNavigatorParamList } from "../doorToDoorTunnelModal/DoorToDoorTunnelModalNavigatorParamList";
import { EventsFilterModalNavigatorParamList } from "../eventsFilterModal/EventsFilterModalNavigatorParamList";
import { ListPickerModalNavigatorParamList } from "../listPickerModal/ListPickerModalNavigatorParamList";
import { LocationPickerModalNavigatorParamList } from "../locationPickerModal/LocationPickerModalNavigatorParamList";
import { NewsDetailModalNavigatorParamList } from "../newsDetailModal/NewsDetailModalNavigatorParamList";
import { PersonalInformationModalNavigatorParamList } from "../personalInformationModal/PersonalInformationModalNavigatorParamList";
import { PhoningSessionModalNavigatorParamList } from "../phoningSessionModal/PhoningSessionModalNavigatorParamList";
import { PollDetailModalNavigatorParamList } from "../pollDetailModal/PollDetailModalNavigatorParamList";
import { ProfileModalNavigatorParamList } from "../profileModal/ProfileModalNavigatorParamList";
import { TabBarNavigatorParamList } from "../tabBar/TabBarNavigatorParamList";

export type AuthenticatedRootNavigatorParamList = {
  TabBarNavigator: NavigatorScreenParams<TabBarNavigatorParamList>;
  PollDetailModal: NavigatorScreenParams<PollDetailModalNavigatorParamList>;
  PhoningSessionModal: NavigatorScreenParams<PhoningSessionModalNavigatorParamList>;
  ProfileModal: NavigatorScreenParams<ProfileModalNavigatorParamList>;
  DoorToDoorTunnelModal: NavigatorScreenParams<DoorToDoorTunnelModalNavigatorParamList>;
  NewsDetailModal: NavigatorScreenParams<NewsDetailModalNavigatorParamList>;
  EventsFilterModal: NavigatorScreenParams<EventsFilterModalNavigatorParamList>;
  LocationPickerModal: NavigatorScreenParams<LocationPickerModalNavigatorParamList>;
  PersonalInformationModal: NavigatorScreenParams<PersonalInformationModalNavigatorParamList>;
  ListPickerModal: NavigatorScreenParams<ListPickerModalNavigatorParamList>;
};
