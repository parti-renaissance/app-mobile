import { Address } from '../../core/entities/DetailedProfile'

export type LocationPickerModalNavigatorParamList = {
  LocationPicker: { onAddressSelected: (address: Address) => void }
}
