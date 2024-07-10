import { LogoutAPIRequestSchema, LogoutAPIResponseSchema } from '@/services/logout/schema'
import { useUserStore } from '@/store/user-store'
import { api } from '@/utils/api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { router } from 'expo-router'
import { toast } from 'sonner'
import { z } from 'zod'

const LogoutRequest = LogoutAPIRequestSchema

const LogoutResponse = LogoutAPIResponseSchema

interface ErrorResponse {
  message: string
}

const logout = api<z.infer<typeof LogoutRequest>, z.infer<typeof LogoutResponse>>({
  method: 'POST',
  path: API_ENDPOINT.SIGN_OUT,
  requestSchema: LogoutRequest,
  responseSchema: LogoutResponse,
})

export function useLogOut() {
  const { removeCredentials } = useUserStore()
  return useMutation<z.infer<typeof LogoutAPIResponseSchema>, AxiosError<ErrorResponse>>({
    mutationFn: logout,
    onSuccess: (data) => {
      const { message } = data
      removeCredentials()
      toast.success(message)
      router.push(Routes.LOGIN)
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message
      toast.error(errorMessage)
    },
  })
}
