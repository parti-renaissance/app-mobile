import React, { FunctionComponent } from "react";
import { StyleSheet, Text } from "react-native";
import { Colors, Spacing, Typography } from "../../styles";
import { QuestionTextLinkRowViewModel } from "./QuestionTextLinkRowViewModel";

type Props = Readonly<{
  viewModel: QuestionTextLinkRowViewModel;
  onLinkPress?: () => void;
}>;

const QuestionTextLinkRow: FunctionComponent<Props> = ({ viewModel, onLinkPress }) => {
  return (
    <Text style={styles.text}>
      <Text>{viewModel.content}</Text>
      <Text style={styles.link} onPress={onLinkPress}>
        {viewModel.highlightedSuffix}
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    color: Colors.coloredText,
    textDecorationLine: "underline",
  },
  text: {
    ...Typography.body,
    marginBottom: Spacing.margin,
  },
});

export default QuestionTextLinkRow;
