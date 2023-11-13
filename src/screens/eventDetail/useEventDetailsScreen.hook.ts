import { useCallback, useEffect, useState } from "react";
import { DetailedEvent } from "../../core/entities/Event";
import EventRepository from "../../data/EventRepository";
import { ViewState } from "../shared/ViewState";
import { ViewStateUtils } from "../shared/ViewStateUtils";

export const useEventDetailsScreen = (
  eventId: string,
): {
  statefulState: ViewState<DetailedEvent>;
  onReloadEvent: () => void;
} => {
  const [statefulState, setStatefulState] = useState<ViewState<DetailedEvent>>(ViewState.Loading());

  const fetchData = useCallback(() => {
    setStatefulState(ViewState.Loading());
    EventRepository.getInstance()
      .getEventDetails(eventId)
      .then((detailedEvent) => {
        setStatefulState(ViewState.Content(detailedEvent));
      })
      .catch((error) => {
        setStatefulState(ViewStateUtils.networkError(error, fetchData));
      });
  }, [eventId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchData, []);

  return {
    statefulState,
    onReloadEvent: fetchData,
  };
};
