import React, { FunctionComponent } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DoorToDoorTunnelModalNavigator from "../doorToDoorTunnelModal/DoorToDoorTunnelModalNavigator";
import { EventsFilterModalNavigator } from "../eventsFilterModal/EventsFilterModalNavigator";
import { ListPickerModalNavigator } from "../listPickerModal/ListPickerModalNavigator";
import { LocationPickerModalNavigator } from "../locationPickerModal/LocationPickerModalNavigator";
import NewsDetailModalNavigator from "../newsDetailModal/NewsDetailModalNavigator";
import { PersonalInformationModalNavigator } from "../personalInformationModal/PersonalInformationModalNavigator";
import PhoningSessionModalNavigator from "../phoningSessionModal/PhoningSessionModalNavigator";
import PollDetailModalNavigator from "../pollDetailModal/PollDetailModalNavigator";
import ProfileModalNavigator from "../profileModal/ProfileModalNavigator";
import { TabBarNavigator } from "../tabBar/TabBarNavigator";
import { AuthenticatedRootNavigatorParamList } from "./AuthenticatedRootNavigatorParamList";

const Stack = createStackNavigator<AuthenticatedRootNavigatorParamList>();

export const AuthenticatedRootNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name={"TabBarNavigator"} component={TabBarNavigator} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        {/* We need PollDetailScreen at this level because poll detail
          should be presented above the tab bar (i.e the HomeScreen) */}
        <Stack.Screen
          name={"PollDetailModal"}
          component={PollDetailModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={"PhoningSessionModal"}
          component={PhoningSessionModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={"ProfileModal"}
          component={ProfileModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={"DoorToDoorTunnelModal"}
          component={DoorToDoorTunnelModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={"NewsDetailModal"}
          component={NewsDetailModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="EventsFilterModal"
          component={EventsFilterModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="LocationPickerModal"
          component={LocationPickerModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="PersonalInformationModal"
          component={PersonalInformationModalNavigator}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="ListPickerModal"
          component={ListPickerModalNavigator}
          options={{ gestureEnabled: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
