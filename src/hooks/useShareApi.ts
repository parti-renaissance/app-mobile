import { Share } from 'react-native'
import { useSuspenseQuery } from '@tanstack/react-query'
import * as Sharing from 'expo-sharing'

type ShareContent = { url: string; title?: string; message?: string }

export default function useShareApi() {
  const { data } = useSuspenseQuery({
    queryKey: ['shareApi'],
    queryFn: () => {
      return Sharing.isAvailableAsync()
    },
  })

  const shareAsync = async (payload: ShareContent) => {
    if (typeof window !== 'undefined' && navigator.share) {
      return navigator.share({
        title: payload.title,
        text: payload.message,
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
