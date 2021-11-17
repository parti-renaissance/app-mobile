import ApiService from './network/ApiService'
import {
  DoorToDoorCharterAccepted,
  DoorToDoorCharterState,
} from '../core/entities/DoorToDoorCharterState'
import { DoorToDoorCharterMapper } from './mapper/DoorToDoorCharterMapper'

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
    if (this.cachedDoorToDoorCharterState)
      return this.cachedDoorToDoorCharterState
    const restDoorToDoorCharter = await this.apiService.getDoorToDoorCharter()
    const state = DoorToDoorCharterMapper.map(restDoorToDoorCharter)
    this.cachedDoorToDoorCharterState = state
    return state
  }

  public async acceptDoorToDoorCharter(): Promise<void> {
    await this.apiService.acceptDoorToDoorCharter()
    this.cachedDoorToDoorCharterState = new DoorToDoorCharterAccepted()
  }
}

export default DoorToDoorRepository
