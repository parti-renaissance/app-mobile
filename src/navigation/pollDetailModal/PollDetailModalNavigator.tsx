import React, { FunctionComponent } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PollDetailScreen from "../../screens/pollDetail/PollDetailScreen";
import PollDetailSuccessScreen from "../../screens/pollDetail/PollDetailSuccessScreen";
import { headerBlank } from "../../styles/navigationAppearance";
import { PollDetailModalNavigatorParamList } from "./PollDetailModalNavigatorParamList";

const Stack = createStackNavigator<PollDetailModalNavigatorParamList>();

const PollDetailModalNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen name={"PollDetail"} component={PollDetailScreen} />
      <Stack.Screen
        name={"PollDetailSuccess"}
        component={PollDetailSuccessScreen}
        options={{ headerLeft: () => null }}
      />
    </Stack.Navigator>
  );
};

export default PollDetailModalNavigator;
