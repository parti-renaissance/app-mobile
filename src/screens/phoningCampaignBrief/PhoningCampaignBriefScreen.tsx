import React, { FunctionComponent, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import Markdown from "@ronradtke/react-native-markdown-display";
import { ActionsNavigatorScreenProps } from "../../navigation/actions/ActionsNavigatorScreenProps";
import { Colors, Spacing, Styles, Typography } from "../../styles";
import i18n from "../../utils/i18n";
import { BorderlessButton, PrimaryButton } from "../shared/Buttons";

type PhoningCampaignBriefScreenProps = ActionsNavigatorScreenProps<"PhoningCampaignBrief">;

const PhoningCampaignBriefScreen: FunctionComponent<PhoningCampaignBriefScreenProps> = ({
  navigation,
  route,
}) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.data.title,
    });
  }, [navigation, route.params.data.title]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.markdownContainer}>
        <Markdown style={Typography.markdownStyle} mergeStyle={false}>
          {route.params.data.brief}
        </Markdown>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t("phoning.brief.call")}
          onPress={() =>
            navigation.navigate("PhoningSessionModal", {
              screen: "PhoningSessionLoader",
              params: {
                campaignId: route.params.data.id,
                campaignTitle: route.params.data.title,
                device: "current",
              },
            })
          }
        />
        <BorderlessButton
          title={i18n.t("phoning.brief.call_from_other_device")}
          textStyle={styles.linkText}
          onPress={() =>
            navigation.navigate("PhoningSessionModal", {
              screen: "PhoningSessionLoader",
              params: {
                campaignId: route.params.data.id,
                campaignTitle: route.params.data.title,
                device: "external",
              },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    ...Styles.topElevatedContainerStyle,
    backgroundColor: Colors.defaultBackground,
    paddingHorizontal: Spacing.margin,
    paddingTop: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  markdownContainer: {
    padding: Spacing.margin,
  },
  linkText: {
    ...Styles.seeMoreButtonTextStyle,
  },
});

export default PhoningCampaignBriefScreen;
