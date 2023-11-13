import { StackNavigationOptions } from "@react-navigation/stack";
import * as Colors from "./colors";
import * as Typography from "./typography";

export const headerBlank: StackNavigationOptions = {
  title: "",
  headerBackTitle: " ", // empty string does not remove the title
  headerTintColor: Colors.titleText,
  headerTitleStyle: {
    ...Typography.headline,
    color: Colors.titleText,
  },
  headerStyle: {
    backgroundColor: Colors.navigationBackground,
    // hides navigationBar bottom line
    shadowColor: "transparent",
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 0,
  },
};
