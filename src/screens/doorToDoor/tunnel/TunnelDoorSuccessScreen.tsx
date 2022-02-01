import React, {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import {
  DoorToDoorCampaignRanking,
  DoorToDoorCampaignRankingItem,
} from '../../../core/entities/DoorToDoorCampaignRanking'
import DoorToDoorRepository from '../../../data/DoorToDoorRepository'
import { Screen, DoorToDoorTunnelSuccessScreenProp } from '../../../navigation'
import { Colors, Spacing, Typography } from '../../../styles'
import i18n from '../../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../../shared/Buttons'
import { CloseButton } from '../../shared/NavigationHeaderButton'
import { RankingRowViewModel, Tab } from '../rankings/Ranking'
import { RankingHeaderView } from '../rankings/RankingHeaderView'
import { RankingRowView } from '../rankings/RankingRowView'
import { RankingTabsView } from '../rankings/RankingTabsView'
import { RankingViewModelMapper } from '../rankings/RankingViewModelMapper'

const TunnelDoorSuccessScreen: FunctionComponent<DoorToDoorTunnelSuccessScreenProp> = ({
  navigation,
  route,
}) => {
  const [tab, setTab] = useState(Tab.INDIVIDUAL)
  const [ranking, setRanking] = useState<DoorToDoorCampaignRanking>()
  const [userStats, setUserStats] = useState<DoorToDoorCampaignRankingItem>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CloseButton onPress={() => navigation.getParent()?.goBack()} />
      ),
    })
  }, [navigation])

  useEffect(() => {
    DoorToDoorRepository.getInstance()
      .getDoorToDoorCampaignRanking(route.params.campaignId, 'remote')
      .then((result) => {
        setUserStats(result.individual.find((item) => item.current))
        setRanking(result)
      })
  }, [route.params, setRanking])

  const renderItem = ({ item }: ListRenderItemInfo<RankingRowViewModel>) => (
    <RankingRowView viewModel={item} />
  )

  const renderHeader = () => {
    return (
      <>
        <Image
          style={styles.image}
          source={require('../../../assets/images/papSuccess.png')}
        />
        <Text style={styles.title}>
          {i18n.t('doorToDoor.tunnel.success.newDoor')}
        </Text>
        <Text style={styles.note}>
          {i18n.t('doorToDoor.tunnel.success.recap', {
            doorsCount: userStats?.visitedDoors ?? 0,
            pollsCount: userStats?.surveys ?? 0,
          })}
        </Text>

        <PrimaryButton
          onPress={() => {
            navigation.replace(Screen.tunnelDoorPoll, {
              campaignId: route.params.campaignId,
              buildingParams: route.params.buildingParams,
              interlocutorStatus: route.params.interlocutorStatus,
            })
          }}
          title="Interroger une autre personne dans le même foyer"
          style={styles.button}
          textStyle={styles.buttonTextStyle}
        />

        {ranking ? (
          <>
            <Text style={styles.title}>
              {i18n.t('doorToDoor.tunnel.success.ranking')}
            </Text>
            <RankingTabsView tab={tab} onPress={setTab} />
            <RankingHeaderView tab={tab} />
          </>
        ) : null}
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={RankingViewModelMapper.map(ranking, tab)}
        renderItem={renderItem}
        keyExtractor={(item) => item.rank}
      />
      <View style={styles.bottomContainer}>
        {route.params.buildingParams.type !== 'house' ? (
          <PrimaryButton
            title={i18n.t('doorToDoor.tunnel.success.knockNewDoor')}
            style={styles.newDoor}
            onPress={() => {
              const nextDoor = route.params.buildingParams.door + 1
              navigation.navigate(Screen.tunnelDoorSelectionScreen, {
                campaignId: route.params.campaignId,
                buildingParams: {
                  ...route.params.buildingParams,
                  door: nextDoor,
                },
                canCloseFloor: true,
              })
            }}
          />
        ) : null}
        <SecondaryButton
          title={i18n.t('doorToDoor.tunnel.success.stop')}
          onPress={() => navigation.getParent()?.goBack()}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: Colors.defaultBackground,
    paddingHorizontal: Spacing.margin,
    paddingTop: Spacing.margin,
  },
  button: {
    marginBottom: Spacing.margin,
    marginHorizontal: Spacing.margin,
  },
  buttonTextStyle: {
    textAlign: 'center',
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  image: {
    marginVertical: Spacing.largeMargin,
  },
  newDoor: {
    marginBottom: Spacing.unit,
  },
  note: {
    ...Typography.footnoteLight,
    margin: Spacing.margin,
  },
  title: {
    ...Typography.title2,
    marginLeft: Spacing.margin,
  },
})

export default TunnelDoorSuccessScreen
