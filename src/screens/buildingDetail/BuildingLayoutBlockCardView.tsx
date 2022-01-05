import React, { FunctionComponent } from 'react'
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
  Image,
  Text,
} from 'react-native'
import { BuildingType } from '../../core/entities/DoorToDoor'
import { Colors, Spacing, Typography } from '../../styles'
import { margin, small } from '../../styles/spacing'
import i18n from '../../utils/i18n'
import CardView from '../shared/CardView'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import BuildingLayoutFloorCell, {
  BuildingLayoutFloorCellViewModel,
} from './BuildingLayoutFloorCell'

export interface BuildingLayoutBlockCardViewModel {
  id: string
  buildingType: BuildingType
  buildingTypeName: string
  buildingTypeIcon: ImageSourcePropType
  floors: BuildingLayoutFloorCellViewModel[]
  local: boolean
  statusAction: string
}

type Props = Readonly<{
  viewModel: BuildingLayoutBlockCardViewModel
  style: ViewStyle
  onSelect: (buildingBlock: string, floor: number) => void
  onAddBuildingFloor: (buildingBlockId: string) => void
  onRemoveBuildingBlock: (buildingBlockId: string) => void
  onRemoveBuildingFloor: (buildingBlockId: string, floor: number) => void
  onBuildingAction: (buildingBlockId: string) => void
}>

const BuildingLayoutBlockCardView: FunctionComponent<Props> = ({
  viewModel,
  style,
  onSelect,
  onAddBuildingFloor,
  onRemoveBuildingBlock,
  onRemoveBuildingFloor,
  onBuildingAction,
}) => {
  return (
    <CardView style={style} backgroundColor={Colors.defaultBackground}>
      <View style={styles.statusContainer}>
        {viewModel.local ? (
          <View style={styles.removeContainer}>
            <TouchablePlatform
              touchHighlight={Colors.touchHighlight}
              onPress={() => onRemoveBuildingBlock(viewModel.id)}
            >
              <Image
                source={require('../../assets/images/iconCircledCross.png')}
              />
            </TouchablePlatform>
          </View>
        ) : null}
        <Image style={styles.statusImage} source={viewModel.buildingTypeIcon} />
        <Text style={styles.statusText}>{viewModel.buildingTypeName} </Text>
        <View>
          <TouchablePlatform
            touchHighlight={Colors.touchHighlight}
            onPress={() => onBuildingAction(viewModel.id)}
          >
            <Text style={styles.buildingActionText}>
              {viewModel.statusAction}
            </Text>
          </TouchablePlatform>
        </View>
      </View>
      <View style={styles.layoutContainer}>
        {viewModel.floors.map((floorViewModel, index) => {
          return (
            <View key={floorViewModel.id}>
              <BuildingLayoutFloorCell
                viewModel={floorViewModel}
                style={{}}
                onSelect={onSelect}
                canRemove={
                  floorViewModel.local &&
                  index !== 0 &&
                  index === viewModel.floors.length - 1
                }
                onRemoveBuildingFloor={(floor: number) => {
                  onRemoveBuildingFloor(viewModel.id, floor)
                }}
              />
              {index !== viewModel.floors.length - 1 ? (
                <View style={styles.separator} />
              ) : null}
            </View>
          )
        })}
        {viewModel.buildingType === 'building' ? (
          <AddBuildingFloorCard
            onAddBuildingFloor={() => onAddBuildingFloor(viewModel.id)}
          />
        ) : null}
      </View>
    </CardView>
  )
}

type AddBuildingFloorCardProps = Readonly<{
  onAddBuildingFloor: () => void
}>

const AddBuildingFloorCard: FunctionComponent<AddBuildingFloorCardProps> = ({
  onAddBuildingFloor,
}) => {
  return (
    <View>
      <View style={styles.separator} />
      <View style={styles.newFloorCard}>
        <TouchablePlatform
          touchHighlight={Colors.touchHighlight}
          onPress={() => onAddBuildingFloor()}
        >
          <View style={styles.newFloorContainer}>
            <Image
              source={require('../../assets/images/iconMore.png')}
              style={styles.newFloorIcon}
            />
            <Text style={styles.newFloorText}>
              {i18n.t('building.layout.add_floor')}
            </Text>
          </View>
        </TouchablePlatform>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buildingActionText: {
    ...Typography.callout,
    color: Colors.primaryColor,
  },
  layoutContainer: {
    backgroundColor: Colors.groupedListBackground,
    borderRadius: 8,
    margin: margin,
  },
  newFloorCard: {
    backgroundColor: Colors.secondaryButtonBackground,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    overflow: 'hidden',
  },
  newFloorContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: Spacing.margin,
  },
  newFloorIcon: {
    marginHorizontal: Spacing.unit,
    tintColor: Colors.primaryColor,
  },
  newFloorText: {
    ...Typography.callout,
  },
  removeContainer: {
    borderRadius: 32,
    marginEnd: Spacing.unit,
    overflow: 'hidden',
  },
  separator: {
    backgroundColor: Colors.separator,
    height: Spacing.separatorHeight,
  },
  statusContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: margin,
  },
  statusImage: {
    paddingRight: small,
  },
  statusText: {
    ...Typography.title3,
    flex: 1,
    paddingLeft: small,
  },
})

export default BuildingLayoutBlockCardView
