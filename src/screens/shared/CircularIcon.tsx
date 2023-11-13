import React, { FC } from "react";
import { Image, ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "../../styles";

type Props = Readonly<{
  style?: StyleProp<ViewStyle>;
  source: ImageSourcePropType;
}>;

const CircularIcon: FC<Props> = ({ style, source }) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={source} resizeMode="contain" />
    </View>
  );
};

const SIZE = 140;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.circularIconBackground,
    borderRadius: SIZE / 2,
    height: SIZE,
    justifyContent: "center",
    width: SIZE,
  },
});

export default CircularIcon;
