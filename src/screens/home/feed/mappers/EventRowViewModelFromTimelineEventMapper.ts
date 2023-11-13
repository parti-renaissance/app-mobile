import { TimelineFeedItemEvent } from "../../../../core/entities/TimelineFeedItem";
import { DateFormatter } from "../../../../utils/DateFormatter";
import i18n from "../../../../utils/i18n";
import { EventRowViewModel } from "../../../events/EventViewModel";

export const EventRowViewModelFromTimelineEventMapper = {
  map: (item: TimelineFeedItemEvent): EventRowViewModel => {
    const isOnline = item.address === undefined;

    return {
      id: item.uuid,
      title: item.title,
      isOnline: isOnline,
      formattedAddress: !isOnline ? item.address ?? "" : i18n.t("eventdetails.online_event"),
      addressIcon: !isOnline
        ? require("../../../../assets/images/eventAddressIcon.png")
        : require("../../../../assets/images/eventOnlineIcon.png"),
      imageUrl: item.imageUri,
      tag: item.category ?? "",
      isSubscribed: false,
      day: DateFormatter.format(item.beginAt, i18n.t("events.event_date_format")),
      hour: i18n.t("events.duration_formation", {
        start: DateFormatter.format(item.beginAt, HOUR_MINUTE_FORMAT),
        end: DateFormatter.format(item.finishAt, HOUR_MINUTE_FORMAT),
      }),
      dateTimestamp: item.beginAt?.getTime() ?? 0,
    };
  },
};

const HOUR_MINUTE_FORMAT = "HH:mm";
