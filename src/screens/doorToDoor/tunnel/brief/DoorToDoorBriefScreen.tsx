import React, { FunctionComponent, useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Markdown from "@ronradtke/react-native-markdown-display";
import { DoorToDoorTunnelModalNavigatorScreenProps } from "../../../../navigation/doorToDoorTunnelModal/DoorToDoorTunnelModalNavigatorScreenProps";
import { Colors, Spacing, Typography } from "../../../../styles";
import i18n from "../../../../utils/i18n";
import { PrimaryButton } from "../../../shared/Buttons";
import { CloseButton } from "../../../shared/NavigationHeaderButton";
import { StatefulView } from "../../../shared/StatefulView";
import { DoorToDoorBriefViewModel } from "./DoorToDoorBriefViewModel";
import { useDoorToDoorBriefScreen } from "./useDoorToDoorBriefScreen.hook";

type DoorToDoorBriefScreenProps = DoorToDoorTunnelModalNavigatorScreenProps<"TunnelDoorBrief">;

const DoorToDoorBriefScreen: FunctionComponent<DoorToDoorBriefScreenProps> = ({
  navigation,
  route,
}) => {
  const { statefulState, onAction } = useDoorToDoorBriefScreen(
    route.params.campaignId,
    route.params.buildingParams,
    route.params.canCloseFloor,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
    });
  }, [navigation]);

  const TutorialContent = (viewModel: DoorToDoorBriefViewModel) => {
    return (
      <>
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.title}>{i18n.t("doorToDoor.tunnel.door.tutorial.title")}</Text>
          <Markdown style={Typography.markdownStyle} mergeStyle={false}>
            {viewModel.markdown}
          </Markdown>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <PrimaryButton
            title={i18n.t("doorToDoor.tunnel.door.tutorial.action")}
            onPress={onAction}
          />
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <StatefulView contentComponent={TutorialContent} state={statefulState} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: Colors.defaultBackground,
    paddingHorizontal: Spacing.margin,
    padding: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.margin,
  },
  title: {
    ...Typography.largeTitle,
  },
});

export default DoorToDoorBriefScreen;
