import { PhoningCampaignScore } from "../../core/entities/PhoningCampaign";
import i18n from "../../utils/i18n";
import { PhoningScoreboardViewModel } from "../shared/PhoningCampaignRankingView";

export const PhoningScoreboardRowViewModelMapper = {
  map: (scores: Array<PhoningCampaignScore>): PhoningScoreboardViewModel => {
    return {
      rows: scores.map((item) => {
        return {
          id: `${item.position}_${item.firstName}_${item.calls}_${item.surveys}`,
          name: i18n.t("phoning.scoreboard.name", {
            position: item.position,
            name: item.firstName,
          }),
          position: item.position,
          caller: item.caller,
          calls: item.calls,
          surveys: item.surveys,
        };
      }),
    };
  },
};
