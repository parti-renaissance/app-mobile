import React, { memo } from "react";
import { ImageRequireSource, Platform } from "react-native";
import { LatLng, Marker } from "react-native-maps";

type Props = {
  coordinate: LatLng;
  icon: ImageRequireSource | undefined;
  onPress?: () => void;
};

export const MARKER_DEFAULT_ANCHOR = { x: 0.5, y: 0.5 };

export const DoorToDoorMapMarker = memo((props: Props) => {
  if (!props.icon) return null;
  if (Platform.OS === "android") {
    return (
      <Marker
        tracksViewChanges={false}
        coordinate={props.coordinate}
        onPress={props.onPress}
        anchor={MARKER_DEFAULT_ANCHOR}
        icon={props.icon} // icon is Android only
      />
    );
  } else {
    return (
      <Marker
        tracksViewChanges={false}
        coordinate={props.coordinate}
        onPress={props.onPress}
        anchor={MARKER_DEFAULT_ANCHOR}
        image={props.icon}
      />
    );
  }
});
