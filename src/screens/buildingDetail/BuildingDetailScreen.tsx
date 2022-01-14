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
import {
  BuildingType,
  DoorToDoorAddress,
  DoorToDoorAddressStatus,
} from '../../core/entities/DoorToDoor'
import { useIsFocused } from '@react-navigation/native'
import { UpdateBuildingLayoutInteractor } from '../../core/interactor/UpdateBuildingLayoutInteractor'
import { DoorToDoorCampaignInfoView } from '../doorToDoor/DoorToDoorCampaignCard'
import { GetDoorToDoorCampaignInfoInteractor } from '../../core/interactor/GetDoorToDoorCampaignInfoInteractor'
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
  const [tab, setTab] = useState(Tab.LAYOUT)
  const [history, setHistory] = useState<BuildingHistoryPoint[]>([])
  const [layout, setLayout] = useState<BuildingBlock[]>([])
  const [
    campaignCardViewModel,
    setCampaignCardViewModel,
  ] = useState<DoorToDoorCampaignCardViewModel>()
  const viewModel = BuildingDetailScreenViewModelMapper.map(
    route.params.address,
    history,
    layout,
  )
  const buildingBlockHelper = new BuildingBlockHelper()
  const buildingStatus = route.params.address.building.campaignStatistics.status

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

  const fetchLayout = () => {
    new UpdateBuildingLayoutInteractor()
      .execute(
        route.params.address.building.id,
        route.params.address.building.campaignStatistics.campaignId,
        route.params.address.building.type,
        layout,
      )
      .then((blocks) => setLayout(blocks))
  }

  const fetchHistory = () => {
    DoorToDoorRepository.getInstance()
      .buildingHistory(
        route.params.address.building.id,
        route.params.address.building.campaignStatistics.campaignId,
      )
      .then((value) => {
        setHistory(value)
      })
  }

  const fetchCampaignInfo = () => {
    new GetDoorToDoorCampaignInfoInteractor()
      .execute(route.params.address.building.campaignStatistics.campaignId)
      .then((result) => {
        setCampaignCardViewModel(
          DoorToDoorCampaignCardViewModelMapper.map(result),
        )
      })
  }

  useEffect(() => {
    if (isFocused) {
      fetchHistory()
      fetchLayout()
      fetchCampaignInfo()
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
        route.params.address.building.type,
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
          route.params.address.building.campaignStatistics.campaignId,
          route.params.address.building.id,
          block.name,
        )
        .then(() => fetchLayout())
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
              route.params.address.building.campaignStatistics.campaignId,
              route.params.address.building.id,
              block.name,
            )
            .then(() => fetchLayout())
            .finally(() => setIsloading(false))
        },
      )
    }
  }

  const changeBuildingType = () => {
    AlertUtils.showSimpleAlert(
      i18n.t('building.change_type_alert.title'),
      route.params.address.building.type === 'building'
        ? i18n.t('building.change_type_alert.message.building')
        : i18n.t('building.change_type_alert.message.house'),
      i18n.t('building.change_type_alert.action'),
      i18n.t('building.change_type_alert.cancel'),
      () => {
        setIsloading(true)
        let newBuildingType: BuildingType
        if (route.params.address.building.type === 'house') {
          newBuildingType = 'building'
        } else {
          newBuildingType = 'house'
        }
        DoorToDoorRepository.getInstance()
          .updateBuildingType(route.params.address.building.id, newBuildingType)
          .then(() => {
            navigation.setParams({
              address: {
                ...route.params.address,
                building: {
                  ...route.params.address.building,
                  type: newBuildingType,
                },
              },
            })
          })
          .finally(() => setIsloading(false))
      },
    )
  }

  const updateAddressStatus = (
    address: DoorToDoorAddress,
    newStatus: DoorToDoorAddressStatus,
  ): DoorToDoorAddress => {
    return {
      ...address,
      building: {
        ...address.building,
        campaignStatistics: {
          ...address.building.campaignStatistics,
          status: newStatus,
        },
      },
    }
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
            route.params.address.building.campaignStatistics.campaignId,
            route.params.address.building.id,
          )
          .then(() => {
            navigation.setParams({
              address: updateAddressStatus(route.params.address, 'completed'),
            })
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
            route.params.address.building.campaignStatistics.campaignId,
            route.params.address.building.id,
          )
          .then(() => {
            navigation.setParams({
              address: updateAddressStatus(route.params.address, 'ongoing'),
            })
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
                    id: route.params.address.building.id,
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
        <ScrollView>
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
        {buildingStatus !== 'completed' ? (
          <PrimaryButton
            style={styles.closeAddress}
            onPress={closeAddress}
            title={i18n.t('building.close_address.action')}
          />
        ) : null}
        {campaignCardViewModel ? (
          <View style={styles.bottomContainer}>
            <DoorToDoorCampaignInfoView viewModel={campaignCardViewModel} />
          </View>
        ) : null}
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
    ...Styles.topElevatedContainerStyle,
  },
  closeAddress: {
    bottom: Spacing.extraExtraLargeMargin,
    left: 0,
    marginBottom: Spacing.margin,
    marginHorizontal: Spacing.margin,
    position: 'absolute',
    right: 0,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  edit: {
    alignSelf: 'flex-end',
    marginEnd: Spacing.unit,
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
