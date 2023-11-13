import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { TabBarNavigatorScreenProps } from "../tabBar/TabBarNavigatorScreenProps";
import { NewsNavigatorParamList } from "./NewsNavigatorParamList";

export type NewsNavigatorScreenProps<T extends keyof NewsNavigatorParamList> = CompositeScreenProps<
  StackScreenProps<NewsNavigatorParamList, T>,
  TabBarNavigatorScreenProps
>;
