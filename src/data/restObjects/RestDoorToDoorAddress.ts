export interface RestDoorToDoorAddress {
  number: string
  address: string
  insee_code: string
  city_name: string
  latitude: number
  longitude: number
  voters_count: number
  priority: number | null
  postal_codes: string[]
  building: {
    type: 'building' | 'house' | null
    uuid: string
    campaign_statistics?: RestDoorToDoorAddressCampaignStatistics | null
  }
  uuid: string
}

export interface RestDoorToDoorAddressCampaignStatistics {
  uuid: string
  nb_visited_doors: number
  nb_surveys: number
  nb_distributed_programs: number
  status_detail: 'completed_pap' | 'completed_boitage' | 'completed_hybrid'
  last_passage: string | null
  status: 'todo' | 'ongoing' | 'completed'
  last_passage_done_by?: {
    first_name: string
    last_name: string
    uuid: string
  }
  campaign: {
    uuid: string
  }
}
