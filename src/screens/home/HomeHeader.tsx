import React, { FunctionComponent } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ImageBackground,
  useWindowDimensions,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { VerticalSpacer } from '../shared/Spacer'
import Flag from './Flag'

export interface HomeHeaderViewModel {
  imageUri: string
  bannerHeading: string
  bannerTitle: string
  greeting: string
}

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  viewModel: HomeHeaderViewModel
}>

const IMAGE_ASPECT_RATIO = 375 / 284

const HomeHeader: FunctionComponent<Props> = ({ style, viewModel }) => {
  const { width: screenWidth } = useWindowDimensions()
  return (
    <View style={style}>
      <ImageBackground
        source={{ uri: viewModel.imageUri }}
        style={{ minHeight: screenWidth / IMAGE_ASPECT_RATIO }}
        resizeMode="cover"
      >
        <View style={styles.banner}>
          <Text style={styles.bannerHeading}>{viewModel.bannerHeading}</Text>
          <Text style={styles.bannerTitle}>{viewModel.bannerTitle}</Text>
        </View>
      </ImageBackground>
      <Flag style={styles.flag} />
      <VerticalSpacer spacing={Spacing.mediumMargin} />
      <Text style={styles.title}>{viewModel.greeting}</Text>
      <VerticalSpacer spacing={Spacing.mediumMargin} />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    ...Typography.title,
    color: Colors.darkText,
    lineHeight: 34,
    marginHorizontal: Spacing.margin,
  },
  banner: {
    flex: 1,
    backgroundColor: Colors.homeBannerOverlayBackground,
    padding: Spacing.mediumMargin,
    paddingTop: Spacing.extraLargeMargin,
    justifyContent: 'flex-end',
  },
  bannerHeading: {
    ...Typography.homeBannerTitleItalic,
    color: Colors.veryLightText,
  },
  bannerTitle: {
    ...Typography.homeBannerTitle,
    color: Colors.veryLightText,
  },
  flag: {
    height: 8,
  },
})

export default HomeHeader
