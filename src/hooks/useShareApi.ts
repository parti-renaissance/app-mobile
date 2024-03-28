import { ShareContent as _ShareContent, Share } from 'react-native'
import { useSuspenseQuery } from '@tanstack/react-query'
import * as Sharing from 'expo-sharing'

type ShareContent = {
  message: string
} & (
  | {
      url: string
    }
  | {
      title: string
    }
  | {
      url: string
      title: string
    }
)

const isWebShareContent = (content: ShareContent): content is { url: string; title: string; message: string } => {
  return 'url' in content && 'title' in content
}

export default function useShareApi() {
  const { data } = useSuspenseQuery({
    queryKey: ['shareApi'],
    queryFn: () => {
      return Sharing.isAvailableAsync()
    },
  })

  const shareAsync = async (payload: ShareContent) => {
    if (typeof window !== 'undefined' && navigator.share && isWebShareContent(payload)) {
      return navigator.share({
        title: payload.title,
        // @ts-ignore
        text: payload.message,
        // @ts-ignore
        url: payload.url,
      })
    }
    await Share.share(payload)
  }

  return {
    isShareAvailable: data,
    shareAsync,
  }
}
