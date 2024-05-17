import ApiService from '@/data/network/ApiService'
import { useQuery } from '@tanstack/react-query'
import { hoursToMilliseconds } from 'date-fns'

interface PlaceAutocompleteProps {
  placeId?: string
}

export default function usePlaceDetails({ placeId }: PlaceAutocompleteProps) {
  return useQuery({
    queryFn: async ({ signal }) => ApiService.getInstance().getPlaceDetails(placeId!, signal),
    staleTime: hoursToMilliseconds(24),
    queryKey: ['placeDetails', placeId],
    enabled: !!placeId,
    retry: false,
  })
}
