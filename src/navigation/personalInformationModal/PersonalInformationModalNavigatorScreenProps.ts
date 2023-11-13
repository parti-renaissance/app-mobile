import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthenticatedRootNavigatorScreenProps } from "../authenticatedRoot/AuthenticatedRootNavigatorScreenProps";
import { PersonalInformationModalNavigatorParamList } from "./PersonalInformationModalNavigatorParamList";

export type PersonalInformationModalNavigatorScreenProps<
  T extends keyof PersonalInformationModalNavigatorParamList,
> = CompositeScreenProps<
  StackScreenProps<PersonalInformationModalNavigatorParamList, T>,
  AuthenticatedRootNavigatorScreenProps
>;
