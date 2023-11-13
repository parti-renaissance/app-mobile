import React, { ImageBackground, ImageURISource, type ImageBackgroundProps } from "react-native";

export type ImageBackgroundFallbackProps = Omit<ImageBackgroundProps, "source"> & {
  source: ImageURISource;
};

export default function ImageBackgroundFallback(props: ImageBackgroundFallbackProps) {
  return props.source.uri ? <ImageBackground {...props} /> : <>{props.children}</>;
}
