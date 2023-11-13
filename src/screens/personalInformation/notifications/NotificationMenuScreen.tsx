import React from "react";
import { StyleSheet, Text } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { ProfileModalNavigatorScreenProps } from "../../../navigation/profileModal/ProfileModalNavigatorScreenProps";
import { Colors, Spacing, Typography } from "../../../styles";
import i18n from "../../../utils/i18n";
import ProfileSettingsItem from "../../profile/ProfileSettingsItem";
import CircularIcon from "../../shared/CircularIcon";

type NotificationMenuScreenProps = ProfileModalNavigatorScreenProps<"NotificationMenu">;

const NotificationMenuScreen = (props: NotificationMenuScreenProps) => {
  const onLocal = () => {
    props.navigation.navigate("Notifications", { category: "local" });
  };
  const onNational = () => {
    props.navigation.navigate("Notifications", { category: "national" });
  };
  return (
    <SafeAreaView style={styles.container}>
      <CircularIcon
        style={styles.icon}
        source={require("../../../assets/images/notificationIcon.png")}
      />
      <Text style={styles.description}>{i18n.t("notificationmenu.description")}</Text>
      <ProfileSettingsItem title={i18n.t("notificationmenu.local")} onPress={onLocal} />
      <ProfileSettingsItem title={i18n.t("notificationmenu.national")} onPress={onNational} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  description: {
    ...Typography.headline,
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.margin,
  },
  icon: {
    alignSelf: "center",
    margin: Spacing.margin,
  },
});

export default NotificationMenuScreen;
