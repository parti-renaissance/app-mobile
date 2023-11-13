import React, { FunctionComponent } from "react";
import { ActivityIndicator, Platform, StyleProp, ViewStyle } from "react-native";
import { Colors } from "../../styles";

type Props = Readonly<{
  style?: StyleProp<ViewStyle>;
}>;

const LoaderView: FunctionComponent<Props> = ({ style }) => {
  return (
    <ActivityIndicator
      style={style}
      size={Platform.OS === "android" ? "large" : "small"}
      color={Platform.OS === "android" ? Colors.primaryColor : undefined}
    />
  );
};

export default LoaderView;
