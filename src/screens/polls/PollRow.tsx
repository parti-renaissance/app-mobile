import React, { FunctionComponent } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography } from "../../styles";
import TagView from "../shared/TagView";
import { TouchablePlatform } from "../shared/TouchablePlatform";
import { PollRowViewModel } from "./PollRowViewModel";

type Props = Readonly<{
  viewModel: PollRowViewModel;
  onPress?: () => void;
}>;

const PollRow: FunctionComponent<Props> = ({ viewModel, onPress }) => {
  return (
    <TouchablePlatform touchHighlight={Colors.touchHighlight} onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={viewModel.image} resizeMode="cover" />
        <View style={styles.labelsContainer}>
          <Text style={styles.title}>{viewModel.title}</Text>
          <Text style={styles.subtitle}>{viewModel.subtitle}</Text>
          <TagView size="small">{viewModel.tag}</TagView>
        </View>
      </View>
    </TouchablePlatform>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: Spacing.unit,
    paddingHorizontal: Spacing.margin,
  },
  image: {
    height: 85,
    width: 136,
  },
  labelsContainer: {
    alignItems: "flex-start",
    flex: 1,
    marginLeft: Spacing.unit,
    padding: Spacing.small,
  },
  subtitle: {
    ...Typography.lightCaption1,
    marginBottom: Spacing.small,
  },
  title: {
    ...Typography.subheadline,
    marginBottom: Spacing.small,
  },
});

export default PollRow;
