import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import { useTheme } from '../../themes'
import i18n from '../../utils/i18n'
import { RegionViewModel } from '../regions/RegionViewModel'
import { BorderlessButton } from '../shared/Buttons'
import CardView from '../shared/CardView'
import { TouchablePlatform } from '../shared/TouchablePlatform'

type Props = Readonly<{
  viewModel: RegionViewModel
  onMorePressed: () => void
}>

const HomeRegion: FC<Props> = ({ viewModel, onMorePressed }) => {
  const { theme } = useTheme()
  return (
    <CardView
      style={styles.cardView}
      backgroundColor={Colors.defaultBackground}
    >
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        onPress={onMorePressed}
      >
        <View>
          <View style={styles.wrapBanner}>
            {viewModel.bannerUrl !== null ? (
              <Image
                style={styles.banner}
                source={{
                  uri: viewModel.bannerUrl,
                }}
              />
            ) : null}
          </View>
          <View style={styles.wrapLogo}>
            <Image
              style={styles.logo}
              source={{
                uri: viewModel.logoUrl,
              }}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.content}>
              <Text style={styles.subtitle}>{viewModel.subtitle}</Text>
              <Text style={styles.text} numberOfLines={5}>
                {viewModel.text}
              </Text>
            </View>
          </View>
          <BorderlessButton
            title={i18n.t('home.region_more')}
            textStyle={Styles.homeSeeMoreButtonTextStyle(theme)}
            style={Styles.homeSeeMoreButtonContainer}
            onPress={onMorePressed}
          />
        </View>
      </TouchablePlatform>
    </CardView>
  )
}

const styles = StyleSheet.create({
  cardView: {
    marginVertical: Spacing.margin,
    marginHorizontal: Spacing.margin,
  },
  container: {
    flex: 1,
    paddingVertical: Spacing.unit,
    paddingHorizontal: Spacing.margin,
  },
  wrapBanner: {
    minHeight: 70, // 54 + 16 (padding)
  },
  banner: {
    width: '100%',
    height: undefined,
    aspectRatio: 320 / 203,
  },
  containerLogo: {
    flex: 1,
  },
  wrapLogo: {
    width: 80,
    marginTop: -54,
    marginLeft: Spacing.margin,
    transform: [{ rotate: '-3deg' }],
    ...Styles.topElevatedContainerStyle,
  },
  logo: {
    width: 80,
    height: 80,
  },
  content: {
    paddingTop: Spacing.unit,
  },
  subtitle: {
    ...Typography.subheadline,
  },
  text: {
    marginTop: Spacing.unit,
    ...Typography.body,
  },
})

export default HomeRegion
