import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthenticatedRootNavigatorScreenProps } from "../authenticatedRoot/AuthenticatedRootNavigatorScreenProps";
import { ProfileModalNavigatorParamList } from "./ProfileModalNavigatorParamList";

export type ProfileModalNavigatorScreenProps<T extends keyof ProfileModalNavigatorParamList> =
  CompositeScreenProps<
    StackScreenProps<ProfileModalNavigatorParamList, T>,
    AuthenticatedRootNavigatorScreenProps
  >;
