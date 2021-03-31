import React, { FC } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { Spacing } from '../../styles'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  icon: ImageSourcePropType
  children: any
}>

const EventDetailsItemContainer: FC<Props> = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <Image style={styles.icon} source={props.icon} />
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.unit,
  },
  icon: {
    alignSelf: 'flex-start',
    marginEnd: Spacing.margin,
  },
})

export default EventDetailsItemContainer
