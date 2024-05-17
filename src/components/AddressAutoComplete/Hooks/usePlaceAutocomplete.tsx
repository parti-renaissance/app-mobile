import ApiService from '@/data/network/ApiService'
import { useQuery } from '@tanstack/react-query'
import { minutesToMilliseconds } from 'date-fns'

interface PlaceAutocompleteProps {
  address: string
  minLength?: number
  enabled?: boolean
}

export default function usePlaceAutocomplete({ address, enabled = true, minLength = 3 }: PlaceAutocompleteProps) {
  return useQuery({
    queryFn: async ({ signal }) => ApiService.getInstance().getPlaceAutocomplete(address, signal),
    staleTime: minutesToMilliseconds(10),
    queryKey: ['autocomplete', address],
    enabled: address.length > minLength && enabled,
    retry: false,
  })
}
