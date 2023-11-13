import { Country } from "../../core/entities/Country";
import { DisplayNameFormatter } from "../../utils/DisplayNameFormatter";
import i18n from "../../utils/i18n";
import { ListPickerItem } from "../listPicker/ListPickerItem";

export const CallingCodeListPikerViewModelMapper = {
  map: (countries: Country[]): ListPickerItem[] => {
    return countries
      .map((country) => {
        return {
          id: country.code,
          value: i18n.t("personalinformation.calling_code_format", {
            country: DisplayNameFormatter.formatRegion(country.code),
            callingCode: country.callingCode,
          }),
        };
      })
      .sort((a, b) => {
        return a.value.localeCompare(b.value);
      });
  },
};
