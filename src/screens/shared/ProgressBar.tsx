import React from "react";
import { Platform } from "react-native";
import { ProgressBar as ProgressBarAndroid } from "@react-native-community/progress-bar-android";
import { ProgressView as ProgressBarIOS } from "@react-native-community/progress-view";
import { Colors } from "../../styles";

type Props = Readonly<{
  progress: number;
  color: string;
}>;

const ProgressBar = (props: Props) => {
  if (Platform.OS === "android") {
    return (
      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={props.progress}
        color={props.color}
      />
    );
  } else {
    return (
      <ProgressBarIOS
        progress={props.progress}
        progressTintColor={props.color}
        trackTintColor={Colors.progressBackground}
      />
    );
  }
};

export default ProgressBar;
