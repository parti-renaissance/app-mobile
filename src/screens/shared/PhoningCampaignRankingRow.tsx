import React, { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing } from "../../styles";

export interface PhoningScoreboardRowViewModel {
  id: string;
  name: string;
  calls: string;
  surveys: string;
  position: number;
  caller: boolean;
}

type Props = Readonly<{
  viewModel: PhoningScoreboardRowViewModel;
}>;

export const PhoningCampaignRankingRow: FunctionComponent<Props> = ({ viewModel }) => {
  const rowStyle =
    viewModel.position % 2 === 0 ? [styles.row, styles.rowEven] : [styles.row, styles.rowOdd];
  const callerStyle = viewModel.caller ? styles.highlightedText : undefined;
  return (
    <View style={rowStyle}>
      <Text style={[styles.cellLarge, callerStyle]}>{viewModel.name}</Text>
      <Text style={[styles.cell, callerStyle]}>{viewModel.calls}</Text>
      <Text style={[styles.cell, callerStyle]}>{viewModel.surveys}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  cellLarge: {
    flex: 2,
  },
  highlightedText: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    paddingStart: Spacing.margin,
    paddingVertical: Spacing.margin,
  },
  rowEven: {
    backgroundColor: Colors.defaultBackground,
  },
  rowOdd: {
    backgroundColor: Colors.lightBackground,
  },
});
