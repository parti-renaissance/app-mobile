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
  shadow: {
    ...Styles.cardViewContainerStyle,
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 4,
  },
})

export default CardView
