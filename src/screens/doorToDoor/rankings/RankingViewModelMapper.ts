import { DoorToDoorCampaignRanking } from "../../../core/entities/DoorToDoorCampaignRanking";
import { RankingRowViewModel, Tab } from "./Ranking";

export const RankingViewModelMapper = {
  map: (ranking: DoorToDoorCampaignRanking | undefined, tab: Tab): Array<RankingRowViewModel> => {
    const toMap = tab === Tab.INDIVIDUAL ? ranking?.individual ?? [] : ranking?.departemental ?? [];
    return toMap.map((item) => {
      return {
        rank: item.rank.toString(),
        name: item.name,
        doorKnocked: item.visitedDoors.toString(),
        pollsCompleted: item.surveys.toString(),
        position: item.rank,
        highlight: item.current,
      };
    });
  },
};
