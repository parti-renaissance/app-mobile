import clientEnv from '@/config/clientEnv'
import ky from 'ky'

const baseHttpClient = ky.create({
  prefixUrl: clientEnv.API_BASE_URL,
})

export default baseHttpClient
