import React, { FC } from 'react'
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'
import { Spacing, Typography } from '../../styles'
import { TagViewModel } from './TagViewModel'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  viewModel: TagViewModel
}>

const TagView: FC<Props> = ({ style, viewModel }) => {
  return (
    <Text
      numberOfLines={1}
      style={[
        styles.tag,
        {
          backgroundColor: viewModel.backgroundColor,
          color: viewModel.textColor,
        },
        style,
      ]}
    >
      {viewModel.label}
    </Text>
  )
}

const styles = StyleSheet.create({
  tag: {
    ...Typography.tagCaption,
    borderRadius: 11,
    marginStart: Spacing.unit,
    marginTop: Spacing.unit,
    overflow: 'hidden',
    paddingHorizontal: Spacing.unit,
    paddingVertical: Spacing.small,
    textTransform: 'uppercase',
  },
})

export default TagView
