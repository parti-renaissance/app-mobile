import { Moment } from 'moment-timezone'

export type DoorToDoorAddress = {
  id: string
  number: string
  address: string
  inseeCode: string
  cityName: string
  latitude: number
  longitude: number
  votersCount: number
  postalCodes: string[]
  building: {
    id: string
    type: BuildingType
    campaignStatistics: DoorToDoorAddressCampaign
  }
}

// TODO 2021/12/2 (Denis Poifol) null does not make sense here
export type BuildingType = 'building' | 'house' | null

export type DoorToDoorAddressCampaign = {
  id: string
  numberOfDoors: number
  numberOfSurveys: number
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
