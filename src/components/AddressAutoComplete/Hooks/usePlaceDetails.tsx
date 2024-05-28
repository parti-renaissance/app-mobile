import ApiService from '@/data/network/ApiService'
import { useMutation, useQuery } from '@tanstack/react-query'
import { hoursToMilliseconds } from 'date-fns'

interface PlaceAutocompleteProps {
  placeId?: string
}

export default function usePlaceDetails() {
  return useMutation({
    mutationFn: async (placeId: string) => ApiService.getInstance().getPlaceDetails(placeId),
  })
}
