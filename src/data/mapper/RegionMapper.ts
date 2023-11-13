import { Region } from "../../core/entities/Region";
import { RestRegion } from "../restObjects/RestRegion";
import { CampaignMapper } from "./CampaignMapper";

export const RegionMapper = {
  map: (restRegion: RestRegion): Region => {
    return {
      id: restRegion.uuid,
      name: restRegion.name,
      code: restRegion.code,
      campaign: restRegion.campaign ? CampaignMapper.map(restRegion.campaign) : null,
    };
  },
};
