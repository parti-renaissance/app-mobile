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
import i18n from '../../utils/i18n'
import { VerticalSpacer } from '../shared/Spacer'
import Flag from './Flag'

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  title: string
}>

const IMAGE_ASPECT_RATIO = 375 / 284
// TODO: (Pierre Felgines) 2022/02/11 Update placeholder
const IMAGE_PLACEHOLDER_URI = 'https://via.placeholder.com/700'

const HomeHeader: FunctionComponent<Props> = (props) => {
  const { width: screenWidth } = useWindowDimensions()
  return (
    <View style={props.style}>
      <ImageBackground
        source={{ uri: IMAGE_PLACEHOLDER_URI }}
        style={{ minHeight: screenWidth / IMAGE_ASPECT_RATIO }}
        resizeMode="cover"
      >
        <View style={styles.banner}>
          <Text style={styles.bannerHeading}>
            {i18n.t('home.banner.heading')}
          </Text>
          <Text style={styles.bannerTitle}>{i18n.t('home.banner.title')}</Text>
        </View>
      </ImageBackground>
      <Flag style={styles.flag} />
      <VerticalSpacer spacing={Spacing.mediumMargin} />
      <Text style={styles.title}>{props.title}</Text>
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
