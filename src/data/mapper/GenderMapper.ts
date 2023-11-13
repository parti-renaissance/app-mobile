import { Gender } from "../../core/entities/UserProfile";

export const GenderMapper = {
  mapFromGender: (gender: Gender): string => {
    switch (gender) {
      case Gender.Male:
        return "male";
      case Gender.Female:
        return "female";
      case Gender.Other:
        return "other";
    }
  },
  mapToGender: (gender: string): Gender => {
    switch (gender) {
      case "male":
        return Gender.Male;
      case "female":
        return Gender.Female;
      default:
        return Gender.Other;
    }
  },
};
