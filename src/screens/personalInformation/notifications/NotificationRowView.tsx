import React, { FC } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { Colors, Spacing, Typography } from "../../../styles";
import { NotificationRowViewModel } from "./NotificationViewModel";

type Props = Readonly<{
  viewModel: NotificationRowViewModel;
  onSelectionChanged: (id: string, isSelected: boolean) => void;
}>;

const NotificationRowView: FC<Props> = ({ viewModel, onSelectionChanged }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{viewModel.label}</Text>
        <Switch
          value={viewModel.isSelected}
          onValueChange={(isSelected) => {
            onSelectionChanged(viewModel.id, isSelected);
          }}
        />
      </View>
      {viewModel.isLastOfSection === false ? <View style={styles.separator} /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.margin,
    alignItems: "center",
  },
  label: {
    ...Typography.caption1,
    color: Colors.lightText,
    flex: 1,
    marginEnd: Spacing.margin,
  },
  separator: {
    backgroundColor: Colors.separator,
    height: Spacing.separatorHeight,
    marginHorizontal: Spacing.margin,
  },
});

export default NotificationRowView;
