import React, { FunctionComponent } from "react";
import { Colors } from "../../../styles";
import i18n from "../../../utils/i18n";
import {
  HomeFeedActionCampaignCard,
  HomeFeedActionCampaignCardViewModel,
} from "./HomeFeedActionCampaignCard";
import { HomeFeedTimelineItem } from "./HomeFeedTimelineItem";

type Props = Readonly<{
  viewModel: HomeFeedActionCampaignCardViewModel;
  onPhoningCampaignSelected: (campaignId: string) => void;
}>;

export const HomeFeedPhoningCampaignRow: FunctionComponent<Props> = ({
  viewModel,
  onPhoningCampaignSelected,
}) => {
  return (
    <HomeFeedTimelineItem
      title={i18n.t("home.feed.phoningCampaigns")}
      imageSource={require("../../../assets/images/homeFeedActionIcon.png")}
      tintColor={Colors.homeFeedActionBackground}
    >
      <HomeFeedActionCampaignCard
        viewModel={viewModel}
        icon={require("../../../assets/images/homeFeedPhoningIcon.png")}
        onPress={() => onPhoningCampaignSelected(viewModel.id)}
      />
    </HomeFeedTimelineItem>
  );
};
