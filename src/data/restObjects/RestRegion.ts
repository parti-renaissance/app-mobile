import { RestCampaign } from "./RestCampaign";

export interface RestRegion {
  uuid: string;
  name: string;
  code: string;
  campaign: RestCampaign | null;
}
