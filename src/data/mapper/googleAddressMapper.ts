export default function googleAddressMapper(res: google.maps.GeocoderAddressComponent[]): {
  address: string
  city: string
  postalCode: string
  country: string
} {
  const extract = (el: string) => res.find(({ types }) => types.includes(el))

  const streetNumber = extract('street_number')
  const street = extract('route')
  const city = extract('locality')
  const country = extract('country')
  const postalCode = extract('postal_code')

  return {
    address: `${streetNumber?.long_name} ${street?.long_name}`,
    city: city?.long_name ?? '',
    postalCode: postalCode?.long_name ?? '',
    country: country?.long_name ?? '',
  }
}
