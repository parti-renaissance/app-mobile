export interface RestDoorToDoorAddress {
  number: string
  address: string
  insee_code: string
  city_name: string
  latitude: number
  longitude: number
  voters_count: number
  postal_codes: string[]
  building: {
    type: 'building' | 'house' | null
    uuid: string
    campaign_statistics: {
      uuid: string
      nb_visited_doors: number
      nb_surveys: number
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
    } | null
  }
  uuid: string
}
