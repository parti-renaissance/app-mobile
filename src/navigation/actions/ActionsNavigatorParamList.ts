import { DoorToDoorAddress } from "../../core/entities/DoorToDoor";
import { PhoningCampaignBriefNavigationData } from "../../screens/phoningCampaignBrief/PhoningCampaignBriefNavigationData";
import { PhoningCampaignScoreboardNavigationData } from "../../screens/phoningCampaignScoreboard/PhoningCampaignScoreboardNavigationData";
import { PhoningCharterNavigationData } from "../../screens/phoningCharter/PhoningCharterNavigationData";

export type ActionsNavigatorParamList = {
  Actions: undefined;
  Polls: undefined;
  Phoning: undefined;
  PhoningCharter: { data: PhoningCharterNavigationData };
  PhoningTutorial: undefined;
  PhoningCampaignBrief: { data: PhoningCampaignBriefNavigationData };
  PhoningCampaignScoreboard: { data: PhoningCampaignScoreboardNavigationData };
  DoorToDoor: undefined;
  BuildingDetail: { address: DoorToDoorAddress };
  Retaliations: undefined;
  RetaliationDetail: { retaliationId: string };
};
