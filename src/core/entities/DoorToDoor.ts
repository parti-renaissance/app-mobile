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

export type BuildingType = 'building' | 'house'

export type DoorToDoorAddressCampaign = {
  id: string
  numberOfDoors: number
  numberOfSurveys: number
  lastPassage: Date | null
  campaignId: string
  status: DoorToDoorAddressStatus
  lastPassageDoneBy: {
    id: string
    firstName: string
    lastName: string
  }
}

export type DoorToDoorAddressStatus = 'todo' | 'ongoing' | 'completed'
