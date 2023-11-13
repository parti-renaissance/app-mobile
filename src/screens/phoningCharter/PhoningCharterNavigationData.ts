import { PhoningCampaignBriefNavigationData } from "../phoningCampaignBrief/PhoningCampaignBriefNavigationData";

export interface PhoningCharterNavigationData {
  id: string;
  charter: string;
  brief: PhoningCampaignBriefNavigationData;
}
