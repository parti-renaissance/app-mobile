import React, { FunctionComponent } from 'react'
import {
  ColorValue,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from './TouchablePlatform'

type ButtonProps = Readonly<{
  style?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onPress?: () => void
  title: string
  disabled?: boolean
  shape?: ButtonShape
}>

type ButtonShape = 'oval' | 'rounded'

type TertiaryButtonProps = ButtonProps &
  Readonly<{
    noShadow?: boolean
    innerStyle?: StyleProp<ViewStyle>
  }>

type IconProps = Readonly<{
  icon?: ImageSourcePropType
  iconTint?: ColorValue
  iconPadding?: number
}>

export const PrimaryButton: FunctionComponent<ButtonProps> = (props) => {
  const opacity = props.disabled ? 0.5 : 1.0
  const background = props.disabled
    ? Colors.primaryButtonBackgroundDisabled
    : Colors.primaryColor
  const baseButtonStyle = getBaseButtonStyle(props.shape ?? 'oval')

  return (
    <View
      style={[baseButtonStyle, { backgroundColor: background }, props.style]}
    >
      <TouchablePlatform
        onPress={props.onPress}
        touchHighlight={Colors.primaryButtonBackgroundHighlight}
        disabled={props.disabled}
        style={[styles.buttonTouchable, props.buttonStyle]}
      >
        <Text
          style={[
            styles.appButtonText,
            { opacity: opacity, color: Colors.primaryButtonTextColor },
            props.textStyle,
          ]}
        >
          {props.title}
        </Text>
      </TouchablePlatform>
    </View>
  )
}

export const SecondaryButton: FunctionComponent<ButtonProps & IconProps> = (
  props,
) => {
  const opacity = props.disabled ? 0.5 : 1.0
  const background = props.disabled
    ? Colors.secondaryButtonDisabled
    : Colors.secondaryButtonBackground

  const baseButtonStyle = getBaseButtonStyle(props.shape ?? 'oval')
  return (
    <View
      style={[baseButtonStyle, { backgroundColor: background }, props.style]}
    >
      <TouchablePlatform
        onPress={props.onPress}
        disabled={props.disabled}
        style={styles.buttonTouchable}
        touchHighlight={background}
      >
        <Text
          style={[
            styles.appButtonText,
            styles.appButtonTextSecondary,
            { opacity: opacity },
            props.textStyle,
          ]}
        >
          {props.icon ? (
            <View style={{ paddingRight: props.iconPadding }}>
              <Image
                style={{
                  tintColor: props.iconTint,
                }}
                source={props.icon}
              />
            </View>
          ) : null}

          {props.title}
        </Text>
      </TouchablePlatform>
    </View>
  )
}

export const TertiaryButton: FunctionComponent<TertiaryButtonProps> = (
  props,
) => {
  const opacity = props.disabled ? 0.5 : 1.0
  const containerStyle = props.noShadow
    ? [props.style]
    : [
        props.style,
        styles.shadow,
        { shadowOpacity: styles.shadow.shadowOpacity * opacity },
      ]
  const baseButtonStyle = getBaseButtonStyle(props.shape ?? 'oval')
  return (
    <View style={containerStyle}>
      <View
        style={[
          baseButtonStyle,
          { backgroundColor: Colors.tertiaryButtonBackground },
          { elevation: Spacing.buttonElevation * opacity },
        ]}
      >
        <TouchablePlatform
          onPress={props.onPress}
          disabled={props.disabled}
          style={[styles.buttonTouchable, props.innerStyle]}
          touchHighlight={Colors.tertiaryButtonBackground}
        >
          <Text
            style={[
              styles.appButtonText,
              { opacity: opacity, color: Colors.coloredText },
              props.textStyle,
            ]}
          >
            {props.title}
          </Text>
        </TouchablePlatform>
      </View>
    </View>
  )
}

export const BorderlessButton: FunctionComponent<ButtonProps> = (props) => {
  const opacity = props.disabled ? 0.5 : 1.0
  return (
    <View style={{ opacity: opacity }}>
      <TouchableOpacity
        onPress={props.onPress}
        disabled={props.disabled}
        style={[styles.appButtonContainerBorderless, props.style]}
      >
        <Text
          style={[
            styles.appButtonText,
            styles.appButtonTextBorderless,
            props.textStyle,
          ]}
        >
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const getBaseButtonStyle = (shape: ButtonShape): StyleProp<ViewStyle> => {
  switch (shape) {
    case 'oval':
      return styles.baseAppButtonContainerOval
    case 'rounded':
      return styles.baseAppButtonContainerRounded
  }
}

const styles = StyleSheet.create({
  appButtonContainerBorderless: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  appButtonText: {
    ...Typography.subheadline,
    alignSelf: 'center',
  },
  appButtonTextBorderless: {
    color: Colors.darkText,
  },
  appButtonTextSecondary: {
    color: Colors.secondaryButtonText,
  },
  baseAppButtonContainerOval: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  baseAppButtonContainerRounded: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  buttonTouchable: {
    paddingHorizontal: Spacing.mediumMargin,
    paddingVertical: 14,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
})
