import { EventRowViewModel } from "../events/EventViewModel";
import { NewsRowViewModel } from "../news/NewsRowViewModel";
import { RegionViewModel } from "../regions/RegionViewModel";
import { RetaliationListCardViewModel } from "../retaliations/RetaliationListCardViewModel";
import { ViewStateError } from "../shared/ViewState";
import { HomeFeedActionCampaignCardViewModel } from "./feed/HomeFeedActionCampaignCard";
import { HomeQuickPollRowAnswerViewModel } from "./quickPoll/HomeQuickPollRowAnswerViewModel";

export interface HomeSectionRowViewModel {
  sectionName: string;
  isHighlighted: boolean;
}

export interface HomeQuickPollRowContainerViewModel {
  id: string;
  title: string;
  type: "results" | "question";
  leadingAnswerViewModel: HomeQuickPollRowAnswerViewModel;
  trailingAnswerViewModel: HomeQuickPollRowAnswerViewModel;
  totalVotes: string;
}

export interface HomeEventRowContainerViewModel {
  event: EventRowViewModel;
}

export type HomeSectionViewModel = {
  id: string;
  sectionViewModel?: HomeSectionRowViewModel;
  data: Array<HomeRowViewModel>;
};

export type HomeRowViewModel =
  | {
      type: "region";
      value: RegionViewModel;
    }
  | {
      type: "quick_poll";
      value: HomeQuickPollRowContainerViewModel;
    }
  | {
      type: "event";
      value: HomeEventRowContainerViewModel;
    }
  | {
      type: "feedEvent";
      value: EventRowViewModel;
    }
  | {
      type: "feedNews";
      value: NewsRowViewModel;
    }
  | {
      type: "feedPhoningCampaign";
      value: HomeFeedActionCampaignCardViewModel;
    }
  | {
      type: "feedDoorToDoorCampaign";
      value: HomeFeedActionCampaignCardViewModel;
    }
  | {
      type: "feedPoll";
      value: HomeFeedActionCampaignCardViewModel;
    }
  | {
      type: "feedRetaliation";
      value: RetaliationListCardViewModel;
    }
  | {
      type: "error";
      value: ViewStateError;
    };
