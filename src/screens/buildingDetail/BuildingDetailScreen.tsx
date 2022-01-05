import React, {
  FunctionComponent,
  useCallback,
  useEffect,
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
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
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
  BuildingBlockFloor,
} from '../../core/entities/BuildingBlock'
import AlphabetHelper from '../../utils/AlphabetHelper'
import { NavigationHeaderButton } from '../shared/NavigationHeaderButton'
import uuid from 'react-native-uuid'

enum Tab {
  HISTORY,
  LAYOUT,
}

const BuildingDetailScreen: FunctionComponent<BuildingDetailScreenProp> = ({
  navigation,
  route,
}) => {
  const { theme } = useTheme()
  const [tab, setTab] = useState(Tab.LAYOUT)
  const [editMode, setEditMode] = useState(false)
  const [history, setHistory] = useState<BuildingHistoryPoint[]>([])
  const [layout, setLayout] = useState<BuildingBlock[]>([])
  const viewModel = BuildingDetailScreenViewModelMapper.map(
    route.params.address,
    history,
    layout,
    theme,
  )

  const fetchLayout = useCallback(() => {
    DoorToDoorRepository.getInstance()
      .buildingBlocks(
        route.params.address.building.id,
        route.params.address.building.campaignStatistics.campaignId,
      )
      .then((value) => {
        setLayout(value)
      })
  }, [
    route.params.address.building.id,
    route.params.address.building.campaignStatistics.campaignId,
  ])

  useEffect(() => {
    const fetchHistory = () => {
      DoorToDoorRepository.getInstance()
        .buildingHistory(
          route.params.address.building.id,
          route.params.address.building.campaignStatistics.campaignId,
        )
        .then((value) => {
          setHistory(value)
        })
        .catch(() => {
          // TODO (Denis Poifol) 2021/12/16 handle error and empty array returned from WS
        })
    }

    fetchHistory()
    fetchLayout()
  }, [
    route.params.address.building.campaignStatistics.campaignId,
    route.params.address.building.id,
    fetchLayout,
  ])

  const showHistory = () => {
    setTab(Tab.HISTORY)
  }

  const showLayout = () => {
    setTab(Tab.LAYOUT)
  }

  const createEmptyFloor = (name: number): BuildingBlockFloor => {
    return {
      number: name,
      id: uuid.v4() as string,
      status: 'todo',
      nbSurveys: 0,
      visitedDoors: [],
      local: true,
    }
  }

  const createEmptyBlock = (name: string): BuildingBlock => {
    return {
      name: name,
      floors: [createEmptyFloor(0)],
      id: uuid.v4() as string,
      status: 'todo',
      local: true,
    }
  }

  const addNewBuildingBlock = () => {
    let nextBuildingBlock: string
    if (layout.length > 0) {
      nextBuildingBlock = AlphabetHelper.nextLetterInAlphabet(
        layout[layout.length - 1].name,
      )
    } else {
      nextBuildingBlock = 'A'
    }
    layout.push(createEmptyBlock(nextBuildingBlock))
    setLayout([...layout])
  }

  const addNewBuildingFloor = (buildingBlockId: string) => {
    const block = layout.find((item) => item.id === buildingBlockId)
    if (block) {
      const nextFloor = block.floors.length
      block.floors.push(createEmptyFloor(nextFloor))
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
      DoorToDoorRepository.getInstance()
        .openBuildingBlock(
          route.params.address.building.campaignStatistics.campaignId,
          route.params.address.building.id,
          block.name,
        )
        .then(() => fetchLayout())
    } else {
      DoorToDoorRepository.getInstance()
        .closeBuildingBlock(
          route.params.address.building.campaignStatistics.campaignId,
          route.params.address.building.id,
          block.name,
        )
        .then(() => fetchLayout())
    }
  }

  const renderTab = (currentTab: Tab) => {
    switch (currentTab) {
      case Tab.HISTORY:
        return <BuildingVisitsHistoryView viewModel={viewModel.history} />
      case Tab.LAYOUT:
        return (
          <BuildingLayoutView
            viewModel={viewModel.buildingLayout}
            editMode={editMode}
            onSelect={(buildingBlock: string, floor: number) => {
              navigation.navigate(Screen.doorToDoorTunnelModal, {
                screen: Screen.tunnelDoorBrief,
                params: {
                  campaignId: viewModel.campaignId,
                  buildingParams: {
                    id: route.params.address.building.id,
                    block: buildingBlock,
                    floor: floor,
                    door: 1, // TODO: (Romain GF) when door selection screen is available, update the value with the real door number
                  },
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
          />
        )
    }
  }

  const shouldDisplayEdit = route.params.address.building.type === 'building'

  return (
    <SafeAreaView style={styles.container}>
      <>
        {/* TODO: (Romain GF) when navigation is fixed, move icon in navigation headerRight */}
        {shouldDisplayEdit ? (
          <NavigationHeaderButton
            source={require('../../assets/images/edit.png')}
            onPress={() => {
              setEditMode(!editMode)
            }}
            style={styles.edit}
          />
        ) : null}
        <ScrollView>
          <Image source={viewModel.illustration} />
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
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  edit: {
    alignSelf: 'flex-end',
    marginEnd: Spacing.unit,
  },
  lastVisit: {
    ...Typography.body,
    marginBottom: margin,
    textAlign: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderColor: Colors.primaryColor,
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
