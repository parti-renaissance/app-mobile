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
    justifyContent: 'center',
    backgroundColor: Colors.tagBackground,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 16,
  },
  tagText: {
    ...Typography.tagCaption,
  },
})

export default Tag
