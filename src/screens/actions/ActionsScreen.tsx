import React, { FunctionComponent } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { ActionsNavigatorScreenProps } from "../../navigation/actions/ActionsNavigatorScreenProps";
import { Colors, Spacing, Typography } from "../../styles";
import i18n from "../../utils/i18n";
import { StatefulView } from "../shared/StatefulView";
import { ActionRow } from "./ActionRow";
import { ActionRowViewModel } from "./ActionRowViewModel";
import { useActionsScreen } from "./useActionsScreen.hook";

type ActionsScreenProps = ActionsNavigatorScreenProps<"Actions">;

const ActionsScreen: FunctionComponent<ActionsScreenProps> = () => {
  const { statefulState, onActionSelected } = useActionsScreen();

  const renderItem = ({ item }: ListRenderItemInfo<ActionRowViewModel>) => {
    return <ActionRow viewModel={item} onPress={onActionSelected} />;
  };

  const ActionContent = (actions: ReadonlyArray<ActionRowViewModel>) => {
    return (
      <FlatList
        data={actions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<Text style={styles.title}>{i18n.t("actions.title")}</Text>}
        contentContainerStyle={styles.contentContainer}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView state={statefulState} contentComponent={ActionContent} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.margin,
    paddingTop: Spacing.largeMargin,
  },
  title: {
    ...Typography.highlightedLargeTitle,
    marginBottom: Spacing.mediumMargin,
  },
});

export default ActionsScreen;
