import ky from 'ky'
import { API_BASE_URL } from '../../config/env'

const baseHttpClient = ky.create({
  prefixUrl: API_BASE_URL,
})

export default baseHttpClient
