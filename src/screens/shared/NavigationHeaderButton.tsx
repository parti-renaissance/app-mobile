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
import { Colors, Spacing } from '../../styles'

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
      <View style={styles.rippleContainer}>
        <Pressable
          style={[styles.container, style]}
          onPress={onPress}
          android_ripple={{ color: Colors.touchHighlight }}
        >
          <Image source={source} />
        </Pressable>
      </View>
    )
  } else {
    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Image source={source} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: Spacing.small,
    minHeight: 44,
    minWidth: 44,
  },
  rippleContainer: {
    borderRadius: 100,
    overflow: 'hidden',
  },
})

type ButtonProps = Readonly<{
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}>

export const CloseButton: FunctionComponent<ButtonProps> = (props) => {
  return (
    <NavigationHeaderButton
      {...props}
      source={require('../../assets/images/navigationBarClose.png')}
    />
  )
}

export const ProfileButton: FunctionComponent<ButtonProps> = (props) => {
  return (
    <NavigationHeaderButton
      {...props}
      source={require('../../assets/images/profileIcon.png')}
    />
  )
}
