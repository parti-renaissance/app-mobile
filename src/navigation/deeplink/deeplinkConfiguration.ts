import { Linking } from 'react-native'
import { utils } from '@react-native-firebase/app'
import dynamicLinks from '@react-native-firebase/dynamic-links'
import { LinkingOptions } from '@react-navigation/native'
import { BUNDLE_ID } from '../../config/env'
import { PushNotification } from '../../utils/PushNotification'
import { AuthenticatedRootNavigatorParamList } from '../authenticatedRoot/AuthenticatedRootNavigatorParamList'

const PREFIX = 'https://avecvous.fr/app/'

const getInitialURL = async (): Promise<string | null | undefined> => {
  const { isAvailable } = utils().playServicesAvailability
  if (isAvailable) {
    const initialLink = await dynamicLinks().getInitialLink()
    console.log('[Deeplink] Get initial dynamic link', initialLink)
    if (initialLink) {
      return initialLink.url
    }
  }

  const pushUrl = await PushNotification.getInitialDeeplinkUrl()
  if (pushUrl) {
    console.log('[Deeplink] Get initial link  push', pushUrl)
    return pushUrl
  }

  const url = await Linking.getInitialURL()
  if (url) {
    console.log('[Deeplink] Get initial url', url)
  }
  return url
}

const subscribe = (
  listener: (url: string) => void,
): undefined | void | (() => void) => {
  const unsubscribeFirebase = dynamicLinks().onLink(({ url }) => {
    console.log('[Deeplink] Listened for dynamic link url', url)
    listener(url)
  })
  const linkingSubscribption = Linking.addEventListener('url', ({ url }) => {
    console.log('[Deeplink] Listened for url', url)
    listener(url)
  })

  const unsubscribeNotification = PushNotification.observeDeeplinkUrl((url) => {
    console.log('[Deeplink] Got url from push notification', url)
    listener(url)
  })

  return () => {
    unsubscribeFirebase()
    unsubscribeNotification()
    linkingSubscribption.remove()
  }
}

export const deeplinkConfiguration: LinkingOptions<AuthenticatedRootNavigatorParamList> =
  {
    prefixes: [PREFIX, BUNDLE_ID + '://'],
    getInitialURL,
    subscribe,
    config: {
      initialRouteName: 'TabBarNavigator',
      screens: {
        TabBarNavigator: {
          screens: {
            ActionsNavigator: {
              // TODO: Fix type
              // @ts-ignore
              initialRouteName: 'Actions',
              screens: {
                RetaliationDetail: 'ripostes/:retaliationId',
                DoorToDoor: 'pap-campaigns/:campaignId',
              },
            },
            EventNavigator: {
              // TODO: Fix type
              // @ts-ignore
              initialRouteName: 'Events',
              screens: {
                EventDetails: 'events/:eventId',
              },
            },
          },
        },
        NewsDetailModal: {
          screens: {
            NewsDetail: 'news/:newsId',
          },
        },
        PhoningSessionModal: {
          screens: {
            PhoningSessionLoader: 'phoning-campaigns/:campaignId',
          },
        },
        PollDetailModal: {
          screens: {
            PollDetail: 'surveys/:pollId',
          },
        },
      },
    },
  }
