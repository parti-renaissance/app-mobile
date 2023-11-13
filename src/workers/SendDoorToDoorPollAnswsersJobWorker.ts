import NetInfo from "@react-native-community/netinfo";
import { SendDoorPollAnswersInteractor } from "../core/interactor/SendDoorPollAnswersInteractor";
import { SendDoorToDoorPollAnswersJobQueue } from "../data/store/SendDoorToDoorPollAnswersJobQueue";

export class SendDoorToDoorPollAnswersJobWorker {
  private static instance: SendDoorToDoorPollAnswersJobWorker;
  private jobQueue: SendDoorToDoorPollAnswersJobQueue | null = null;
  private isExecutingJobs = false;

  async start() {
    this.jobQueue = await SendDoorToDoorPollAnswersJobQueue.getInstance();
    NetInfo.addEventListener((state) => {
      if (!this.isExecutingJobs && this.jobQueue !== null && state.isInternetReachable) {
        this.dequeueJobs(this.jobQueue);
      }
    });
  }

  private async dequeueJobs(queue: SendDoorToDoorPollAnswersJobQueue) {
    this.isExecutingJobs = true;
    const useCase = new SendDoorPollAnswersInteractor();
    while (queue.size() > 0 && this.isInternetReachable()) {
      const item = await queue.dequeue();
      if (item) {
        try {
          await useCase.execute(item);
        } catch (error) {
          // noop
        }
      }
    }
    this.isExecutingJobs = false;
  }

  private async isInternetReachable(): Promise<boolean | null> {
    return (await NetInfo.fetch()).isInternetReachable;
  }

  public static async getInstance(): Promise<SendDoorToDoorPollAnswersJobWorker> {
    if (!SendDoorToDoorPollAnswersJobWorker.instance) {
      SendDoorToDoorPollAnswersJobWorker.instance = new SendDoorToDoorPollAnswersJobWorker();
    }

    return SendDoorToDoorPollAnswersJobWorker.instance;
  }
}
