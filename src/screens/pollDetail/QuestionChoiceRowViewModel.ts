import { ImageProps } from "react-native";

export interface QuestionChoiceRowViewModel {
  id: string;
  title: string;
  isSelected: boolean;
  image?: ImageProps;
}
