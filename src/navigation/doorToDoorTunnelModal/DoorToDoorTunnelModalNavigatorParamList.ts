import { BuildingSelectedNavigationParams } from '../../screens/doorToDoor/tunnel/BuildingSelectedNavigationParams'

export type DoorToDoorTunnelModalNavigatorParamList = {
  TunnelDoorInterlocutor: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorPoll: {
    campaignId: string
    interlocutorStatus: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorBrief: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
    canCloseFloor: boolean
  }
  TunnelDoorSelection: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
    canCloseFloor: boolean
  }
  TunnelDoorOpening: {
    campaignId: string
    buildingParams: BuildingSelectedNavigationParams
  }
  TunnelDoorSuccess: {
    campaignId: string
    interlocutorStatus: string
    buildingParams: BuildingSelectedNavigationParams
  }
}
