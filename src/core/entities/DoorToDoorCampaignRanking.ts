export interface DoorToDoorCampaignRanking {
  individual: Array<DoorToDoorCampaignRankingItem>
  departemental: Array<DoorToDoorCampaignRankingItem>
}

export interface DoorToDoorCampaignRankingItem {
  rank: number
  name: string
  visitedDoors: number
  surveys: number
  current: boolean
}
