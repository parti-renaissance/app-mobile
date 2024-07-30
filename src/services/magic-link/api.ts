import { createApi } from '@/utils/constructApi'
import type { RestGetMagicLinkRequest, RestGetMagicLinkResponse } from './schema'

export const getMagicLink = async ({ platform }: RestGetMagicLinkRequest): Promise<RestGetMagicLinkResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (platform) {
        case 'adhesion':
          resolve({ link: 'https://app.parti-renaissance.fr/adhesion' })
          break
        case 'donation':
          resolve({ link: 'https://app.parti-renaissance.fr/don' })
          break
        default:
          reject(new Error('Invalid platform'))
      }
    }, 200)
  })
}

export const getLink = async ({ platform }: RestGetMagicLinkRequest): Promise<RestGetMagicLinkResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (platform) {
        case 'adhesion':
          resolve({ link: 'https://app.parti-renaissance.fr/adhesion' })
          break
        case 'donation':
          resolve({ link: 'https://app.parti-renaissance.fr/don' })
          break
        default:
          reject(new Error('Invalid platform'))
      }
    }, 200)
  })
}
