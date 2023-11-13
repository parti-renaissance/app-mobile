import React, { FC } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { Colors, Spacing, Typography } from "../../styles";

type TagViewSize = "small" | "regular";

type Props = Readonly<{
  style?: StyleProp<TextStyle>;
  size?: TagViewSize;
  children?: React.ReactNode;
}>;

const styleForSize = (size: TagViewSize | undefined): TextStyle => {
  switch (size ?? "regular") {
    case "regular":
      return { borderRadius: 10, paddingVertical: Spacing.small };
    case "small":
      return { borderRadius: 8, paddingVertical: Spacing.extraSmall };
  }
};

const TagView: FC<Props> = ({ style, size, children }) => {
  return (
    <Text numberOfLines={1} style={[styles.tag, styleForSize(size), style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Colors.tagBackground,
    color: Colors.darkText,
    ...Typography.tagCaption,
    overflow: "hidden",
    paddingHorizontal: Spacing.unit,
    textTransform: "uppercase",
  },
});

export default TagView;
