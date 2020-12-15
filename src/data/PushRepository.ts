import messaging from '@react-native-firebase/messaging'
import { ENVIRONMENT } from '../Config'
import LocalStore from './store/LocalStore'

class PushRepository {
  private static instance: PushRepository
  private localStore = LocalStore.getInstance()
  private constructor() {}

  public async subscribeToGeneralTopic(): Promise<void> {
    const registrations = await this.localStore.getTopicsRegistration()
    if (registrations?.globalRegistered !== true) {
      await messaging().subscribeToTopic(this.createTopicName('global'))
      await this.localStore.updateTopicsRegistration({
        globalRegistered: true,
      })
    } else {
      // no-op: already registered
    }
  }

  public async invalidatePushToken(): Promise<void> {
    return messaging()
      .deleteToken()
      .then(() => this.localStore.clearTopicsRegistration())
  }

  private createTopicName(topic: string): string {
    return ENVIRONMENT + '_jemarche_' + topic
  }

  public static getInstance(): PushRepository {
    if (!PushRepository.instance) {
      PushRepository.instance = new PushRepository()
    }
    return PushRepository.instance
  }
}

export default PushRepository
