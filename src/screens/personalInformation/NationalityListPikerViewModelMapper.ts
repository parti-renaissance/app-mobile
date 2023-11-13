import { Country } from "../../core/entities/Country";
import { DisplayNameFormatter } from "../../utils/DisplayNameFormatter";
import { ListPickerItem } from "../listPicker/ListPickerItem";

export const NationalityListPikerViewModelMapper = {
  map: (countries: Country[]): ListPickerItem[] => {
    return countries
      .map((country) => {
        return {
          id: country.code,
          value: DisplayNameFormatter.formatRegion(country.code),
        };
      })
      .sort((a, b) => {
        return a.value.localeCompare(b.value);
      });
  },
};
