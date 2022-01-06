import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Styles, Typography } from '../../styles'
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
            textStyle={Styles.homeSeeMoreButtonTextStyle}
            style={Styles.homeSeeMoreButtonContainer}
            onPress={onMorePressed}
          />
        </View>
      </TouchablePlatform>
    </CardView>
  )
}

const styles = StyleSheet.create({
  banner: {
    aspectRatio: 320 / 203,
    height: undefined,
    width: '100%',
  },
  cardView: {
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.margin,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.unit,
  },
  containerLogo: {
    flex: 1,
  },
  content: {
    paddingTop: Spacing.unit,
  },
  logo: {
    height: 80,
    width: 80,
  },
  subtitle: {
    ...Typography.subheadline,
  },
  text: {
    marginTop: Spacing.unit,
    ...Typography.body,
  },
  wrapBanner: {
    minHeight: 70, // 54 + 16 (padding)
  },
  wrapLogo: {
    marginLeft: Spacing.margin,
    marginTop: -54,
    width: 80,
    ...Styles.topElevatedContainerStyle,
  },
})

export default HomeRegion
