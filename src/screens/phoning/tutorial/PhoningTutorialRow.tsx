import React, { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Styles, Typography } from "../../../styles";
import i18n from "../../../utils/i18n";
import { BorderlessButton } from "../../shared/Buttons";

type Props = Readonly<{
  onPress: () => void;
}>;

export interface PhoningTutorialRowViewModel {
  id: string;
}

export const PhoningTutorialRow: FunctionComponent<Props> = ({ onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t("phoning.tutorial.title")}</Text>
        <BorderlessButton
          title={i18n.t("phoning.tutorial.link")}
          textStyle={styles.linkText}
          style={styles.linkButton}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.lightBackground,
    borderRadius: 8,
    marginBottom: Spacing.unit,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    paddingRight: 8 * Spacing.unit,
  },
  linkButton: {
    alignSelf: "flex-start",
    flexShrink: 1,
    textAlign: "left",
  },
  linkText: {
    ...Styles.seeMoreButtonTextStyle,
  },
  title: {
    ...Typography.headline,
    flexShrink: 1,
    padding: Spacing.margin,
    paddingBottom: Spacing.small,
    alignSelf: "flex-start",
  },
});

export default PhoningTutorialRow;
