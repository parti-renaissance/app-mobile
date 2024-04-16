import { ListPickerScreen } from "@/screens/listPicker/ListPickerScreen";
import { CountryRepository } from "@/data/CountryRepository";
import { DeviceEventEmitter } from "react-native";
import { CallingCodeListPikerViewModelMapper } from '@/screens/personalInformation/CallingCodeListPickerViewModelMapper'

import { useLocalSearchParams } from "expo-router";

function PhoneCodeModal () {
    const { selectedItemId } = useLocalSearchParams<{selectedItemId: string}>()
    const countries = CountryRepository.getInstance().getCountries()
    const onCountrySelected = (countryId: string) => {
        const selectedCountry = countries.find((country) => country.code === countryId)
        if (selectedCountry) {
            DeviceEventEmitter.emit('onCallingCodeSelected', selectedCountry.code)
        }
    }
    return (
        <ListPickerScreen
            title="Select your country"
            items={CallingCodeListPikerViewModelMapper.map(countries)}
            selectedItemId={selectedItemId}
            onItemSelected={onCountrySelected}
            displaySearch={true}
            presentationType="modal"
        />
    )
}


export default PhoneCodeModal
