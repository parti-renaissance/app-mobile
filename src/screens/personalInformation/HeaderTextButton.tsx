import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'

type Props = Readonly<{
  title: string
  type?: 'regular' | 'primary'
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}>

export const HeaderTextButton: FC<Props> = ({
  title,
  type,
  style,
  onPress,
}) => {
  const styleForType = () => {
    switch (type ?? 'regular') {
      case 'primary':
        return styles.textPrimary
      case 'regular':
        return undefined
    }
  }
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text numberOfLines={1} style={[styles.text, styleForType()]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.unit,
    alignItems: 'center',
  },
  text: {
    ...Typography.body,
    fontSize: 14,
    flexWrap: 'wrap',
  },
  textPrimary: {
    color: Colors.primaryColor,
  },
})
