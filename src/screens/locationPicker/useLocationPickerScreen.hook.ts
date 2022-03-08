import { useNavigation } from '@react-navigation/native'
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete'
import { Address } from '../../core/entities/DetailedProfile'
import ProfileRepository from '../../data/ProfileRepository'
import { LocationPickerModalNavigatorScreenProps } from '../../navigation/locationPickerModal/LocationPickerModalNavigatorScreenProps'
import { AddressFromGooglePlaceDetailMapper } from './AddressFromGooglePlaceDetailMapper'

export const useLocationPickerScreen = (
  onAddressSelected: (address: Address) => void,
): {
  onPlaceSelected: (place: GooglePlaceDetail | null) => void
} => {
  const navigation = useNavigation<
    LocationPickerModalNavigatorScreenProps<'LocationPicker'>['navigation']
  >()

  const getCityFromPostalCode = async (
    postalCode: string,
  ): Promise<string | undefined> => {
    try {
      const cityFound = await ProfileRepository.getInstance().getCityFromPostalCode(
        postalCode,
      )
      return cityFound
    } catch (error) {
      return undefined
    }
  }

  const onPlaceSelected = async (details: GooglePlaceDetail | null) => {
    if (details === null) {
      return
    }
    let address = AddressFromGooglePlaceDetailMapper.map(details)

    if (address.postalCode !== undefined) {
      const newCity =
        (await getCityFromPostalCode(address.postalCode)) ?? address.city
      address = {
        ...address,
        city: newCity,
      }
    }

    onAddressSelected(address)
    navigation.goBack()
  }

  return {
    onPlaceSelected,
  }
}
