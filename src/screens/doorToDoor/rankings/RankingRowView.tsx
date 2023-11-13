import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography } from "../../../styles";
import { RankingRowViewModel } from "./Ranking";

type Props = Readonly<{
  viewModel: RankingRowViewModel;
}>;

export const RankingRowView = ({ viewModel }: Props) => {
  const rowStyle =
    viewModel.position % 2 === 0 ? [styles.row, styles.rowEven] : [styles.row, styles.rowOdd];

  const rowHighlightedStyle = viewModel.highlight ? styles.rowHighlighted : null;
  const textStyle = viewModel.highlight ? styles.textHighlighted : styles.text;

  return (
    <View style={[rowStyle, rowHighlightedStyle]}>
      <Text style={[styles.cell, textStyle]}>{viewModel.rank}</Text>
      <Text style={[styles.cellLarge, textStyle]}>{viewModel.name}</Text>
      <Text style={[styles.cell, textStyle]}>{viewModel.doorKnocked}</Text>
      <Text style={[styles.cellLarge, textStyle]}>{viewModel.pollsCompleted}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    textAlign: "center",
  },
  cellLarge: {
    flex: 2,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    marginHorizontal: Spacing.unit,
    paddingStart: Spacing.margin,
    paddingVertical: Spacing.margin,
  },
  rowEven: {
    backgroundColor: Colors.defaultBackground,
  },
  rowHighlighted: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
  },
  rowOdd: {
    backgroundColor: Colors.lightBackground,
  },
  text: {
    ...Typography.body,
  },
  textHighlighted: {
    ...Typography.callout,
  },
});
