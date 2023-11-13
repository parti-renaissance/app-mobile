import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography } from "../../../styles";
import i18n from "../../../utils/i18n";
import { TouchablePlatform } from "../../shared/TouchablePlatform";
import { Tab } from "./Ranking";

type Props = Readonly<{
  tab: Tab;
  onPress: (tab: Tab) => void;
}>;

export const RankingTabsView: FC<Props> = (props) => {
  return (
    <View style={styles.tabbarContainer}>
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        onPress={() => props.onPress(Tab.INDIVIDUAL)}
      >
        <View style={props.tab === Tab.INDIVIDUAL ? styles.selectedTab : styles.tab}>
          <Text style={props.tab === Tab.INDIVIDUAL ? styles.selectedTabText : styles.tabText}>
            {i18n.t("doorToDoor.ranking.tabs.individual")}
          </Text>
        </View>
      </TouchablePlatform>
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        onPress={() => props.onPress(Tab.DEPARTMENTAL)}
      >
        <View style={props.tab === Tab.DEPARTMENTAL ? styles.selectedTab : styles.tab}>
          <Text style={props.tab === Tab.DEPARTMENTAL ? styles.selectedTabText : styles.tabText}>
            {i18n.t("doorToDoor.ranking.tabs.departmental")}
          </Text>
        </View>
      </TouchablePlatform>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedTab: {
    borderBottomWidth: 2,
    borderColor: Colors.accent,
    margin: Spacing.margin,
    textAlign: "center",
  },
  selectedTabText: {
    ...Typography.headline,
  },
  tab: {
    margin: Spacing.margin,
    textAlign: "center",
  },
  tabText: {
    ...Typography.thinHeadline,
  },
  tabbarContainer: {
    ...Typography.callout,
    flexDirection: "row",
    justifyContent: "center",
  },
});
