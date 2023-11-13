import { ImageSourcePropType } from "react-native";
import { RetaliationSiteType } from "../../core/entities/Retaliation";

export const RetaliationSocialIconImageMapper = {
  map: (site: RetaliationSiteType): ImageSourcePropType => {
    switch (site) {
      case "facebook":
        return require("../../assets/images/facebook.png");
      case "twitter":
        return require("../../assets/images/twitter.png");
      case "others":
        return require("../../assets/images/otherSocialNetwork.png");
    }
  },
};
