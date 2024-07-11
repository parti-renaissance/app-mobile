import { getAlerts } from '@/services/alerts/api'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useAlerts = () => {
  return useSuspenseQuery({
    queryKey: ['alerts'],
    queryFn: () => getAlerts(),
  })
}
