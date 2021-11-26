import { Moment } from 'moment-timezone'

export type DoorToDoorAddress = {
  id: string
  number: string
  address: string
  inseeCode: string
  cityName: string
  latitude: number
  longitude: number
  building: {
    id: string
    type: 'building' | 'house' | null
    campaignStatistics: DoorToDoorAddressCampaign
  }
}
export type DoorToDoorAddressCampaign = {
  id: string
  nbDoors: number
  nbSurveys: number
  lastPassage: Moment | null
  campaignId: string
  status: DoorToDoorAddressStatus
  lastPassageDoneBy: {
    id: string
    firstName: string
    lastName: string
  }
} | null

export type DoorToDoorAddressStatus = 'todo' | 'ongoing' | 'completed'
