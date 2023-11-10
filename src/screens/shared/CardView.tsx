import React, { FunctionComponent } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Styles } from '../../styles'

type Props = Readonly<{
  children: any
  style?: StyleProp<ViewStyle>
  backgroundColor: string
  borderRadius?: number
}>

const CardView: FunctionComponent<Props> = ({
  style,
  children,
  backgroundColor,
  borderRadius = 8,
}) => {
  const dynamicStyle = {backgroundColor, borderRadius}
  return (
    <View style={[style, styles.shadow, dynamicStyle]}>
      <View style={[dynamicStyle, styles.card]}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    elevation: 4,
    overflow: 'hidden',
  },
  shadow: {
    ...Styles.cardViewContainerStyle,
  },
})

export default CardView
