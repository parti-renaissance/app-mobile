export interface RestPhoningCampaign {
  uuid: string
  title: string
  brief: string
  goal: number
  nb_calls: number
  finish_at: string
  scoreboard: Array<RestPhoningCampaignScore>
}

export interface RestPhoningCampaignScore {
  firstName: string
  position: number
  caller: boolean
  nb_calls: string
  nb_surveys: string
}
