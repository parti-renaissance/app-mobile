import { ListPickerScreen } from "@/screens/listPicker/ListPickerScreen";
import { CountryRepository } from "@/data/CountryRepository";
import { DeviceEventEmitter } from "react-native";
import { NationalityListPikerViewModelMapper } from '@/screens/personalInformation/NationalityListPikerViewModelMapper'

import { useLocalSearchParams } from "expo-router";

function PhoneCodeModal () {
    const { selectedItemId } = useLocalSearchParams<{selectedItemId: string}>()
    const countries = CountryRepository.getInstance().getCountries()
    const onCountrySelected = (countryId: string) => {
        const selectedCountry = countries.find((country) => country.code === countryId)
        if (selectedCountry) {
            DeviceEventEmitter.emit('onNationalitySelected', selectedCountry.code)
        }
    }
    return (
        <ListPickerScreen
            title="Select your country"
            items={NationalityListPikerViewModelMapper.map(countries)}
            selectedItemId={selectedItemId}
            onItemSelected={onCountrySelected}
            displaySearch={true}
            presentationType="modal"
        />
    )
}


export default PhoneCodeModal
