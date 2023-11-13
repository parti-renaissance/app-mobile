import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { Spacing } from "../../styles";
import QuestionChoiceRow from "../pollDetail/QuestionChoiceRow";
import { QuestionDualChoiceRowViewModel } from "./QuestionDualChoiceRowViewModel";

type Props = Readonly<{
  viewModel: QuestionDualChoiceRowViewModel;
  onPress?: (choiceId: string) => void;
}>;

const QuestionDualChoiceRow: FunctionComponent<Props> = ({ viewModel, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <QuestionChoiceRow
          style={styles.left}
          viewModel={viewModel.first}
          onPress={() => {
            onPress?.(viewModel.first.id);
          }}
        />
        <QuestionChoiceRow
          viewModel={viewModel.second}
          onPress={() => {
            onPress?.(viewModel.second.id);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  left: {
    marginRight: Spacing.margin,
  },
  row: {
    flexDirection: "row",
  },
});

export default QuestionDualChoiceRow;
