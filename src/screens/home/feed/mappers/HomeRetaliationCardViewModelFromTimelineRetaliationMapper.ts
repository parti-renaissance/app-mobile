import { TimelineFeedItemRetaliation } from "../../../../core/entities/TimelineFeedItem";
import { RetaliationListCardViewModel } from "../../../retaliations/RetaliationListCardViewModel";
import { RetaliationSocialIconImageMapper } from "../../../retaliations/RetaliationSocialIconImageMapper";

export const HomeRetaliationCardViewModelFromTimelineRetaliationMapper = {
  map: (item: TimelineFeedItemRetaliation): RetaliationListCardViewModel => {
    return {
      id: item.uuid,
      title: item.title,
      body: item.description,
      url: item.url,
      socialIcon: RetaliationSocialIconImageMapper.map(item.mediaType),
    };
  },
};
