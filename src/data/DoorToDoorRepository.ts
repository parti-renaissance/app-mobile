import { BuildingLayoutMapper } from './restObjects/BuildingLayoutMapper'
import { BuildingBlock } from './../core/entities/BuildingBlock'
import { BuildingHistoryMapper } from './restObjects/BuildingHistoryMapper'
import ApiService from './network/ApiService'
import {
  DoorToDoorCharterAccepted,
  DoorToDoorCharterState,
} from '../core/entities/DoorToDoorCharterState'
import { DoorToDoorCharterMapper } from './mapper/DoorToDoorCharterMapper'
import { DoorToDoorAddress } from '../core/entities/DoorToDoor'
import { DoorToDoorMapper } from './mapper/DoorToDoorMapper'
import { BuildingHistoryPoint } from '../core/entities/BuildingHistory'
import { DoorToDoorPollConfig } from '../core/entities/DoorToDoorPollConfig'
import { DoorToDoorPollConfigMapper } from './mapper/DoorToDoorPollConfigMapper'
import { Poll } from '../core/entities/Poll'

class DoorToDoorRepository {
  private static instance: DoorToDoorRepository
  private apiService = ApiService.getInstance()
  private cachedDoorToDoorCharterState: DoorToDoorCharterState | undefined

  public static getInstance(): DoorToDoorRepository {
    if (!DoorToDoorRepository.instance) {
      DoorToDoorRepository.instance = new DoorToDoorRepository()
    }
    return DoorToDoorRepository.instance
  }

  public async getDoorToDoorCharterState(): Promise<DoorToDoorCharterState> {
    if (this.cachedDoorToDoorCharterState) {
      return this.cachedDoorToDoorCharterState
    }
    const restDoorToDoorCharter = await this.apiService.getDoorToDoorCharter()
    const state = DoorToDoorCharterMapper.map(restDoorToDoorCharter)
    this.cachedDoorToDoorCharterState = state
    return state
  }

  public async acceptDoorToDoorCharter(): Promise<void> {
    await this.apiService.acceptDoorToDoorCharter()
    this.cachedDoorToDoorCharterState = new DoorToDoorCharterAccepted()
  }

  public async buildingBlocks(
    buidlingId: string,
    campaignId: string,
  ): Promise<BuildingBlock[]> {
    const restLayout = await this.apiService.buildingBlocks(
      buidlingId,
      campaignId,
    )
    return BuildingLayoutMapper.map(restLayout)
  }

  public async buildingHistory(
    buidlingId: string,
    campaignId: string,
  ): Promise<BuildingHistoryPoint[]> {
    const restHistory = await this.apiService.buildingHistory(
      buidlingId,
      campaignId,
    )
    return restHistory.map(BuildingHistoryMapper.map)
  }

  public async getAddresses(
    latitude: number,
    longitude: number,
    zoom: number,
  ): Promise<DoorToDoorAddress[]> {
    const restDoorToDoorAddresses = await this.apiService.getAddresses(
      latitude,
      longitude,
      zoom,
    )
    return restDoorToDoorAddresses.map(DoorToDoorMapper.map).filter(notEmpty)
  }

  public async getDoorToDoorPollConfig(
    campaignId: string,
  ): Promise<DoorToDoorPollConfig> {
    const restConfiguration = await this.apiService.getDoorToDoorPollConfig(
      campaignId,
    )
    return DoorToDoorPollConfigMapper.map(restConfiguration)
  }

  public async getDoorToDoorPoll(campaignId: string): Promise<Poll> {
    return this.apiService.getDoorToDoorCampaignPoll(campaignId)
  }
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export default DoorToDoorRepository
