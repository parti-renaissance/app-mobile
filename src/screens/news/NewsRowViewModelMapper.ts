import { News } from "../../core/entities/News";
import { DateFormatter } from "../../utils/DateFormatter";
import i18n from "../../utils/i18n";
import { NewsRowViewModel } from "./NewsRowViewModel";

const mapTag = (visibility: News["visibility"]) => {
  switch (visibility) {
    case "local":
      return i18n.t("news.tag.local");
    case "national":
      return i18n.t("news.tag.national");
  }
};

const mapAuthor = (news: News): string | undefined => {
  // We don't display the author if the news is national
  const author = news.visibility === "local" ? news.creator : undefined;
  if (author === undefined) {
    return undefined;
  }
  return i18n.t("news.author_format", { author });
};

export const NewsRowViewModelMapper = {
  map: (news: News): NewsRowViewModel => {
    return {
      id: news.id,
      tag: mapTag(news.visibility),
      title: news.title,
      author: mapAuthor(news),
      date: i18n.t("home.news.date_format", {
        date: DateFormatter.format(news.date, i18n.t("home.news.date_pattern")),
      }),
      excerpt: news.description,
    };
  },
};
