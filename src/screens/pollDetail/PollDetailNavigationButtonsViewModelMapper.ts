import i18n from "../../utils/i18n";
import { PollDetailNavigationButtonsViewModel } from "./PollDetailNavigationButtonsViewModel";

export const PollDetailNavigationButtonsViewModelMapper = {
  map: (
    isPreviousStepAvailable: boolean,
    isNextStepAvailable: boolean,
    isDataComplete: boolean,
  ): PollDetailNavigationButtonsViewModel => {
    return {
      displayPrevious: isPreviousStepAvailable,
      mainButton: {
        title: isNextStepAvailable
          ? i18n.t("polldetail.next")
          : i18n.t("polldetail.user_form.submit"),
        type: isNextStepAvailable ? "next" : "submit",
        isEnabled: isDataComplete,
      },
    };
  },
};
