import React, { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography } from "../../styles";
import { TouchablePlatform } from "../shared/TouchablePlatform";
import { DoorToDoorFilterProps } from "./DoorToDoor";

export const DoorToDoorFilterItem = memo(
  ({ active, onPress, filter, icon, title }: DoorToDoorFilterProps) => {
    const backgroundStyle = active ? styles.cardActive : styles.cardInactive;
    return (
      <View style={[styles.card, backgroundStyle]}>
        <TouchablePlatform onPress={() => onPress(filter)} touchHighlight={Colors.touchHighlight}>
          <View style={styles.inner}>
            {icon && <Image style={styles.icon} source={icon} />}
            <Text style={styles.text}>{title}</Text>
          </View>
        </TouchablePlatform>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    borderColor: Colors.inputTextBorder,
    borderRadius: 24,
    borderWidth: 1,
    margin: Spacing.small,
    overflow: "hidden",
  },
  cardActive: {
    backgroundColor: Colors.activeItemBackground,
  },
  cardInactive: {
    backgroundColor: Colors.defaultBackground,
  },
  icon: {
    height: 18,
    marginRight: Spacing.small,
    width: 18,
  },
  inner: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: Spacing.unit + Spacing.small,
    paddingVertical: Spacing.unit,
  },
  text: {
    ...Typography.caption1,
  },
});
