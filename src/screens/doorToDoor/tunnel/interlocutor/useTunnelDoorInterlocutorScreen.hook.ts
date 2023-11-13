import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { DoorToDoorPollConfigResponseStatus } from "../../../../core/entities/DoorToDoorPollConfig";
import {
  INTERLOCUTOR_ACCEPT_TO_ANSWER_CODE,
  SendDoorPollAnswersInteractor,
} from "../../../../core/interactor/SendDoorPollAnswersInteractor";
import DoorToDoorRepository from "../../../../data/DoorToDoorRepository";
import { DoorToDoorTunnelModalNavigatorScreenProps } from "../../../../navigation/doorToDoorTunnelModal/DoorToDoorTunnelModalNavigatorScreenProps";
import { AlertUtils } from "../../../shared/AlertUtils";
import { ViewState } from "../../../shared/ViewState";
import { ViewStateUtils } from "../../../shared/ViewStateUtils";
import { BuildingSelectedNavigationParams } from "../BuildingSelectedNavigationParams";
import { useDoorToDoorTunnelNavigationOptions } from "../useDoorToDoorTunnelNavigationOptions.hook";
import { TunnelDoorInterlocutorChoiceCardViewModel } from "./TunnelDoorInterlocutorChoiceCardViewModel";
import { TunnelDoorInterlocutorChoiceCardViewModelMapper } from "./TunnelDoorInterlocutorChoiceCardViewModelMapper";

export const useTunnelDoorInterlocutorScreen = (
  campaignId: string,
  buildingParams: BuildingSelectedNavigationParams,
  visitStartDateISOString: string,
): {
  statefulState: ViewState<TunnelDoorInterlocutorChoiceCardViewModel[]>;
  isSendingChoice: boolean;
  onChoice: (statusId: string) => void;
} => {
  const navigation =
    useNavigation<
      DoorToDoorTunnelModalNavigatorScreenProps<"TunnelDoorInterlocutor">["navigation"]
    >();

  const [statefulState, setStatefulState] = useState<
    ViewState<Array<DoorToDoorPollConfigResponseStatus>>
  >(ViewState.Loading());
  const [isSendingChoice, setIsSendingChoice] = useState(false);

  useDoorToDoorTunnelNavigationOptions(navigation);

  useEffect(() => {
    const fetchData = () => {
      DoorToDoorRepository.getInstance()
        .getDoorToDoorPollConfig(campaignId)
        .then((result) => {
          setStatefulState(ViewState.Content(result.before.responseStatus));
        })
        .catch((error) => setStatefulState(ViewStateUtils.networkError(error, fetchData)));
    };
    fetchData();
  }, [campaignId]);

  const navigateToPoll = (code: string) => {
    navigation.navigate("TunnelDoorPoll", {
      campaignId,
      buildingParams,
      interlocutorStatus: code,
      visitStartDateISOString,
    });
  };

  const sendStatus = (code: string) => {
    setIsSendingChoice(true);
    new SendDoorPollAnswersInteractor()
      .execute({
        campaignId,
        doorStatus: code,
        buildingParams,
        visitStartDateISOString,
      })
      .then(() => {
        switch (buildingParams.type) {
          case "house": {
            navigation.getParent()?.goBack();
            break;
          }
          case "building": {
            navigation.navigate("TunnelDoorSelection", {
              campaignId: campaignId,
              buildingParams: {
                ...buildingParams,
                door: buildingParams.door + 1,
              },
              canCloseFloor: true,
            });
            break;
          }
        }
      })
      .catch((error) =>
        AlertUtils.showNetworkAlert(error, () => {
          onChoice(code);
        }),
      )
      .finally(() => setIsSendingChoice(false));
  };

  const onChoice = (statusId: string) => {
    const status = (ViewState.unwrap(statefulState) ?? []).find((s) => s.code === statusId);
    if (status === undefined) {
      return;
    }
    if (status.code === INTERLOCUTOR_ACCEPT_TO_ANSWER_CODE) {
      navigateToPoll(status.code);
    } else {
      sendStatus(status.code);
    }
  };

  return {
    statefulState: ViewState.map(statefulState, (statuses) => {
      return statuses.map(TunnelDoorInterlocutorChoiceCardViewModelMapper.map);
    }),
    isSendingChoice,
    onChoice,
  };
};
