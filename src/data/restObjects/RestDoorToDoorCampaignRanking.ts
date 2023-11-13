export interface RestDoorToDoorCampaignRanking {
  label: string;
  items?: Array<RestDoorToDoorCampaignRankingItem>;
}

export interface RestDoorToDoorCampaignRankingItem {
  rank: number;
  questioner?: string;
  department?: string;
  nb_visited_doors: number;
  nb_surveys: number;
  current: boolean;
}
