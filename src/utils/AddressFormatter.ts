import { Address } from '@/core/entities/DetailedProfile'
import { EventAddress } from '@/core/entities/Event'
import { RestPostAddress } from '@/data/restObjects/RestDetailedProfileResponse'
import { formatAddress } from 'localized-address-format'

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
      addressLines: address.address !== undefined ? [address.address] : undefined,
      postalCode: address.postalCode,
      locality: address.city,
      postalCountry: address.country,
    }).join(', ')
  },
  formatProfileFormatAddress: (address: RestPostAddress): string => {
    return formatAddress({
      addressLines: address.address ? [address.address] : [],
      postalCode: address.postal_code ?? undefined,
      locality: address.city ?? undefined,
      postalCountry: address.country ?? undefined,
    }).join(', ')
  },
}
