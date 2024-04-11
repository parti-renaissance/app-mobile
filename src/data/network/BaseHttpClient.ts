import ky from 'ky'

const baseHttpClient = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
})

export default baseHttpClient
