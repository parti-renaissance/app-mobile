import {
  AddressComponent,
  GooglePlaceDetail,
  PlaceType,
} from 'react-native-google-places-autocomplete'
import { Address } from '../../core/entities/DetailedProfile'

const extractComponent = (
  components: AddressComponent[],
  searchedType: PlaceType,
): AddressComponent | undefined => {
  return components.find((value) => {
    return value.types.includes(searchedType)
  })
}

export const AddressFromGooglePlaceDetailMapper = {
  map: (details: GooglePlaceDetail): Address => {
    const streetNumber = extractComponent(
      details.address_components,
      'street_number',
    )?.long_name
    const streetAddress = extractComponent(details.address_components, 'route')
      ?.long_name
    const postalCode = extractComponent(
      details.address_components,
      'postal_code',
    )?.long_name
    const city = extractComponent(details.address_components, 'locality')
      ?.long_name
    const countryCode = extractComponent(details.address_components, 'country')
      ?.short_name

    const fullAddress = [streetNumber, streetAddress]
      .filter((a): a is string => !!a)
      .join(' ')

    return {
      address: fullAddress.length > 0 ? fullAddress : undefined,
      postalCode: postalCode,
      country: countryCode,
      city: city,
    }
  },
}
