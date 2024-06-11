import { useEffect } from 'react'
import { ROUTES } from '@/config/routes'
import { IdentifyUserOnErrorMonitorInteractor } from '@/core/interactor/IdentifyUserOnErrorMonitorInteractor'
import { useSession } from '@/ctx/SessionProvider'
import PushRepository from '@/data/PushRepository'
import { Analytics, AnalyticsScreens } from '@/utils/Analytics'
import { PushNotification } from '@/utils/PushNotification'
import { SendDoorToDoorPollAnswersJobWorker } from '@/workers/SendDoorToDoorPollAnswsersJobWorker'
import { usePathname } from 'expo-router'

PushNotification.setUp()

const getScreenname = (route: string): AnalyticsScreens => {
  const tabRoute = ROUTES.find((tabRoute) => tabRoute.name === route)
  return tabRoute?.screenName as AnalyticsScreens
}

const subscribeNotification = async () => {
  const pushRepository = PushRepository.getInstance()
  await PushNotification.requestPermission()
  await pushRepository.synchronizePushTokenAssociation()
}

export default function useInitPushNotification() {
  const { session } = useSession()
  const pathname = usePathname()
  useEffect(() => {
    Analytics.logNavBarItemSelected(getScreenname(pathname))
  }, [pathname])

  useEffect(() => {
    if (session) {
      Analytics.enable()
      new IdentifyUserOnErrorMonitorInteractor().execute()
      SendDoorToDoorPollAnswersJobWorker.getInstance().then((worker) => {
        worker.start()
      })
      subscribeNotification().catch((error) => {
        console.error('Failed to subscribe to notifications', error)
      })
    } else {
      Analytics.disable()
    }
  }, [session])
}
