import { Retaliation } from "../../core/entities/Retaliation";
import { RetaliationSocialIconImageMapper } from "../retaliations/RetaliationSocialIconImageMapper";
import { RetaliationPostCardViewModel } from "./RetaliationPostCardViewModel";

export const RetaliationCardViewModelMapper = {
  map: (retaliation: Retaliation): RetaliationPostCardViewModel => {
    return {
      id: retaliation.id,
      socialIcon: RetaliationSocialIconImageMapper.map(retaliation.openGraph?.site ?? "others"),
      image: retaliation.openGraph?.image ?? "",
      title: retaliation.openGraph?.title ?? "",
      body: retaliation.openGraph?.description ?? "",
    };
  },
};
