import React, { FC } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import { Colors, Spacing } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  icon: ImageSourcePropType
  onPress?: () => void
  children: any
}>

const EventDetailsItemContainer: FC<Props> = (props) => {
  return (
    <TouchablePlatform
      disabled={props.onPress === undefined}
      onPress={props.onPress}
      touchHighlight={Colors.touchHighlight}
      style={[styles.container, props.style]}
    >
      <Image style={styles.icon} source={props.icon} />
      {props.children}
    </TouchablePlatform>
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
