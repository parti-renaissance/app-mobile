import { Campaign } from "../../core/entities/Campaign";
import { RegionViewModel } from "./RegionViewModel";

export const RegionViewModelMapper = {
  map: (name: string, campaign: Campaign): RegionViewModel => {
    return {
      title: name,
      subtitle: campaign.subtitle,
      text: campaign.description,
      bannerUrl: campaign.banner,
      logoUrl: campaign.logo,
      websiteUrl: campaign.externalLink,
    };
  },
};
