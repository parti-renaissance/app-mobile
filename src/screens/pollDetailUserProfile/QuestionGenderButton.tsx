import React, { FunctionComponent } from "react";
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Colors, Spacing, Typography } from "../../styles";
import { TouchablePlatform } from "../shared/TouchablePlatform";
import { QuestionGenderButtonViewModel } from "./QuestionGenderButtonViewModel";

type Props = Readonly<{
  style?: StyleProp<ViewStyle>;
  viewModel: QuestionGenderButtonViewModel;
  onPress?: () => void;
}>;

const QuestionGenderButton: FunctionComponent<Props> = ({ viewModel, onPress, style }) => {
  const buttonStyle = viewModel.isSelected ? styles.buttonSelected : styles.buttonUnselected;

  return (
    <View style={[styles.button, buttonStyle, style]}>
      <TouchablePlatform touchHighlight={Colors.touchHighlight} onPress={onPress}>
        <View style={styles.container}>
          <Image resizeMode="center" style={styles.image} source={viewModel.image} />
          <Text style={styles.text}>{viewModel.title}</Text>
        </View>
      </TouchablePlatform>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.secondaryButtonBackground,
    borderRadius: 8,
    flex: 1,
    overflow: "hidden",
  },
  buttonSelected: {
    borderColor: Colors.primaryColor,
    borderWidth: 2,
  },
  buttonUnselected: {
    backgroundColor: Colors.secondaryButtonBackground,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingVertical: Spacing.unit,
  },
  image: {
    height: 42,
    width: 42,
  },
  text: {
    ...Typography.subheadline,
  },
});

export default QuestionGenderButton;
