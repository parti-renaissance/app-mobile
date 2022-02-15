import React, { FC } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
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
      style={props.style}
    >
      <View style={styles.container}>
        <Image style={styles.icon} source={props.icon} />
        {props.children}
      </View>
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
