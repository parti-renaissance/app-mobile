import { ImageSourcePropType } from "react-native";
import { BuildingLayoutViewModel } from "./BuildingLayoutView";
import { BuildingStatusViewModel } from "./BuildingStatusViewModel";
import { BuildingHistoryViewModel } from "./BuildingVisitsHistoryViewModel";

export interface BuildingDetailScreenViewModel {
  address: string;
  lastVisit: string;
  illustration: ImageSourcePropType;
  status: BuildingStatusViewModel;
  history: BuildingHistoryViewModel;
  buildingLayout: BuildingLayoutViewModel;
  campaignId: string;
}
