import { EventMode } from "../../core/entities/Event";
import i18n from "../../utils/i18n";
import { EventQuickFiltersViewModel } from "./EventQuickFiltersViewModel";

export const EventQuickFiltersViewModelMapper = {
  map: (eventMode?: EventMode): EventQuickFiltersViewModel => {
    return {
      sections: [
        {
          id: SECTION_EVENT_TYPE_ID,
          title: i18n.t("events.filters.section_event"),
          data: [
            {
              code: EventMode.ONLINE,
              image: require("../../assets/images/iconOnline.png"),
              label: i18n.t("events.filters.event_online"),
              isSelected: eventMode === EventMode.ONLINE,
            },
            {
              code: EventMode.MEETING,
              image: require("../../assets/images/iconMeeting.png"),
              label: i18n.t("events.filters.event_meeting"),
              isSelected: eventMode === EventMode.MEETING,
            },
          ],
        },
      ],
    };
  },
};

const SECTION_EVENT_TYPE_ID = "event_type";
