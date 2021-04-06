import React, { FunctionComponent } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Styles } from '../../styles'

type Props = Readonly<{
  children: any
  style?: StyleProp<ViewStyle>
  backgroundColor: string
}>

const CardView: FunctionComponent<Props> = ({
  style,
  children,
  backgroundColor,
}) => {
  return (
    <View style={[style, styles.shadow]}>
      <View style={[{ backgroundColor: backgroundColor }, styles.card]}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  shadow: {
    ...Styles.cardViewContainerStyle,
  },
})

export default CardView
