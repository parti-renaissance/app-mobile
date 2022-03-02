import { formatAddress } from 'localized-address-format'
import { EventAddress } from '../core/entities/Event'

export const AddressFormatter = {
  formatEventAddress: (address: EventAddress): string => {
    return formatAddress({
      addressLines: [address.address],
      postalCode: address.postalCode,
      locality: address.city,
      postalCountry: address.country,
    }).join(', ')
  },
}
