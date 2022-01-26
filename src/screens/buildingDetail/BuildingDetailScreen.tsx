import React, {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import { BuildingDetailScreenProp, Screen } from '../../navigation'
import BuildingStatusView from './BuilidingStatusView'
import { margin, mediumMargin } from '../../styles/spacing'
import BuildingLayoutView from './BuildingLayoutView'
import { BuildingDetailScreenViewModelMapper } from './BuildingDetailScreenViewModelMapper'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import i18n from '../../utils/i18n'
import BuildingVisitsHistoryView from './BuildingVisitsHistoryView'
import DoorToDoorRepository from '../../data/DoorToDoorRepository'
import { BuildingHistoryPoint } from '../../core/entities/BuildingHistory'
import {
  BuildingBlock,
  BuildingBlockHelper,
} from '../../core/entities/BuildingBlock'
import AlphabetHelper from '../../utils/AlphabetHelper'
import { NavigationHeaderButton } from '../shared/NavigationHeaderButton'
import { AlertUtils } from '../shared/AlertUtils'
import LoadingOverlay from '../shared/LoadingOverlay'
import { PrimaryButton } from '../shared/Buttons'
import { BuildingType, DoorToDoorAddress } from '../../core/entities/DoorToDoor'
import { useIsFocused } from '@react-navigation/native'
import { UpdateBuildingLayoutInteractor } from '../../core/interactor/UpdateBuildingLayoutInteractor'
import { DoorToDoorCampaignInfoView } from '../doorToDoor/DoorToDoorCampaignCard'
import {
  DoorToDoorCampaignInfo,
  GetDoorToDoorCampaignInfoInteractor,
} from '../../core/interactor/GetDoorToDoorCampaignInfoInteractor'
import { DoorToDoorCampaignCardViewModelMapper } from '../doorToDoor/DoorToDoorCampaignCardViewModelMapper'
import { DoorToDoorCampaignCardViewModel } from '../doorToDoor/DoorToDoorCampaignCardViewModel'

enum Tab {
  HISTORY,
  LAYOUT,
}

const BuildingDetailScreen: FunctionComponent<BuildingDetailScreenProp> = ({
  navigation,
  route,
}) => {
  const isFocused = useIsFocused()
  const [isLoading, setIsloading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [tab, setTab] = useState(Tab.LAYOUT)
  const [history, setHistory] = useState<BuildingHistoryPoint[]>([])
  const [layout, setLayout] = useState<BuildingBlock[]>([])
  const [
    campaignCardViewModel,
    setCampaignCardViewModel,
  ] = useState<DoorToDoorCampaignCardViewModel>()
  const [address, setAddress] = useState(route.params.address)
  const viewModel = BuildingDetailScreenViewModelMapper.map(
    address,
    history,
    layout,
  )
  const buildingBlockHelper = new BuildingBlockHelper()
  const buildingStatus = address.building.campaignStatistics.status

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavigationHeaderButton
          source={require('../../assets/images/edit.png')}
          onPress={changeBuildingType}
          style={styles.edit}
        />
      ),
    })
  })

  const fetchLayout = async (): Promise<Array<BuildingBlock>> => {
    return await new UpdateBuildingLayoutInteractor().execute(
      route.params.address.building.id,
      route.params.address.building.campaignStatistics.campaignId,
      route.params.address.building.type,
      layout,
    )
  }

  const fetchHistory = async (): Promise<Array<BuildingHistoryPoint>> => {
    return await DoorToDoorRepository.getInstance().buildingHistory(
      route.params.address.building.id,
      route.params.address.building.campaignStatistics.campaignId,
    )
  }

  const fetchCampaignInfo = async (): Promise<DoorToDoorCampaignInfo> => {
    return await new GetDoorToDoorCampaignInfoInteractor().execute(
      address.building.campaignStatistics.campaignId,
    )
  }

  const fetchAddress = async (): Promise<DoorToDoorAddress | null> =>
    await DoorToDoorRepository.getInstance().getAddress(address.id)

  const refreshData = async () => {
    setIsRefreshing(true)
    const newBlocks = await fetchLayout()
    const freshAddress = await fetchAddress()
    const freshHistory = await fetchHistory()
    const freshCampaignInfo = await fetchCampaignInfo()
    setLayout(newBlocks)
    if (freshAddress) {
      setAddress(freshAddress)
    }
    setHistory(freshHistory)
    setCampaignCardViewModel(
      DoorToDoorCampaignCardViewModelMapper.map(freshCampaignInfo),
    )
    setIsRefreshing(false)
  }

  useEffect(() => {
    if (isFocused) {
      refreshData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused])

  const showHistory = () => {
    setTab(Tab.HISTORY)
  }

  const showLayout = () => {
    setTab(Tab.LAYOUT)
  }

  const addNewBuildingBlock = () => {
    let nextBuildingBlock: string
    if (layout.length > 0) {
      nextBuildingBlock = AlphabetHelper.nextLetterInAlphabet(
        layout[layout.length - 1].name,
      )
    } else {
      nextBuildingBlock = AlphabetHelper.firstLetterInAlphabet
    }
    layout.push(
      buildingBlockHelper.createLocalBlock(
        nextBuildingBlock,
        address.building.type,
      ),
    )
    setLayout([...layout])
  }

  const addNewBuildingFloor = (buildingBlockId: string) => {
    const block = layout.find((item) => item.id === buildingBlockId)
    if (block) {
      const nextFloor = (block.floors[block.floors.length - 1]?.number ?? 0) + 1
      block.floors.push(buildingBlockHelper.createLocalFloor(nextFloor))
      setLayout([...layout])
    }
  }

  const removeBuildingBlock = (buildingBlockId: string) => {
    const block = layout.find((item) => item.id === buildingBlockId)
    if (block) {
      const index = layout.indexOf(block, 0)
      if (index > -1) {
        layout.splice(index, 1)
        setLayout([...layout])
      }
    }
  }

  const removeBuildingFloor = (
    buildingBlockId: string,
    floorNumber: number,
  ) => {
    const block = layout.find((item) => item.id === buildingBlockId)
    const floor = block?.floors?.find((item) => item.number === floorNumber)
    if (block && floor) {
      const index = block.floors.indexOf(floor, 0)
      block.floors.splice(index, 1)
      setLayout([...layout])
    }
  }

  const handleBuildingAction = (buildingBlockId: string) => {
    const block = layout.find((item) => item.id === buildingBlockId)
    if (!block) return
    if (block.status === 'completed') {
      setIsloading(true)
      DoorToDoorRepository.getInstance()
        .openBuildingBlock(
          address.building.campaignStatistics.campaignId,
          address.building.id,
          block.name,
        )
        .then(() => refreshData())
        .finally(() => setIsloading(false))
    } else {
      AlertUtils.showSimpleAlert(
        i18n.t('building.layout.close_building_alert.title'),
        i18n.t('building.layout.close_building_alert.message'),
        i18n.t('building.layout.close_building_alert.action'),
        i18n.t('building.layout.close_building_alert.cancel'),
        () => {
          setIsloading(true)
          DoorToDoorRepository.getInstance()
            .closeBuildingBlock(
              address.building.campaignStatistics.campaignId,
              address.building.id,
              block.name,
            )
            .then(() => refreshData())
            .finally(() => setIsloading(false))
        },
      )
    }
  }

  const changeBuildingType = () => {
    AlertUtils.showSimpleAlert(
      i18n.t('building.change_type_alert.title'),
      address.building.type === 'building'
        ? i18n.t('building.change_type_alert.message.building')
        : i18n.t('building.change_type_alert.message.house'),
      i18n.t('building.change_type_alert.action'),
      i18n.t('building.change_type_alert.cancel'),
      () => {
        setIsloading(true)
        let newBuildingType: BuildingType
        if (address.building.type === 'house') {
          newBuildingType = 'building'
        } else {
          newBuildingType = 'house'
        }
        DoorToDoorRepository.getInstance()
          .updateBuildingType(address.building.id, newBuildingType)
          .then(refreshData)
          .finally(() => setIsloading(false))
      },
    )
  }

  const closeAddress = () => {
    AlertUtils.showSimpleAlert(
      i18n.t('building.close_address.alert.title'),
      i18n.t('building.close_address.alert.message'),
      i18n.t('building.close_address.alert.action'),
      i18n.t('building.close_address.alert.cancel'),
      () => {
        setIsloading(true)
        DoorToDoorRepository.getInstance()
          .closeBuilding(
            address.building.campaignStatistics.campaignId,
            address.building.id,
          )
          .then(() => {
            refreshData()
          })
          .finally(() => setIsloading(false))
      },
    )
  }

  const openAddress = () => {
    AlertUtils.showSimpleAlert(
      i18n.t('building.open_address.alert.title'),
      i18n.t('building.open_address.alert.message'),
      i18n.t('building.open_address.alert.action'),
      i18n.t('building.open_address.alert.cancel'),
      () => {
        setIsloading(true)
        DoorToDoorRepository.getInstance()
          .openBuilding(
            address.building.campaignStatistics.campaignId,
            address.building.id,
          )
          .then(() => {
            refreshData()
          })
          .finally(() => setIsloading(false))
      },
    )
  }

  const renderTab = (currentTab: Tab) => {
    switch (currentTab) {
      case Tab.HISTORY:
        return <BuildingVisitsHistoryView viewModel={viewModel.history} />
      case Tab.LAYOUT:
        return (
          <BuildingLayoutView
            viewModel={viewModel.buildingLayout}
            onSelect={(buildingBlock: string, floorNumber: number) => {
              const block = layout.find((item) => item.name === buildingBlock)
              const floor = block?.floors?.find(
                (item) => item.number === floorNumber,
              )
              let canCloseFloor = false
              let door = 1
              if (block && floor) {
                canCloseFloor = floor.visitedDoors.length > 0
                if (floor.visitedDoors.length === 0) {
                  door = 1
                } else {
                  door =
                    floor.visitedDoors.sort((door1, door2) => door1 - door2)[
                      floor.visitedDoors.length - 1
                    ] + 1
                }
              }
              navigation.navigate(Screen.doorToDoorTunnelModal, {
                screen: Screen.tunnelDoorBrief,
                params: {
                  campaignId: viewModel.campaignId,
                  buildingParams: {
                    id: address.building.id,
                    type: address.building.type,
                    block: buildingBlock,
                    floor: floorNumber,
                    door: door,
                  },
                  canCloseFloor: canCloseFloor,
                },
              })
            }}
            onAddBuildingBlock={() => addNewBuildingBlock()}
            onAddBuildingFloor={(buildingBlockId: string) =>
              addNewBuildingFloor(buildingBlockId)
            }
            onRemoveBuildingBlock={(buildingBlockId: string) => {
              removeBuildingBlock(buildingBlockId)
            }}
            onRemoveBuildingFloor={(buildingBlockId: string, floor: number) => {
              removeBuildingFloor(buildingBlockId, floor)
            }}
            onBuildingAction={(buildingBlockId: string) => {
              handleBuildingAction(buildingBlockId)
            }}
            onOpenAddress={openAddress}
          />
        )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay visible={isLoading} />
      <>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing && !isLoading}
              onRefresh={refreshData}
              colors={[Colors.primaryColor]}
            />
          }
        >
          <Image source={viewModel.illustration} style={styles.illustration} />
          <Text style={styles.address}>{viewModel.address}</Text>
          <Text style={styles.lastVisit}>{viewModel.lastVisit}</Text>
          <BuildingStatusView viewModel={viewModel.status} />
          {/* The tabbar is simulated here and we are not using TabView from react-native-tab-view
              because we need to be able to scroll through the content of the tabs and react-native-tab-view
              does not provide us with a way to do it. */}
          <View style={styles.tabbarContainer}>
            <TouchablePlatform
              touchHighlight={Colors.touchHighlight}
              onPress={showLayout}
            >
              <View
                style={tab === Tab.LAYOUT ? styles.selectedTab : styles.tab}
              >
                <Text
                  style={
                    tab === Tab.LAYOUT ? styles.selectedTabText : styles.tabText
                  }
                >
                  {i18n.t('building.tabs.layout')}
                </Text>
              </View>
            </TouchablePlatform>
            <TouchablePlatform
              touchHighlight={Colors.touchHighlight}
              onPress={showHistory}
            >
              <View
                style={tab === Tab.HISTORY ? styles.selectedTab : styles.tab}
              >
                <Text
                  style={
                    tab === Tab.HISTORY
                      ? styles.selectedTabText
                      : styles.tabText
                  }
                >
                  {i18n.t('building.tabs.history')}
                </Text>
              </View>
            </TouchablePlatform>
          </View>
          {renderTab(tab)}
        </ScrollView>
        <View style={styles.bottomContainer}>
          {buildingStatus !== 'completed' ? (
            <PrimaryButton
              style={styles.closeAddress}
              onPress={closeAddress}
              title={i18n.t('building.close_address.action')}
              disabled={layout.some((block) => block.status !== 'completed')}
            />
          ) : null}
          {campaignCardViewModel ? (
            <View style={styles.elevatedContainer}>
              <DoorToDoorCampaignInfoView viewModel={campaignCardViewModel} />
            </View>
          ) : null}
        </View>
      </>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  address: {
    ...Typography.title2,
    marginTop: mediumMargin,
    textAlign: 'center',
  },
  bottomContainer: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  closeAddress: {
    marginBottom: Spacing.margin,
    marginHorizontal: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  edit: {
    alignSelf: 'flex-end',
    marginEnd: Spacing.unit,
  },
  elevatedContainer: {
    ...Styles.topElevatedContainerStyle,
  },
  illustration: {
    alignSelf: 'center',
  },
  lastVisit: {
    ...Typography.body,
    marginBottom: margin,
    textAlign: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderColor: Colors.accent,
    margin: margin,
    textAlign: 'center',
  },
  selectedTabText: {
    ...Typography.headline,
  },
  tab: {
    margin: margin,
    textAlign: 'center',
  },
  tabText: {
    ...Typography.thinHeadline,
  },
  tabbarContainer: {
    ...Typography.callout,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default BuildingDetailScreen
