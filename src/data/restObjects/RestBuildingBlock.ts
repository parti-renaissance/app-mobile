export interface RestBuildingBlock {
  name: string
  floors: RestBuildingBlockFloor[]
  uuid: string
  campaign_statistics?: RestBuildingBlockCampaignStatistics
}

export interface RestBuildingBlockCampaignStatistics {
  status: 'todo' | 'ongoing' | 'completed'
  closed_by: string | null
  closed_at: string | null
}

export type RestBuildingBlockFloor = {
  number: number
  uuid: string
  campaign_statistics?: RestBuildingBlockFloorCampaignStatistics
}

export type RestBuildingBlockFloorCampaignStatistics = {
  visited_doors: string[]
  nb_surveys: number
  status: 'todo' | 'ongoing' | 'completed'
}
