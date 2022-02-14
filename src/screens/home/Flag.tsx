import React, { FunctionComponent } from 'react'
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native'
import { Colors } from '../../styles'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
}>

const HomeHeader: FunctionComponent<Props> = ({ style }) => {
  const colors = [
    Colors.frenchFlagBlue,
    Colors.frenchFlagWhite,
    Colors.frenchFlagRed,
  ]
  return (
    <View style={[styles.container, style]}>
      {colors.map((color, index) => (
        <View
          key={index}
          style={[styles.flagItem, { backgroundColor: color }]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  flagItem: {
    flex: 1,
  },
})

export default HomeHeader
