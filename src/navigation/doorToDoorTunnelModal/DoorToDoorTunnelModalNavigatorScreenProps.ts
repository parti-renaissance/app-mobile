import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthenticatedRootNavigatorScreenProps } from "../authenticatedRoot/AuthenticatedRootNavigatorScreenProps";
import { DoorToDoorTunnelModalNavigatorParamList } from "./DoorToDoorTunnelModalNavigatorParamList";

export type DoorToDoorTunnelModalNavigatorScreenProps<
  T extends keyof DoorToDoorTunnelModalNavigatorParamList,
> = CompositeScreenProps<
  StackScreenProps<DoorToDoorTunnelModalNavigatorParamList, T>,
  AuthenticatedRootNavigatorScreenProps
>;
