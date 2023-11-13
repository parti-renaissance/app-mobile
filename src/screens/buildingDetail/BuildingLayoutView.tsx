import React, { FunctionComponent } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { DoorToDoorAddressStatus } from "../../core/entities/DoorToDoor";
import { Colors, Spacing, Typography } from "../../styles";
import { margin, unit } from "../../styles/spacing";
import i18n from "../../utils/i18n";
import { BorderlessButton, PrimaryButton } from "../shared/Buttons";
import CardView from "../shared/CardView";
import { TouchablePlatform } from "../shared/TouchablePlatform";
import BuildingLayoutBlockCardView, {
  BuildingLayoutBlockCardViewModel,
} from "./BuildingLayoutBlockCardView";

export interface BuildingLayoutViewModel {
  buildings: BuildingLayoutBlockCardViewModel[];
  buildingStatus: DoorToDoorAddressStatus;
}

type Props = Readonly<{
  viewModel: BuildingLayoutViewModel;
  onSelect: (buildingBlock: string, floor: number) => void;
  onAddBuildingBlock: () => void;
  onAddBuildingFloor: (buildingBlockId: string) => void;
  onRemoveBuildingBlock: (buildingBlockId: string) => void;
  onRemoveBuildingFloor: (buildingBlockId: string, floor: number) => void;
  onBuildingAction: (buildingBlockId: string) => void;
  onOpenAddress: () => void;
  onCloseAddress: () => void;
}>;

const BuildingLayoutView: FunctionComponent<Props> = ({
  viewModel,
  onSelect,
  onAddBuildingBlock,
  onAddBuildingFloor,
  onRemoveBuildingBlock,
  onRemoveBuildingFloor,
  onBuildingAction,
  onOpenAddress,
  onCloseAddress,
}) => {
  return (
    <View style={styles.container}>
      {viewModel.buildings.map((buildingViewModel) => {
        return (
          <BuildingLayoutBlockCardView
            key={buildingViewModel.id}
            viewModel={buildingViewModel}
            style={styles.blockCard}
            onSelect={onSelect}
            onAddBuildingFloor={onAddBuildingFloor}
            onRemoveBuildingBlock={onRemoveBuildingBlock}
            onRemoveBuildingFloor={onRemoveBuildingFloor}
            onBuildingAction={onBuildingAction}
          />
        );
      })}
      {viewModel.buildingStatus === "completed" ? (
        <BorderlessButton
          textStyle={styles.openAddress}
          title={i18n.t("building.open_address.action")}
          onPress={onOpenAddress}
        />
      ) : (
        <>
          <AddBuildingCard onAddBuildingBlock={onAddBuildingBlock} />
          <PrimaryButton
            style={styles.closeAddress}
            onPress={onCloseAddress}
            title={i18n.t("building.close_address.action")}
            disabled={viewModel.buildings.some((block) => block.status !== "completed")}
          />
        </>
      )}
    </View>
  );
};

type AddBuildingCardProps = Readonly<{
  onAddBuildingBlock: () => void;
}>;

const AddBuildingCard: FunctionComponent<AddBuildingCardProps> = ({ onAddBuildingBlock }) => {
  return (
    <CardView backgroundColor={Colors.defaultBackground} style={styles.newBuildingCard}>
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        onPress={() => onAddBuildingBlock()}
      >
        <View style={styles.newBuildingContainer}>
          <Image
            source={require("../../assets/images/iconMore.png")}
            style={styles.newBuildingIcon}
          />
          <Text style={styles.newBuildingText}>{i18n.t("building.layout.add_building")}</Text>
        </View>
      </TouchablePlatform>
    </CardView>
  );
};

const styles = StyleSheet.create({
  blockCard: {
    marginVertical: unit,
  },
  closeAddress: {
    marginVertical: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    paddingBottom: 96,
    paddingHorizontal: margin,
  },
  newBuildingCard: {
    marginVertical: Spacing.unit,
  },
  newBuildingContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: Spacing.margin,
  },
  newBuildingIcon: {
    marginHorizontal: Spacing.unit,
    tintColor: Colors.primaryColor,
  },
  newBuildingText: {
    ...Typography.callout,
    color: Colors.primaryColor,
  },
  openAddress: {
    ...Typography.callout,
    color: Colors.primaryColor,
  },
});

export default BuildingLayoutView;
