import React, { FunctionComponent } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text } from "react-native";
import { Spacing, Typography } from "../../../styles";
import QuestionChoiceRow from "../../pollDetail/QuestionChoiceRow";
import { QuestionChoiceRowViewModel } from "../../pollDetail/QuestionChoiceRowViewModel";
import { SatisfactionQuestionChoiceViewModel } from "./SatisfactionQuestionChoiceViewModel";

type Props = Readonly<{
  viewModel: SatisfactionQuestionChoiceViewModel;
  toggleChoice?: (choiceId: string) => void;
}>;

const SatisfactionQuestionChoice: FunctionComponent<Props> = ({ viewModel, toggleChoice }) => {
  const renderItem = ({ item }: ListRenderItemInfo<QuestionChoiceRowViewModel>) => {
    return <QuestionChoiceRow viewModel={item} onPress={() => toggleChoice?.(item.id)} />;
  };

  const QuestionChoiceHeader = () => {
    return <Text style={styles.callout}>{viewModel.subtitle}</Text>;
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      style={styles.list}
      data={viewModel.answers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<QuestionChoiceHeader />}
    />
  );
};

const styles = StyleSheet.create({
  callout: {
    ...Typography.lightCaption1,
    marginBottom: Spacing.margin,
  },
  container: {
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.unit,
  },
  list: {
    flex: 1,
  },
  title: {
    ...Typography.headline,
    marginBottom: Spacing.unit,
  },
});

export default SatisfactionQuestionChoice;
