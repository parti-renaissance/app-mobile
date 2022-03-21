import { utils } from '@react-native-firebase/app'
import { LinkingOptions } from '@react-navigation/native'
import { AuthenticatedRootNavigatorParamList } from '../authenticatedRoot/AuthenticatedRootNavigatorParamList'
import dynamicLinks from '@react-native-firebase/dynamic-links'
import { Linking } from 'react-native'

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

  return () => {
    unsubscribeFirebase()
    linkingSubscribption.remove()
  }
}

export const deeplinkConfiguration: LinkingOptions<AuthenticatedRootNavigatorParamList> = {
  prefixes: [PREFIX],
  getInitialURL,
  subscribe,
  config: {
    initialRouteName: 'TabBarNavigator',
    screens: {
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
    },
  },
}
