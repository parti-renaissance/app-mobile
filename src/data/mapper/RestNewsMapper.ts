import { News } from "../../core/entities/News";
import { RestNews } from "../restObjects/RestNewsResponse";

const ifNotEmpty = (value: string | null): string | undefined => {
  return value !== null && value.length > 0 ? value : undefined;
};

export const RestNewsMapper = {
  map: (restNews: RestNews): News => {
    return {
      id: restNews.uuid,
      title: restNews.title,
      description: restNews.text,
      date: new Date(restNews.created_at),
      url: ifNotEmpty(restNews.external_link),
      isPinned: restNews.pinned,
      linkLabel: ifNotEmpty(restNews.link_label),
      visibility: restNews.visibility,
      creator: ifNotEmpty(restNews.creator),
    };
  },
};
