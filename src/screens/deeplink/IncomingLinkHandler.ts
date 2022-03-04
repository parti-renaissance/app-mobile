import { Linking } from 'react-native'
import { URL as PolyfillURL, URLSearchParams } from 'react-native-url-polyfill'

const handleUrl = (url: string) => {
  const urlInstance = new PolyfillURL(url)

  // Url of type jemengage://deeplink.com/news?id={id}
  const params = new URLSearchParams('q=toto')
  console.log(
    '--> GOT URL',
    urlInstance,
    urlInstance.pathname,
    urlInstance.searchParams.get('id'),
    urlInstance.search,
    params.get('toto'),
  )

  switch (urlInstance.pathname) {
    case '/news': {
      const newsId = urlInstance.searchParams.get('id')
      if (newsId !== null) {
        // open news detail
      } else {
        // open news
      }
      break
    }
  }
}

export const IncomingLinkHandler = {
  setup: () => {
    Linking.addEventListener('url', async ({ url }) => {
      console.log('[IncomingLinkHandler] Got url from listener', url)
      handleUrl(url)
    })
    Linking.getInitialURL().then((url) => {
      if (url !== null) {
        console.log('[IncomingLinkHandler] Got url from initial load', url)
        handleUrl(url)
      }
    })
  },
}
