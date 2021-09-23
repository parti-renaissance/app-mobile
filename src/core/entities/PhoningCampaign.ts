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
  calls: string
  surveys: string
  position: number
  caller: boolean
}
