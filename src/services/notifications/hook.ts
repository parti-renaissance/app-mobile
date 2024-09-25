import * as api from '@/services/notifications/api'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useGetNotificationList = () => {
  return useSuspenseQuery({
    queryKey: ['notificationList'],
    queryFn: () => api.getNotificationList(),
    staleTime: 1000 * 60 * 5,
  })
}

export const useGetReSubscribeConfig = () => {
  return useSuspenseQuery({
    queryKey: ['reSubscribeConfig'],
    queryFn: () => api.getReSubscribeConfig(),
  })
}
