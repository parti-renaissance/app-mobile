import {
  TimelineFeedBase,
  TimelineFeedItem,
  TimelineFeedItemActionCampaign,
  TimelineFeedItemEvent,
  TimelineFeedItemNews,
  TimelineFeedItemRetaliation,
} from "../../core/entities/TimelineFeedItem";
import { ErrorMonitor } from "../../utils/ErrorMonitor";
import { RestTimelineFeedItem } from "../restObjects/RestTimelineFeedResponse";
import { RetaliationSiteTypeMapper } from "./RetaliationSiteTypeMapper";

const mapNullToUndefined = <T, U>(input: T | null, transform: (input: T) => U): U | undefined => {
  return input === null ? undefined : transform(input);
};

const id = <T>(input: T): T => input;
const dateParser = (input: string): Date => new Date(input);

const mapBase = (restItem: RestTimelineFeedItem): TimelineFeedBase => {
  return {
    uuid: restItem.objectID,
    title: restItem.title,
    description: restItem.description,
    date: dateParser(restItem.date),
  };
};

const logWarning = (property: keyof RestTimelineFeedItem, item: RestTimelineFeedItem) => {
  ErrorMonitor.log(`[TimelineFeed] Critical, missing property ${property} for item ${item.type}`, {
    item,
  });
};

const mapNews = (restItem: RestTimelineFeedItem): TimelineFeedItem | undefined => {
  const value: TimelineFeedItemNews = {
    ...mapBase(restItem),
    author: mapNullToUndefined(restItem.author, id),
    isLocal: restItem.is_local ?? false,
  };
  return {
    type: "news",
    value,
  };
};

const mapEvent = (restItem: RestTimelineFeedItem): TimelineFeedItem | undefined => {
  if (restItem.begin_at === null) {
    logWarning("begin_at", restItem);
    return undefined;
  }
  if (restItem.finish_at === null) {
    logWarning("finish_at", restItem);
    return undefined;
  }
  const value: TimelineFeedItemEvent = {
    ...mapBase(restItem),
    beginAt: dateParser(restItem.begin_at),
    finishAt: dateParser(restItem.finish_at),
    imageUri: mapNullToUndefined(restItem.image, id),
    address: mapNullToUndefined(restItem.address, id),
    category: mapNullToUndefined(restItem.category, id),
  };
  return {
    type: "event",
    value,
  };
};

const mapRetaliation = (restItem: RestTimelineFeedItem): TimelineFeedItem | undefined => {
  if (restItem.url === null) {
    logWarning("url", restItem);
    return undefined;
  }
  const value: TimelineFeedItemRetaliation = {
    ...mapBase(restItem),
    mediaType: RetaliationSiteTypeMapper.map(restItem.media_type),
    url: restItem.url,
  };
  return {
    type: "retaliation",
    value,
  };
};

const mapActionCampaign = (
  restItem: RestTimelineFeedItem,
): TimelineFeedItemActionCampaign | undefined => {
  return {
    ...mapBase(restItem),
    imageUri: mapNullToUndefined(restItem.image, id),
  };
};

const mapSurvey = (restItem: RestTimelineFeedItem): TimelineFeedItem | undefined => {
  const value = mapActionCampaign(restItem);
  return value !== undefined ? { type: "survey", value } : undefined;
};

const mapPhoning = (restItem: RestTimelineFeedItem): TimelineFeedItem | undefined => {
  const value = mapActionCampaign(restItem);
  return value !== undefined ? { type: "phoning", value } : undefined;
};

const mapDoorToDoor = (restItem: RestTimelineFeedItem): TimelineFeedItem | undefined => {
  const value = mapActionCampaign(restItem);
  return value !== undefined ? { type: "doorToDoor", value } : undefined;
};

export const TimelineFeedItemMapper = {
  map: (restItem: RestTimelineFeedItem): TimelineFeedItem | undefined => {
    switch (restItem.type) {
      case "news":
        return mapNews(restItem);
      case "event":
        return mapEvent(restItem);
      case "riposte":
        return mapRetaliation(restItem);
      case "survey":
        return mapSurvey(restItem);
      case "pap-campaign":
        return mapDoorToDoor(restItem);
      case "phoning-campaign":
        return mapPhoning(restItem);
    }
  },
};
