import ApiService from '@/data/network/ApiService'
import { useQuery } from '@tanstack/react-query'

interface PlaceAutocompleteProps {
  address: string
  minLength?: number
  enabled?: boolean
  keepPreviousData?: boolean
}

export default function usePlaceAutocomplete({ address, enabled = true, minLength = 3, keepPreviousData }: PlaceAutocompleteProps) {
  return useQuery({
    queryFn: async ({ signal }) => ApiService.getInstance().getPlaceAutocomplete(address, signal),
    placeholderData: keepPreviousData ? (prev) => prev : undefined,
    queryKey: ['autocomplete', address],
    enabled: address.length > minLength && enabled,
    retry: false,
  })
}
