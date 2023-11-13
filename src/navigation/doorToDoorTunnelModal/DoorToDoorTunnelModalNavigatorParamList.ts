import { BuildingSelectedNavigationParams } from "../../screens/doorToDoor/tunnel/BuildingSelectedNavigationParams";

export type DoorToDoorTunnelModalNavigatorParamList = {
  TunnelDoorInterlocutor: {
    campaignId: string;
    buildingParams: BuildingSelectedNavigationParams;
    visitStartDateISOString: string; // we pass a string here to serialize the Date
  };
  TunnelDoorPoll: {
    campaignId: string;
    interlocutorStatus: string;
    buildingParams: BuildingSelectedNavigationParams;
    visitStartDateISOString: string;
  };
  TunnelDoorBrief: {
    campaignId: string;
    buildingParams: BuildingSelectedNavigationParams;
    canCloseFloor: boolean;
  };
  TunnelDoorSelection: {
    campaignId: string;
    buildingParams: BuildingSelectedNavigationParams;
    canCloseFloor: boolean;
  };
  TunnelDoorOpening: {
    campaignId: string;
    buildingParams: BuildingSelectedNavigationParams;
  };
  TunnelDoorSuccess: {
    campaignId: string;
    interlocutorStatus: string;
    buildingParams: BuildingSelectedNavigationParams;
  };
};
