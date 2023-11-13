export interface PollDetailNavigationButtonsViewModel {
  mainButton: {
    type: "submit" | "next";
    title: string;
    isEnabled: boolean;
  };
  displayPrevious: boolean;
}
