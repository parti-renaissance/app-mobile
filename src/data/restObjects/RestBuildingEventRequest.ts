export interface RestBuildingEventRequest {
  action: 'open' | 'close'
  type: 'building_block'
  identifier: string
  campaign: string
}
