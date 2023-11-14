import React, { FC } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'

export interface ProfileSettingsCardViewModel {
  title: string
  description: string
  image?: ImageSourcePropType
}

type Props = Readonly<{
  viewModel: ProfileSettingsCardViewModel
  onPress: () => void
  style?: StyleProp<ViewStyle>
}>

const ProfileSettingsCard: FC<Props> = (props) => {
  return (
    <View style={[styles.touchableArea, props.style]}>
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        onPress={props.onPress}
      >
        <View style={styles.container}>
          <View style={styles.leftSide}>
            <Text style={styles.title}>{props.viewModel.title}</Text>
            <Text numberOfLines={2} style={styles.description}>
              {props.viewModel.description}
            </Text>
          </View>
          {props.viewModel.image ? (
            <View style={styles.imageContainer}>
              <Image source={props.viewModel.image} />
            </View>
          ) : null}
        </View>
      </TouchablePlatform>
    </View>
  )
}

const IMAGE_CONTAINER_SIZE = 44

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  description: {
    ...Typography.caption1,
    color: Colors.lightText,
    marginTop: Spacing.small,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: Colors.defaultBackground,
    borderRadius: IMAGE_CONTAINER_SIZE / 2,
    height: IMAGE_CONTAINER_SIZE,
    justifyContent: 'center',
    marginRight: Spacing.margin,
    width: IMAGE_CONTAINER_SIZE,
  },
  leftSide: {
    flexGrow: 1,
    flexShrink: 1,
    padding: Spacing.margin,
  },
  title: {
    ...Typography.headline,
  },
  touchableArea: {
    backgroundColor: Colors.accountCardBackground,
    borderRadius: 8,
    overflow: 'hidden',
  },
})

export default ProfileSettingsCard
