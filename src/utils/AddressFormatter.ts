import { formatAddress } from 'localized-address-format'
import { Address } from '../core/entities/DetailedProfile'
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
  formatProfileAddress: (address: Address): string => {
    return formatAddress({
      addressLines:
        address.address !== undefined ? [address.address] : undefined,
      postalCode: address.postalCode,
      locality: address.city,
      postalCountry: address.country,
    }).join(', ')
  },
}
