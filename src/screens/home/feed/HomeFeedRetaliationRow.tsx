import React, { FunctionComponent } from "react";
import { Colors } from "../../../styles";
import i18n from "../../../utils/i18n";
import HomeRetaliationCard from "../../retaliations/RetaliationListCard";
import { RetaliationListCardViewModel } from "../../retaliations/RetaliationListCardViewModel";
import { HomeFeedTimelineItem } from "./HomeFeedTimelineItem";

type Props = Readonly<{
  viewModel: RetaliationListCardViewModel;
  onRetaliateSelected: (id: string) => void;
  onRetaliationSelected: (id: string) => void;
}>;

export const HomeFeedRetaliationRow: FunctionComponent<Props> = ({
  viewModel,
  onRetaliateSelected,
  onRetaliationSelected,
}) => {
  return (
    <HomeFeedTimelineItem
      title={i18n.t("home.feed.retaliation")}
      imageSource={require("../../../assets/images/homeFeedActionIcon.png")}
      tintColor={Colors.homeFeedActionBackground}
    >
      <HomeRetaliationCard
        viewModel={viewModel}
        onRetaliateSelected={onRetaliateSelected}
        onRetaliationSelected={onRetaliationSelected}
      />
    </HomeFeedTimelineItem>
  );
};
