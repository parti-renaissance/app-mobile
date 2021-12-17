import { Moment } from 'moment-timezone'

export type BuildingHistoryPoint = {
  questioner: string
  buildingBlock: string
  floor: number
  door: string
  createdAt: Moment
  status: string
}
