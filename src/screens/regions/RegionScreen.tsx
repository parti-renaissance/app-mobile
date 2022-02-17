import React, { FC, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import RegionsRepository from '../../data/RegionsRepository'

import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { RegionViewModel } from './RegionViewModel'
import { RegionViewModelMapper } from './RegionViewModelMapper'
import { ExternalLink } from '../shared/ExternalLink'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { Analytics } from '../../utils/Analytics'
import { HomeNavigatorScreenProps } from '../../navigation/HomeNavigator'

type RegionScreenProps = HomeNavigatorScreenProps<'Region'>

const RegionScreen: FC<RegionScreenProps> = ({ route }) => {
  const [statefulState, setStatefulState] = useState<
    ViewState<RegionViewModel>
  >(ViewState.Loading())

  const fetchData = () => {
    RegionsRepository.getInstance()
      .getRegion(route.params.zipCode)
      .then((result) => {
        if (result.campaign) {
          const viewModel = RegionViewModelMapper.map(
            result.name,
            result.campaign,
          )
          setStatefulState(ViewState.Content(viewModel))
        } else {
          // This is a fatal error, should not happen
          setStatefulState(
            ViewStateUtils.networkError(new Error('No campaign for region.')),
          )
        }
      })
      .catch((error) => {
        setStatefulState(
          ViewStateUtils.networkError(error, () => {
            setStatefulState(ViewState.Loading())
            fetchData()
          }),
        )
      })
  }

  useEffect(fetchData, [])

  const RegionContent = (regionViewModel: RegionViewModel) => {
    return (
      <View style={styles.contentContainer}>
        <ScrollView>
          <View style={styles.wrapBanner}>
            {regionViewModel.bannerUrl !== null ? (
              <Image
                style={styles.banner}
                source={{
                  uri: regionViewModel.bannerUrl,
                }}
              />
            ) : null}
          </View>
          <View style={styles.containerLogo}>
            <View style={styles.wrapLogo}>
              <Image
                style={styles.logo}
                source={{
                  uri: regionViewModel.logoUrl,
                }}
              />
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{regionViewModel.title}</Text>
            <Text style={styles.subtitle}>{regionViewModel.subtitle}</Text>
            <Text style={styles.text}>{regionViewModel.text}</Text>
          </View>
        </ScrollView>
        {regionViewModel.websiteUrl !== null ? (
          <View style={styles.bottomContainer}>
            <PrimaryButton
              title={i18n.t('regions.website')}
              onPress={async () => {
                await Analytics.logRegionDetails()
                ExternalLink.openUrl(regionViewModel.websiteUrl as string)
              }}
            />
          </View>
        ) : null}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
      <StatefulView contentComponent={RegionContent} state={statefulState} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  banner: {
    aspectRatio: 320 / 203,
    height: undefined,
    width: '100%',
  },
  bottomContainer: {
    ...Styles.topElevatedContainerStyle,
    backgroundColor: Colors.defaultBackground,
    padding: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  containerLogo: {
    alignItems: 'center',
    flex: 1,
  },
  content: {
    padding: Spacing.margin,
  },
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  logo: {
    height: 100,
    width: 100,
  },
  subtitle: {
    marginTop: Spacing.unit,
    ...Typography.headline,
  },
  text: {
    marginTop: Spacing.margin,
    ...Typography.body,
  },
  title: {
    ...Typography.title,
  },
  wrapBanner: {
    minHeight: 130,
  },
  wrapLogo: {
    marginTop: -66,
    width: 100,
    ...Styles.topElevatedContainerStyle,
  },
})

export default RegionScreen
