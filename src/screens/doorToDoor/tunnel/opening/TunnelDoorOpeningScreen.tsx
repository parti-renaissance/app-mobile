import React, { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { DoorToDoorTunnelModalNavigatorScreenProps } from "../../../../navigation/doorToDoorTunnelModal/DoorToDoorTunnelModalNavigatorScreenProps";
import { Colors, Spacing, Typography } from "../../../../styles";
import i18n from "../../../../utils/i18n";
import LoadingOverlay from "../../../shared/LoadingOverlay";
import { StatefulView } from "../../../shared/StatefulView";
import { TunnelDoorOpeningChoiceCard } from "./TunnelDoorOpeningChoiceCard";
import { TunnelDoorOpeningChoiceCardViewModel } from "./TunnelDoorOpeningChoiceCardViewModel";
import { useTunnelDoorOpeningScreen } from "./useTunnelDoorOpeningScreen.hook";

type DoorToDoorTunnelOpeningScreenProps =
  DoorToDoorTunnelModalNavigatorScreenProps<"TunnelDoorOpening">;

const TunnelDoorOpeningScreen: FunctionComponent<DoorToDoorTunnelOpeningScreenProps> = ({
  route,
}) => {
  const { statefulState, isSendingChoice, onStatusSelected } = useTunnelDoorOpeningScreen(
    route.params.campaignId,
    route.params.buildingParams,
  );

  const ContentComponent = (viewModels: TunnelDoorOpeningChoiceCardViewModel[]) => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{i18n.t("doorToDoor.tunnel.opening.title")}</Text>
        {viewModels.map((viewModel) => {
          return (
            <TunnelDoorOpeningChoiceCard
              key={viewModel.id}
              style={styles.card}
              viewModel={viewModel}
              onPress={() => onStatusSelected(viewModel.id)}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay visible={isSendingChoice} />
      <StatefulView state={statefulState} contentComponent={ContentComponent} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: Spacing.margin,
  },
  title: {
    ...Typography.title3,
    marginBottom: Spacing.margin,
  },
  card: {
    flex: 1,
  },
});

export default TunnelDoorOpeningScreen;
