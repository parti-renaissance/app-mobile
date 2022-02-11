import React, { FunctionComponent } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
  ColorValue,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../../styles'
import { VerticalSpacer } from '../../shared/Spacer'

type Props = Readonly<{
  children?: React.ReactNode
  title: string
  imageSource: ImageSourcePropType
  tintColor: ColorValue
}>

export const HomeFeedTimelineItem: FunctionComponent<Props> = ({
  children,
  title,
  imageSource,
  tintColor,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.verticalLine} />
        <View style={[styles.iconContainer, { backgroundColor: tintColor }]}>
          <Image source={imageSource} />
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{title}</Text>
        <VerticalSpacer spacing={Spacing.unit} />
        <View>{children}</View>
      </View>
    </View>
  )
}

const ICON_CONTAINER_SIZE = 36
const LINE_WIDTH = 2

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  title: {
    ...Typography.title3,
    color: Colors.lightText,
    marginTop: 5,
  },
  verticalLine: {
    width: 2,
    backgroundColor: Colors.separator,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: Spacing.margin + ICON_CONTAINER_SIZE / 2 - LINE_WIDTH / 2,
  },
  iconContainer: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: ICON_CONTAINER_SIZE / 2,
    marginStart: Spacing.margin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    paddingHorizontal: Spacing.margin,
    paddingBottom: Spacing.margin,
  },
})
