import { useEffect } from 'react';
import { ROUTES } from '@/config/routes';
import { IdentifyUserOnErrorMonitorInteractor } from '@/core/interactor/IdentifyUserOnErrorMonitorInteractor';
import { useSession } from '@/ctx/SessionProvider';
import PushRepository from '@/data/PushRepository';
import { Analytics, AnalyticsScreens } from '@/utils/Analytics';
import { PushNotification } from '@/utils/PushNotification';
import { usePathname } from 'expo-router'
import { SendDoorToDoorPollAnswersJobWorker } from '@/workers/SendDoorToDoorPollAnswsersJobWorker'

PushNotification.setUp()

const getScreenname = (route: string): AnalyticsScreens => {
  const tabRoute = ROUTES.find((tabRoute) => tabRoute.name === route)
  return tabRoute?.screenName as AnalyticsScreens
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
      PushNotification.requestPermission()
      new IdentifyUserOnErrorMonitorInteractor().execute()
      SendDoorToDoorPollAnswersJobWorker.getInstance().then((worker) => {
        worker.start()
      })
      PushRepository.getInstance()
        .synchronizeGeneralTopicSubscription()
        .catch((error) => {
          console.log(error)
        })
    }
    Analytics.disable()
  }, [session])
}
