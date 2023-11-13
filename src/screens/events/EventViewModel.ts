import { ImageSourcePropType } from "react-native";

export type EventSectionViewModel = {
  id: string;
  sectionViewModel?: EventSectionRowViewModel;
  data: Array<EventRowContainerViewModel>;
};

export interface EventSectionRowViewModel {
  sectionName: string;
}

export type EventRowContainerViewModel =
  | {
      type: "grouped";
      value: EventGroupedRowContainerViewModel;
    }
  | {
      type: "event";
      value: EventRowViewModel;
    };

export interface EventGroupedRowContainerViewModel {
  events: Array<EventRowViewModel>;
}

export interface EventRowViewModel {
  id: string;
  title: string;
  isOnline: boolean;
  formattedAddress: string;
  addressIcon: ImageSourcePropType;
  tag: string;
  imageUrl?: string;
  isSubscribed: boolean;
  day: string;
  hour: string;
  dateTimestamp: number;
}
