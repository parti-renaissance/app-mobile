import React, { FunctionComponent } from 'react'
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native'

import { Colors, Typography } from '../../styles'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  label: string
}>

const Tag: FunctionComponent<Props> = (props) => {
  return (
    <View style={[styles.tag, props.style]}>
      <Text style={styles.tagText}>{props.label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Colors.tagBackground,
    borderRadius: 8,
    height: 16,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  tagText: {
    ...Typography.tagCaption,
  },
})

export default Tag
