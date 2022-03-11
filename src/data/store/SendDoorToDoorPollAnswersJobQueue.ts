import AsyncStorage from '@react-native-async-storage/async-storage'
import { Queue } from 'mnemonist'
import { BuildingType } from '../../core/entities/DoorToDoor'
import { DoorToDoorPollResult } from '../../screens/doorToDoor/tunnel/survey/DoorToDoorQuestionResult'

const STORAGE_KEY = '@door_to_door_poll_answers_queue_key'

export interface BuildingSelectedParams {
  id: string
  block: string
  floor: number
  door: number
  type: BuildingType
}

export interface SendDoorToDoorPollAnswersJobQueueItem {
  campaignId: string
  doorStatus: string
  buildingParams: BuildingSelectedParams
  pollResult?: DoorToDoorPollResult
  visitStartDateISOString: string
}

export class SendDoorToDoorPollAnswersJobQueue {
  private static instance: SendDoorToDoorPollAnswersJobQueue
  private queue = new Queue<SendDoorToDoorPollAnswersJobQueueItem>()
  private constructor() {}

  async init() {
    const storedQueue = await AsyncStorage.getItem(STORAGE_KEY)
    if (storedQueue) {
      this.queue = Queue.from(JSON.parse(storedQueue))
    }
  }

  async enqueue(payload: SendDoorToDoorPollAnswersJobQueueItem) {
    this.queue.enqueue(payload)
    await this.persistOnStorage()
  }

  async dequeue(): Promise<SendDoorToDoorPollAnswersJobQueueItem | undefined> {
    const item = this.queue.dequeue()
    await this.persistOnStorage()
    return item
  }

  async getAll() {
    return this.queue.toArray()
  }

  async clear() {
    this.queue.clear()
    await this.persistOnStorage()
  }

  size(): number {
    return this.queue.size
  }

  private async persistOnStorage() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.queue))
    } catch (error) {
      // noop
    }
  }

  public static async getInstance(): Promise<SendDoorToDoorPollAnswersJobQueue> {
    if (!SendDoorToDoorPollAnswersJobQueue.instance) {
      SendDoorToDoorPollAnswersJobQueue.instance = new SendDoorToDoorPollAnswersJobQueue()
      await SendDoorToDoorPollAnswersJobQueue.instance.init()
    }

    return SendDoorToDoorPollAnswersJobQueue.instance
  }
}
