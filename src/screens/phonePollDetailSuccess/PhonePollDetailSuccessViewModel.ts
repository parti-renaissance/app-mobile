import { PhoningScoreboardRowViewModel } from "../shared/PhoningCampaignRankingRow";

export interface PhonePollDetailSuccessRowSuccessViewModel {
  isProgressDisplayed: boolean;
  progress: number;
  total: number;
}

export interface PhonePollDetailSuccessRowSuccess {
  type: "successContent";
  viewModel: PhonePollDetailSuccessRowSuccessViewModel;
}

export interface PhonePollDetailSuccessRowRankingHeader {
  type: "rankingHeader";
}

export interface PhonePollDetailSuccessRowRanking {
  type: "rankingRow";
  viewModel: PhoningScoreboardRowViewModel;
}

export type PhonePollDetailSuccessRowType =
  | PhonePollDetailSuccessRowSuccess
  | PhonePollDetailSuccessRowRankingHeader
  | PhonePollDetailSuccessRowRanking;

export interface PhonePollDetailSuccessSection {
  title: string;
  data: Array<PhonePollDetailSuccessRowType>;
}

export interface PhonePollDetailSuccessViewModel {
  sections: Array<PhonePollDetailSuccessSection>;
}
