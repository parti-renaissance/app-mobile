import React, { FunctionComponent } from 'react'
import {
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  Platform,
  Pressable,
  View,
  StyleSheet,
} from 'react-native'
import { Colors } from '../../styles'

type NavigationHeaderButtonProps = Readonly<{
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  source: ImageSourcePropType
}>

export const NavigationHeaderButton: FunctionComponent<NavigationHeaderButtonProps> = ({
  style,
  onPress,
  source,
}) => {
  if (Platform.OS === 'android') {
    return (
      <View style={[style, styles.rippleContainer]}>
        <Pressable
          onPress={onPress}
          android_ripple={{ color: Colors.touchHighlight }}
        >
          <Image source={source} />
        </Pressable>
      </View>
    )
  } else {
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <Image source={source} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  rippleContainer: {
    borderRadius: 100,
    overflow: 'hidden',
  },
})

type CloseButtonProps = Readonly<{
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}>

export const CloseButton: FunctionComponent<CloseButtonProps> = ({
  style,
  onPress,
}) => {
  return (
    <NavigationHeaderButton
      style={style}
      source={require('../../assets/images/navigationBarClose.png')}
      onPress={onPress}
    />
  )
}
