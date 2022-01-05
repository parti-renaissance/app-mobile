export interface RestBuildingEventRequest {
  action: 'open' | 'close'
  type: 'building_block' | 'floor'
  identifier: string
  campaign: string
}
