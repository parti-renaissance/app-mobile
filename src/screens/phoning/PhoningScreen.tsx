import React, { FunctionComponent, useCallback, useState } from 'react'
import {
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  View,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

import { PhoningScreenProp, Screen } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { PhoningRowViewModel } from './PhoningRowViewModel'
import { PhoningViewModel } from './PhoningViewModel'
import { PhoningViewModelMapper } from './PhoningViewModelMapper'
import { useFocusEffect } from '@react-navigation/core'
import PhoningTutorialRow from './tutorial/PhoningTutorialRow'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import PhoningCallContactRow from './callContact/CallContactRow'
import { PhoningCampaign } from '../../core/entities/PhoningCampaign'
import PhoningCampaignRow from './campaign/PhoningCampaignRow'
import {
  PhoningCharterNotAccepted,
  PhoningCharterState,
} from '../../core/entities/PhoningCharterState'
import i18n from '../../utils/i18n'
import { ViewStateUtils } from '../shared/ViewStateUtils'

export interface PhoningResources {
  campaigns: PhoningCampaign[]
}

const PhoningScreen: FunctionComponent<PhoningScreenProp> = ({
  navigation,
}) => {
  const [isRefreshing, setRefreshing] = useState(false)
  const [currentResources, setResources] = useState<PhoningResources>({
    campaigns: [],
  })
  const [charterState, setCharterState] = useState<
    PhoningCharterState | undefined
  >()
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<PhoningResources>
  >(new ViewState.Loading())

  const fetchData = useCallback(() => {
    setRefreshing(true)
    PhoningCampaignRepository.getInstance()
      .getPhoningCampaigns()
      .then((campaigns) => {
        setResources({ campaigns: campaigns })
        const viewModel = PhoningViewModelMapper.map(campaigns)
        setStatefulState(new ViewState.Content(viewModel))
      })
      .catch((error) => {
        setStatefulState(
          ViewStateUtils.networkError(error, () => {
            setStatefulState(new ViewState.Loading())
            fetchData()
          }),
        )
      })
      .finally(() => {
        setRefreshing(false)
      })
  }, [setResources, setStatefulState])

  const fetchCharterState = useCallback(() => {
    PhoningCampaignRepository.getInstance()
      .getPhoningCharterState()
      .then((state) => {
        setCharterState(state)
      })
      .catch(() => {
        setCharterState(undefined)
      })
  }, [])

  const findCampaignInCurrentResources = (id: string) => {
    return currentResources?.campaigns.find((campaign) => campaign.id === id)
  }

  const navigateToCampaign = (campaign: PhoningCampaign) => {
    const brief = {
      id: campaign.id,
      title: campaign.title,
      brief: campaign.brief,
    }
    if (charterState instanceof PhoningCharterNotAccepted) {
      navigation.navigate(Screen.phoningCharter, {
        data: {
          id: campaign.id,
          charter: charterState.charter,
          brief: brief,
        },
      })
    } else {
      navigation.navigate(Screen.phoningCampaignBrief, { data: brief })
    }
  }

  const renderItem = ({ item }: ListRenderItemInfo<PhoningRowViewModel>) => {
    if (item.type === 'tutorial') {
      return (
        <PhoningTutorialRow
          onPress={() => {
            navigation.navigate(Screen.phoningTutorial)
          }}
        />
      )
    } else if (item.type === 'callContact') {
      return (
        <PhoningCallContactRow
          viewModel={item.value}
          onCallButtonPressed={() => {
            const campaign = findCampaignInCurrentResources(item.value.id)
            if (campaign?.permanent) {
              navigation.navigate(Screen.phoningSessionModal, {
                screen: Screen.phoningSessionLoaderPermanentCampaign,
                params: {
                  campaignId: campaign.id,
                  campaignTitle: campaign.title,
                },
              })
            }
          }}
        />
      )
    } else if (item.type === 'campaign') {
      return (
        <PhoningCampaignRow
          viewModel={item.value}
          onCallButtonPressed={() => {
            const selectedCampaign = findCampaignInCurrentResources(
              item.value.id,
            )
            if (selectedCampaign) {
              navigateToCampaign(selectedCampaign)
            }
          }}
          onRankButtonPressed={() => {
            const selectedCampaign = findCampaignInCurrentResources(
              item.value.id,
            )
            if (selectedCampaign) {
              navigation.navigate(Screen.phoningCampaignScoreboard, {
                data: { scoreboard: selectedCampaign.scoreboard },
              })
            }
          }}
        />
      )
    }
    return null
  }

  useFocusEffect(
    useCallback(() => {
      fetchCharterState()
      fetchData()
    }, [fetchCharterState, fetchData]),
  )

  const PhoningContent = (phoningViewModel: PhoningViewModel) => {
    return (
      <FlatList
        data={phoningViewModel.rows}
        renderItem={renderItem}
        keyExtractor={(item) => item.value.id}
        refreshing={isRefreshing}
        onRefresh={fetchData}
        ListHeaderComponent={
          <Text style={styles.title}>{phoningViewModel.title}</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptySubtitle}>
              {i18n.t('phoning.subtitle_no_campaigns')}
            </Text>
          </View>
        }
        contentContainerStyle={styles.contentContainer}
      />
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      {<StatefulView contentComponent={PhoningContent} state={statefulState} />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.margin,
  },
  emptyContainer: {
    flex: 1,
    flexGrow: 1,
  },
  emptyImage: {
    alignSelf: 'center',
    flex: 1,
    height: 166,
    resizeMode: 'contain',
  },
  emptySubtitle: {
    ...Typography.body,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.mediumMargin,
    marginTop: Spacing.margin,
  },
})

export default PhoningScreen
