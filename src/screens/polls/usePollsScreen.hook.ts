import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Poll } from "../../core/entities/Poll";
import { ServerTimeoutError } from "../../core/errors";
import { GetPollsInteractor } from "../../core/interactor/GetPollsInteractor";
import { ActionsNavigatorScreenProps } from "../../navigation/actions/ActionsNavigatorScreenProps";
import { ViewState } from "../shared/ViewState";
import { ViewStateUtils } from "../shared/ViewStateUtils";
import { PollsScreenViewModel } from "./PollsScreenViewModel";
import { PollsScreenViewModelMapper } from "./PollsScreenViewModelMapper";

export const usePollsScreen = (): {
  statefulState: ViewState<PollsScreenViewModel>;
  isRefreshing: boolean;
  onPollSelected: (pollId: string) => void;
  onRefresh: () => void;
} => {
  const [statefulState, setStatefulState] = useState<ViewState<Array<Poll>>>(ViewState.Loading());
  const [isRefreshing, setRefreshing] = useState(true);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const navigation = useNavigation<ActionsNavigatorScreenProps<"Polls">["navigation"]>();

  const fetchData = useCallback((cacheJustLoaded: boolean = false) => {
    setRefreshing(true);
    return new GetPollsInteractor()
      .execute("remote")
      .then((polls) => {
        setStatefulState(ViewState.Content(polls));
      })
      .catch((error) => {
        const isNetworkError = error instanceof ServerTimeoutError;
        if (isNetworkError && cacheJustLoaded) {
          return;
        }
        setStatefulState(
          ViewStateUtils.networkError(error, () => {
            setStatefulState(ViewState.Loading());
            fetchData();
          }),
        );
      })
      .finally(() => setRefreshing(false));
  }, []);

  const firstDataFetch = useCallback(() => {
    new GetPollsInteractor()
      .execute("cache")
      .then((cachedPolls) => {
        setStatefulState(ViewState.Content(cachedPolls));
        if (!initialFetchDone) {
          fetchData(true);
          setInitialFetchDone(true);
        }
      })
      .catch(() => {
        fetchData();
      });
  }, [fetchData, initialFetchDone]);

  useFocusEffect(firstDataFetch);

  const onPollSelected = (pollId: string) => {
    navigation.navigate("PollDetailModal", {
      screen: "PollDetail",
      params: { pollId },
    });
  };

  return {
    statefulState: ViewState.map(statefulState, PollsScreenViewModelMapper.map),
    isRefreshing,
    onPollSelected,
    onRefresh: fetchData,
  };
};
