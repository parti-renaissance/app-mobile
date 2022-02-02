import { BuildingLayoutMapper } from './restObjects/BuildingLayoutMapper'
import { BuildingBlock } from './../core/entities/BuildingBlock'
import { BuildingHistoryPointMapper } from './restObjects/BuildingHistoryPointMapper'
import ApiService from './network/ApiService'
import {
  DoorToDoorCharterAccepted,
  DoorToDoorCharterState,
} from '../core/entities/DoorToDoorCharterState'
import { DoorToDoorCharterMapper } from './mapper/DoorToDoorCharterMapper'
import { BuildingType, DoorToDoorAddress } from '../core/entities/DoorToDoor'
import { DoorToDoorMapper } from './mapper/DoorToDoorMapper'
import { BuildingHistoryPoint } from '../core/entities/BuildingHistory'
import { DoorToDoorPollConfig } from '../core/entities/DoorToDoorPollConfig'
import { DoorToDoorPollConfigMapper } from './mapper/DoorToDoorPollConfigMapper'
import { Poll } from '../core/entities/Poll'
import { DoorToDoorPollResult } from '../screens/doorToDoor/tunnel/survey/DoorToDoorQuestionResult'
import { DoorToDoorPollParams } from '../core/entities/DoorToDoorPollParams'
import { RestDoorToDoorPollRequestMapper } from './mapper/RestDoorToDoorPollRequestMapper'
import { DoorToDoorCampaignRankingMapper } from './mapper/DoorToDoorCampaignRankingMapper'
import { DoorToDoorCampaignRanking } from '../core/entities/DoorToDoorCampaignRanking'
import { RestDoorToDoorCampaignHistoryResponse } from './restObjects/RestDoorToDoorCampaignHistoryResponse'
import { DataSource } from './DataSource'
import { DoorToDoorCampaign } from '../core/entities/DoorToDoorCampaign'

class DoorToDoorRepository {
  private static instance: DoorToDoorRepository
  private apiService = ApiService.getInstance()
  private cachedDoorToDoorCharterState: DoorToDoorCharterState | undefined
  private pollConfigCache = new Map<string, DoorToDoorPollConfig>()
  private pollCache = new Map<string, Poll>()
  private pollTutorialCache: string | undefined
  private campaignCache = new Map<string, DoorToDoorCampaign>()
  private campaignRankingCache = new Map<string, DoorToDoorCampaignRanking>()

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
    return restHistory.map(BuildingHistoryPointMapper.map)
  }

  public async getAddresses(
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
  ): Promise<DoorToDoorAddress[]> {
    const restDoorToDoorAddresses = await this.apiService.getAddresses(
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    )
    return restDoorToDoorAddresses.map(DoorToDoorMapper.map).filter(notEmpty)
  }

  public async getAddress(
    addressId: string,
  ): Promise<DoorToDoorAddress | null> {
    const restDoorToDoorAddress = await this.apiService.getAddress(addressId)
    return DoorToDoorMapper.map(restDoorToDoorAddress)
  }

  public async getDoorToDoorPollConfig(
    campaignId: string,
    preferedDataSource: DataSource = 'cache',
  ): Promise<DoorToDoorPollConfig> {
    if (
      preferedDataSource === 'cache' &&
      this.pollConfigCache.has(campaignId)
    ) {
      const pollConfig = this.pollConfigCache.get(campaignId)
      if (pollConfig) return pollConfig
    }
    const restConfiguration = await this.apiService.getDoorToDoorPollConfig(
      campaignId,
    )
    const pollConfig = DoorToDoorPollConfigMapper.map(restConfiguration)
    this.pollConfigCache.set(campaignId, pollConfig)
    return pollConfig
  }

  public async getDoorToDoorPoll(
    campaignId: string,
    preferedDataSource: DataSource = 'cache',
  ): Promise<Poll> {
    if (preferedDataSource === 'cache' && this.pollCache.has(campaignId)) {
      const poll = this.pollCache.get(campaignId)
      if (poll) return poll
    }
    const fetchedPoll = await this.apiService.getDoorToDoorCampaignPoll(
      campaignId,
    )
    this.pollCache.set(campaignId, fetchedPoll)
    return fetchedPoll
  }

  public async createDoorPollCampaignHistory(
    pollParams: DoorToDoorPollParams,
    pollResult: DoorToDoorPollResult,
  ): Promise<RestDoorToDoorCampaignHistoryResponse> {
    const campaignHistoryPayload = RestDoorToDoorPollRequestMapper.mapHistoryRequest(
      pollParams,
      pollResult,
    )
    return this.apiService.createDoorToDoorCampaignHistory(
      campaignHistoryPayload,
    )
  }

  public async sendDoorToDoorPollAnswers(
    campaignHistoryId: string,
    pollResult: DoorToDoorPollResult,
  ) {
    const answers = RestDoorToDoorPollRequestMapper.mapAnswers(pollResult)
    await this.apiService.replyToDoorToDoorCampaignHistory(
      campaignHistoryId,
      answers,
    )
  }

  public async openBuildingBlock(
    campaignId: string,
    buildingId: string,
    name: string,
  ) {
    return this.apiService.sendBuildingEvent(buildingId, {
      action: 'open',
      type: 'building_block',
      identifier: name,
      campaign: campaignId,
    })
  }

  public async closeBuilding(campaignId: string, buildingId: string) {
    return this.apiService.sendBuildingEvent(buildingId, {
      action: 'close',
      type: 'building',
      campaign: campaignId,
    })
  }

  public async openBuilding(campaignId: string, buildingId: string) {
    return this.apiService.sendBuildingEvent(buildingId, {
      action: 'open',
      type: 'building',
      campaign: campaignId,
    })
  }

  public async closeBuildingBlock(
    campaignId: string,
    buildingId: string,
    name: string,
  ) {
    return this.apiService.sendBuildingEvent(buildingId, {
      action: 'close',
      type: 'building_block',
      identifier: name,
      campaign: campaignId,
    })
  }

  public async closeBuildingBlockFloor(
    campaignId: string,
    buildingId: string,
    name: string,
    floor: number,
  ) {
    return this.apiService.sendBuildingEvent(buildingId, {
      action: 'close',
      type: 'floor',
      identifier: `${name}-${floor.toString()}`,
      campaign: campaignId,
    })
  }

  public async getDoorToDoorCampaignRanking(
    campaignId: string,
    preferedDataSource: DataSource = 'cache',
  ): Promise<DoorToDoorCampaignRanking> {
    if (
      preferedDataSource === 'cache' &&
      this.campaignRankingCache.has(campaignId)
    ) {
      const ranking = this.campaignRankingCache.get(campaignId)
      if (ranking) return ranking
    }
    const fetchedCampaignRanking = await this.apiService.getDoorToDoorCampaignRanking(
      campaignId,
    )
    const campaignRanking = DoorToDoorCampaignRankingMapper.map(
      fetchedCampaignRanking,
    )
    this.campaignRankingCache.set(campaignId, campaignRanking)
    return campaignRanking
  }

  public async getDoorToDoorTutorial(): Promise<string> {
    if (this.pollTutorialCache) return this.pollTutorialCache
    const restMarkdown = await this.apiService.getDoorToDoorTutorial()
    this.pollTutorialCache = restMarkdown.content
    return restMarkdown.content
  }

  public async updateBuildingType(
    buildingId: string,
    buildingType: BuildingType,
  ): Promise<void> {
    await this.apiService.updateBuildingType(buildingId, {
      type: buildingType,
    })
  }

  public async getCampaign(
    campaignId: string,
    preferedDataSource: DataSource = 'cache',
  ): Promise<DoorToDoorCampaign> {
    if (preferedDataSource === 'cache' && this.campaignCache.has(campaignId)) {
      const campaign = this.campaignCache.get(campaignId)
      if (campaign) return campaign
    }
    const fetchedCampaign = await this.apiService.getDoorToDoorCampaign(
      campaignId,
    )
    this.campaignCache.set(campaignId, fetchedCampaign)
    return fetchedCampaign
  }
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export default DoorToDoorRepository
