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
            <Image source={props.viewModel.image} style={styles.image} />
          ) : null}
        </View>
      </TouchablePlatform>
    </View>
  )
}

const styles = StyleSheet.create({
  touchableArea: {
    backgroundColor: Colors.groupedListBackground,
    borderRadius: 8,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
  },
  leftSide: {
    flexGrow: 1,
    flexShrink: 1,
    padding: Spacing.margin,
  },
  title: {
    ...Typography.headline,
  },
  description: {
    ...Typography.caption1,
    marginTop: Spacing.small,
    color: Colors.lightText,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
})

export default ProfileSettingsCard
