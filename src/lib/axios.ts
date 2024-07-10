import clientEnv from '@/config/clientEnv'
import { getRefreshToken } from '@/services/refresh-token/api'
import { useUserStore } from '@/store/user-store'
import axios, { AxiosError, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios'
import { identity } from 'fp-ts/lib/function'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const baseConfig: CreateAxiosDefaults = {
  baseURL: clientEnv.API_BASE_URL,
  withCredentials: true,
}

export const instanceWithoutInterceptors = axios.create(baseConfig)

export const instance = axios.create(baseConfig)

instance.interceptors.request.use(
  function (config) {
    const accessToken = useUserStore.getState().user?.accessToken
    // console.log('accessToken', accessToken)

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(identity, async function (error: AxiosError) {
  const originalRequest: CustomAxiosRequestConfig | undefined = error.config

  if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
    originalRequest._retry = true
    try {
      const refreshToken = useUserStore.getState().user?.refreshToken
      if (!refreshToken) {
        useUserStore.getState().removeCredentials()
        return
      }
      const response = await getRefreshToken({
        client_id: clientEnv.OAUTH_CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      })

      useUserStore.setState({ user: { accessToken: response.access_token, refreshToken: response.refresh_token } })

      originalRequest.headers.Authorization = `Bearer ${response.access_token}`

      return instance(originalRequest)
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 403) {
        useUserStore.getState().removeCredentials()
        return
      }
    }
  }

  return Promise.reject(error)
})