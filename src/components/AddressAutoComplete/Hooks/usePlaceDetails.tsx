import ApiService from '@/data/network/ApiService'
import { useMutation } from '@tanstack/react-query'

interface PlaceAutocompleteProps {
  placeId?: string
}

export default function usePlaceDetails() {
  return useMutation({
    mutationFn: async (placeId: string) => ApiService.getInstance().getPlaceDetails(placeId),
  })
}
