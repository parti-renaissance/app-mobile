import { RetaliationSiteType } from "../../core/entities/Retaliation";

export const RetaliationSiteTypeMapper = {
  map: (siteName: string | null): RetaliationSiteType => {
    switch (siteName) {
      case "Facebook":
        return "facebook";
      case "Twitter":
        return "twitter";
      default:
        return "others";
    }
  },
};
