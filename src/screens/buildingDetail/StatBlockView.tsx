import React, { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Typography } from "../../styles";
import { small } from "../../styles/spacing";
import { StatBlockViewModel } from "./StatBlockViewModel";

type Props = Readonly<{
  viewModel: StatBlockViewModel;
}>;

const StatBlockView: FunctionComponent<Props> = ({ viewModel }) => {
  return (
    <View style={styles.statBlockView}>
      <Text style={styles.stat}>{viewModel.stat} </Text>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{viewModel.title} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stat: {
    ...Typography.headline,
    textAlign: "center",
  },
  statBlockView: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: small,
  },
  title: {
    ...Typography.footnote,
    textAlign: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default StatBlockView;
