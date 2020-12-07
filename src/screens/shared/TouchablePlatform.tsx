import React from 'react'
import {
  Platform,
  TouchableHighlight,
  Pressable,
  ViewStyle,
  StyleProp,
} from 'react-native'
import { Colors } from '../../styles'

type Props = Readonly<{
  children: any
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  touchHighlight: string
  onPress?: () => void
}>

export const TouchablePlatform = (props: Props) => {
  if (Platform.OS === 'android') {
    return (
      <Pressable
        style={[props.style]}
        disabled={props.disabled}
        onPress={props.onPress}
        android_ripple={{ color: Colors.touchHighlight }}
      >
        {props.children}
      </Pressable>
    )
  } else {
    return (
      <TouchableHighlight
        style={props.style}
        activeOpacity={0.7}
        disabled={props.disabled}
        onPress={props.onPress}
        underlayColor={props.touchHighlight}
      >
        {props.children}
      </TouchableHighlight>
    )
  }
}
