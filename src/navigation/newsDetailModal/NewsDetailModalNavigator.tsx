import React, { FunctionComponent } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewsDetailScreen from "../../screens/newsDetail/NewsDetailScreen";
import { headerBlank } from "../../styles/navigationAppearance";
import { NewsDetailModalNavigatorParamList } from "./NewsDetailModalNavigatorParamList";

const Stack = createStackNavigator<NewsDetailModalNavigatorParamList>();

const NewsDetailModalNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator screenOptions={headerBlank}>
      <Stack.Screen name={"NewsDetail"} component={NewsDetailScreen} />
    </Stack.Navigator>
  );
};

export default NewsDetailModalNavigator;
