import React, { FC } from 'react'
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native'
import { Spacing, Typography } from '../../styles'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  tag: string
  tagTextColor: ColorValue
  tagBackgroundColor: ColorValue
}>

const TagView: FC<Props> = (props) => {
  return (
    <Text
      numberOfLines={1}
      style={[
        styles.tag,
        {
          backgroundColor: props.tagBackgroundColor,
          color: props.tagTextColor,
        },
        props.style,
      ]}
    >
      {props.tag}
    </Text>
  )
}

const styles = StyleSheet.create({
  tag: {
    ...Typography.body,
    borderRadius: Spacing.unit,
    fontSize: 8,
    lineHeight: 16,
    marginStart: Spacing.unit,
    marginTop: Spacing.unit,
    overflow: 'hidden',
    paddingHorizontal: Spacing.unit,
  },
})

export default TagView
