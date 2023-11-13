import { Address, DetailedProfile, PhoneNumber } from "../../core/entities/DetailedProfile";
import { Profile } from "../../core/entities/Profile";
import i18n from "../../utils/i18n";
import {
  RestDetailedProfileResponse,
  RestPhoneNumber,
  RestPostAddress,
} from "../restObjects/RestDetailedProfileResponse";
import { RestProfileResponse } from "../restObjects/RestProfileResponse";
import { GenderMapper } from "./GenderMapper";

export const ProfileMapper = {
  map: (result: RestProfileResponse): Profile => {
    return {
      firstName: result.first_name,
      lastName: result.last_name,
      email: result.email_address,
      uuid: result.uuid,
      zipCode: result.postal_code,
      totalSurveys: result.surveys.total,
      totalSurveysLastMonth: result.surveys.last_month,
    };
  },
  mapDetailedProfile: (result: RestDetailedProfileResponse): DetailedProfile => {
    return {
      uuid: result.uuid,
      firstName: result.first_name,
      lastName: result.last_name,
      gender: GenderMapper.mapToGender(result.gender),
      customGender: result.custom_gender ?? undefined,
      nationality:
        result.nationality !== null && result.nationality.length > 0
          ? result.nationality
          : i18n.t("personalinformation.default_country_code"),
      birthDate: new Date(result.birthdate),
      address: postAddress(result.post_address),
      email: result.email_address ?? undefined,
      facebook: result.facebook_page_url ?? undefined,
      linkedin: result.linkedin_page_url ?? undefined,
      twitter: result.twitter_page_url ?? undefined,
      telegram: result.telegram_page_url ?? undefined,
      phone: phoneNumber(result.phone),
      interests: result.interests.map((interest) => interest.code),
      subscriptions: result.subscription_types.map((subscription) => subscription.code),
    };
  },
};

const postAddress = (restPostAddress: RestPostAddress | null): Address => {
  return {
    address: restPostAddress?.address ?? undefined,
    postalCode: restPostAddress?.postal_code ?? undefined,
    city: restPostAddress?.city_name ?? undefined,
    country: restPostAddress?.country ?? undefined,
  };
};

const phoneNumber = (restPhoneNumber: RestPhoneNumber | null): PhoneNumber | undefined => {
  if (restPhoneNumber == null) return undefined;
  return {
    countryCode:
      restPhoneNumber.country.length > 0
        ? restPhoneNumber.country
        : i18n.t("personalinformation.default_country_code"),
    number: restPhoneNumber.number,
  };
};
