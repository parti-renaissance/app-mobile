export interface RestTimelineFeedItem {
  objectID: string;
  type: "news" | "event" | "phoning-campaign" | "pap-campaign" | "survey" | "riposte";
  title: string;
  description: string;
  author: string | null;
  date: string;
  begin_at: string | null;
  finish_at: string | null;
  image: string | null;
  address: string | null;
  category: string | null;
  is_local: boolean | null;
  media_type: string | null;
  url: string | null;
}

export interface RestTimelineFeedResponse {
  hits: Array<RestTimelineFeedItem>;
  page: number;
  nbHits: number;
  nbPages: number;
  hitsPerPage: number;
  params: string;
}
