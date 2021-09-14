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
  score: string
  position: number
  caller: true
}
