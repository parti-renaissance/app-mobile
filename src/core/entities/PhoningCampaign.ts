export interface PhoningCampaign {
  id: string
  title: string
  brief: string
  goal: number
  callsCount: number
  finishAt: Date
  scoreboard: Array<PhoningCampaignScore>
}

export interface PhoningCampaignScore {
  firstName: string
  score: string
  position: number
  caller: true
}
