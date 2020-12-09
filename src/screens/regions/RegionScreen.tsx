import React, { FC, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import RegionsRepository from '../../data/RegionsRepository'

import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { RegionViewModel } from './RegionViewModel'
import { RegionViewModelMapper } from './RegionViewModelMapper'
import { RegionScreenProps } from '../../navigation'
import { ExternalLink } from '../shared/ExternalLink'

type Props = Readonly<RegionScreenProps>

const RegionScreen: FC<Props> = ({ route }) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<RegionViewModel>
  >(new ViewState.Loading())

  const fetchData = () => {
    RegionsRepository.getInstance()
      .getRegion(route.params.zipCode)
      .then((result) => {
        if (result.campaign) {
          const viewModel = RegionViewModelMapper.map(
            result.name,
            result.campaign,
          )
          setStatefulState(new ViewState.Content(viewModel))
        } else {
          setStatefulState(
            new ViewState.Error(
              GenericErrorMapper.mapErrorMessage(
                new Error('No campaign for region.'),
              ),
            ),
          )
        }
      })
      .catch((error) => {
        setStatefulState(
          new ViewState.Error(GenericErrorMapper.mapErrorMessage(error), () => {
            setStatefulState(new ViewState.Loading())
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
              onPress={() => {
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
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
  wrapBanner: {
    minHeight: 130,
  },
  banner: {
    width: '100%',
    height: undefined,
    aspectRatio: 320 / 203,
  },
  containerLogo: {
    flex: 1,
    alignItems: 'center',
  },
  wrapLogo: {
    width: 100,
    marginTop: -66,
    transform: [{ rotate: '-3deg' }],
    ...Styles.topElevatedContainerStyle,
  },
  logo: {
    width: 100,
    height: 100,
  },
  content: {
    padding: Spacing.margin,
  },
  title: {
    ...Typography.title,
  },
  subtitle: {
    marginTop: Spacing.unit,
    ...Typography.headline,
  },
  text: {
    marginTop: Spacing.margin,
    ...Typography.body,
  },
  bottomContainer: {
    ...Styles.topElevatedContainerStyle,
    backgroundColor: Colors.defaultBackground,
    padding: Spacing.margin,
  },
})

export default RegionScreen
