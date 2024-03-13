import React, { FunctionComponent } from 'react'
import {
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { VerticalSpacer } from '../shared/Spacer'
import Flag from './Flag'

export interface HomeHeaderViewModel {
  image: ImageSourcePropType
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
      <View style={{ minHeight: screenWidth / IMAGE_ASPECT_RATIO, backgroundColor: Colors.primaryColor }} >
        <View style={styles.banner}>
          <Text style={styles.bannerHeading}>{`Le 9 juin,\nnous avons`}</Text>
          <Text style={styles.bannerTitle}>{`Besoin,\nd'Europe`}</Text>
        </View>
      </View>
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
    lineHeight: 30,
    marginHorizontal: Spacing.margin,
  },
  banner: {
    flex: 1,
    padding: Spacing.mediumMargin,
    paddingTop: Spacing.extraLargeMargin,
    justifyContent: 'flex-end',
  },
  bannerHeading: {
    ...Typography.largeTitle,
    color: Colors.black,
  },
  bannerTitle: {
    ...Typography.largeTitle,
    color: Colors.veryLightText,
  },
  flag: {
    height: 8,
  },
})

export default HomeHeader
