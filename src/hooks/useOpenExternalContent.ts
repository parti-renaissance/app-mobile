import { useGetMagicLink } from '@/services/magic-link/hook'
import { Slugs } from '@/services/magic-link/schema'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import * as WebBrowser from 'expo-web-browser'

const mapTargetPath = (url: string, cb: (x: string) => string) => {
  const Url = new URL(url)
  let target_path_url = Url.searchParams.get('_target_path')
  if (target_path_url) {
    try {
      Url.searchParams.set('_target_path', cb(target_path_url))
    } catch (e) {
      ErrorMonitor.log("erreur lors de la construction de l'url de redirection", e)
    }
  }
  return Url.toString()
}

const addHttps = (url: string) => {
  if (url.startsWith('//')) {
    return 'https:' + url
  }
  return url
}

const handler = (props: { slug: Slugs; magicLink?: { url: string } }) => {
  switch (props.slug) {
    case 'donation':
      return (duration: 'monthly' | 'dayly') => () => {
        if (props.magicLink) {
          const url = mapTargetPath(props.magicLink.url, (target_path) => {
            const target_path_url = new URL(addHttps(target_path))
            target_path_url.searchParams.set('duration', duration === 'monthly' ? '-1' : '0')
            return target_path_url.toString()
          })

          WebBrowser.openBrowserAsync(url)
        }
      }

    case 'contribution':
    case 'adhesion':
      return () => {
        if (props.magicLink) {
          WebBrowser.openBrowserAsync(mapTargetPath(props.magicLink.url, addHttps))
        }
      }
  }
}

function useOpenExternalContent(
  ...[props]: [{ slug: 'donation' }]
): ReturnType<typeof useGetMagicLink> & { open: (duration: 'monthly' | 'dayly') => () => void }
function useOpenExternalContent(...[props]: [{ slug: Omit<Slugs, 'donation'> }]): ReturnType<typeof useGetMagicLink> & { open: () => void }
function useOpenExternalContent(...[props]: Parameters<typeof useGetMagicLink>) {
  const queryLink = useGetMagicLink(props)
  return { ...queryLink, open: handler({ ...props, magicLink: queryLink.data }) }
}

export { useOpenExternalContent }
