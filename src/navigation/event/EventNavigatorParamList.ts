import { EventMode } from "../../core/entities/Event";

export type EventNavigatorParamList = {
  Events: { eventMode?: EventMode } | undefined;
  EventDetails: { eventId: string };
};
