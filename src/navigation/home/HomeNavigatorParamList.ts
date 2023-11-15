import { DoorToDoorAddress } from '../../core/entities/DoorToDoor'

export type HomeNavigatorParamList = {
  Home: undefined
  Region: { zipCode: string }
  News: undefined
  EventDetails: { eventId: string }
  RetaliationDetail: { retaliationId: string }
  DoorToDoor: undefined
  BuildingDetail: { address: DoorToDoorAddress }
}
