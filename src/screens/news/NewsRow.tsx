import React, { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography } from "../../styles";
import { VerticalSpacer } from "../shared/Spacer";
import TagView from "../shared/TagView";
import { TouchablePlatform } from "../shared/TouchablePlatform";
import { NewsRowViewModel } from "./NewsRowViewModel";

type Props = Readonly<{
  viewModel: NewsRowViewModel;
  onPress: () => void;
}>;

const NewsRow: FunctionComponent<Props> = ({ viewModel, onPress }) => {
  return (
    <TouchablePlatform touchHighlight={Colors.touchHighlight} onPress={onPress}>
      <View style={styles.container}>
        <TagView>{viewModel.tag}</TagView>
        <VerticalSpacer spacing={Spacing.unit} />
        <Text style={styles.title}>{viewModel.title}</Text>
        <VerticalSpacer spacing={Spacing.unit} />
        {viewModel.author !== undefined && <Text style={styles.caption}>{viewModel.author}</Text>}
        <Text style={styles.caption}>{viewModel.date}</Text>
      </View>
    </TouchablePlatform>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.margin,
    alignItems: "flex-start",
  },
  caption: {
    ...Typography.body,
    color: Colors.lightText,
  },
  description: {
    ...Typography.body,
    marginTop: Spacing.small,
  },
  title: {
    ...Typography.title2,
    color: Colors.titleText,
  },
});

export default NewsRow;
