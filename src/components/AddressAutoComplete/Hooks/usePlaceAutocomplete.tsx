import clientEnv from '@/config/clientEnv'
import { useQuery } from '@tanstack/react-query'
import { minutesToMilliseconds } from 'date-fns'
import { stringify } from 'qs'
import { isWeb } from 'tamagui'

const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json`
const useCorsProxy = (original: string) => (isWeb ? `https://corsproxy.io/?${encodeURIComponent(original)}` : original)

interface PlaceAutocompleteProps {
  address: string
  minLength?: number
  enabled?: boolean
}

export default function usePlaceAutocomplete({ address, enabled, minLength = 3 }: PlaceAutocompleteProps) {
  const payload = stringify({
    input: address,
    key: clientEnv.IOS_GOOGLE_API_KEY,
  })

  return useQuery({
    queryFn: ({ signal }) =>
      fetch(useCorsProxy(`${endpoint}?${payload}`), { signal })
        .then((res) => res.json())
        .then((data) => data.predictions as google.maps.places.AutocompletePrediction[]),
    staleTime: minutesToMilliseconds(10),
    queryKey: ['autocomplete', address],
    enabled: address.length > minLength && enabled,
    retry: false,
  })
}
