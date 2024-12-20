import { useMutation } from '@tanstack/react-query'
import { addPushToken } from '../api'

export function useAddPushToken() {
  return useMutation({
    mutationFn: addPushToken,
  })
}
