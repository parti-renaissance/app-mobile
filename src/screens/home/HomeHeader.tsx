import React, { FunctionComponent } from 'react'
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native'
import { Spacing, Typography } from '../../styles'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  title: string
}>

const HomeHeader: FunctionComponent<Props> = (props) => {
  return (
    <View style={[props.style, styles.container]}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
  },
  title: {
    ...Typography.title,
  },
})

export default HomeHeader
