type RestBuildingEventRequestBoitage = {
  action: 'close'
  close_type: 'boitage'
  programs: number
  campaign: string
}

export type RestBuildingEventRequest =
  | {
      action: 'open' | 'close'
      type: 'building_block' | 'floor' | 'building'
      identifier?: string
      campaign: string
    }
  | RestBuildingEventRequestBoitage
