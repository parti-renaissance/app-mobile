import ApiService from './network/ApiService'
import {
  DoorToDoorCharterAccepted,
  DoorToDoorCharterState,
} from '../core/entities/DoorToDoorCharterState'
import { DoorToDoorCharterMapper } from './mapper/DoorToDoorCharterMapper'
import { DoorToDoorAddress } from '../core/entities/DoorToDoor'
import { DoorToDoorMapper } from './mapper/DoorToDoorMapper'

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
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export default DoorToDoorRepository
