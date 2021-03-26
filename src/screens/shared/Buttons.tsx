import React, { FunctionComponent } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import Theme from '../../themes/Theme'
import { TouchablePlatform } from './TouchablePlatform'

type ButtonProps = Readonly<{
  style?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onPress?: () => void
  title: string
  disabled?: boolean
  theme?: Theme
}>

type TertiaryButtonProps = ButtonProps & Readonly<{ noShadow?: boolean }>

export const PrimaryButton: FunctionComponent<ButtonProps> = (props) => {
  const { theme } = useTheme()
  const currentTheme = props.theme ? props.theme : theme
  const opacity = props.disabled ? 0.5 : 1.0
  const background = props.disabled
    ? currentTheme.primaryButtonBackgroundDisabled
    : currentTheme.primaryColor

  return (
    <View
      style={[
        styles.baseAppButtonContainer,
        { backgroundColor: background },
        props.style,
      ]}
    >
      <TouchablePlatform
        onPress={props.onPress}
        touchHighlight={currentTheme.primaryButtonBackgroundHighlight}
        disabled={props.disabled}
        style={[styles.buttonTouchable, props.buttonStyle]}
      >
        <Text
          style={[
            styles.appButtonText,
            { opacity: opacity, color: currentTheme.primaryButtonTextColor },
            props.textStyle,
          ]}
        >
          {props.title}
        </Text>
      </TouchablePlatform>
    </View>
  )
}

export const SecondaryButton: FunctionComponent<ButtonProps> = (props) => {
  const opacity = props.disabled ? 0.5 : 1.0
  const background = props.disabled
    ? Colors.secondaryButtonDisabled
    : Colors.secondaryButtonBackground
  return (
    <View
      style={[
        styles.baseAppButtonContainer,
        { backgroundColor: background },
        props.style,
      ]}
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
  const { theme } = useTheme()
  const containerStyle = props.noShadow
    ? [props.style]
    : [
        props.style,
        styles.shadow,
        { shadowOpacity: styles.shadow.shadowOpacity * opacity },
      ]
  return (
    <View style={containerStyle}>
      <View
        style={[
          styles.baseAppButtonContainer,
          { backgroundColor: Colors.tertiaryButtonBackground },
          { elevation: Spacing.buttonElevation * opacity },
        ]}
      >
        <TouchablePlatform
          onPress={props.onPress}
          disabled={props.disabled}
          style={styles.buttonTouchable}
          touchHighlight={Colors.tertiaryButtonBackground}
        >
          <Text
            style={[
              styles.appButtonText,
              { opacity: opacity, color: theme.coloredText },
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
        style={[props.style, styles.appButtonContainerBorderless]}
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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 2,
    shadowOpacity: 0.3,
  },
  baseAppButtonContainer: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  buttonTouchable: {
    paddingVertical: 14,
    paddingHorizontal: Spacing.mediumMargin,
  },
  appButtonContainerBorderless: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  appButtonText: {
    ...Typography.subheadline,
    alignSelf: 'center',
  },
  appButtonTextSecondary: {
    color: Colors.secondaryButtonText,
  },
  appButtonTextBorderless: {
    color: Colors.darkText,
  },
})
