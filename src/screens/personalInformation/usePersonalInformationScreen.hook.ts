import { useEffect, useState } from "react";
import { DetailedProfile } from "../../core/entities/DetailedProfile";
import ProfileRepository from "../../data/ProfileRepository";
import { ViewState } from "../shared/ViewState";
import { ViewStateUtils } from "../shared/ViewStateUtils";

export const usePersonalInformationScreen = (): {
  statefulState: ViewState<DetailedProfile>;
} => {
  const [statefulState, setStatefulState] = useState<ViewState<DetailedProfile>>(
    ViewState.Loading(),
  );

  useEffect(() => {
    const fetchData = () => {
      ProfileRepository.getInstance()
        .getDetailedProfile()
        .then((detailedProfile) => {
          setStatefulState(ViewState.Content(detailedProfile));
        })
        .catch((error) => {
          setStatefulState(
            ViewStateUtils.networkError(error, () => {
              setStatefulState(ViewState.Loading());
              fetchData();
            }),
          );
        });
    };

    fetchData();
  }, []);

  return {
    statefulState,
  };
};
