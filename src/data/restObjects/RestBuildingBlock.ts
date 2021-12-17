export interface RestBuildingBlock {
  name: string
  floors: RestBuildingBlockFloor[]
  uuid: string
  status: 'todo' | 'ongoing' | 'completed'
}

export type RestBuildingBlockFloor = {
  number: number
  uuid: string
  campaign_statistics: RestBuildingBlockFloorCampaignStatistics
}

export type RestBuildingBlockFloorCampaignStatistics = {
  visited_doors: string[]
  nb_surveys: number
  status: 'todo' | 'ongoing' | 'completed'
}
