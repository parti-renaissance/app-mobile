import React, { FunctionComponent } from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { BuildingBlockStatus } from '../../core/entities/BuildingBlock'
import { Colors, Spacing, Typography } from '../../styles'
import { margin, small } from '../../styles/spacing'
import i18n from '../../utils/i18n'
import { BorderlessButton } from '../shared/Buttons'
import CardView from '../shared/CardView'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import BuildingLayoutFloorCell, { BuildingLayoutActionType, BuildingLayoutFloorCellViewModel } from './BuildingLayoutFloorCell'

export interface BuildingLayoutBlockCardViewModel {
  id: string
  buildingTypeName: string
  buildingTypeIcon: ImageSourcePropType
  floors: BuildingLayoutFloorCellViewModel[]
  local: boolean
  status: BuildingBlockStatus
  statusAction: string
  removable: boolean
  canUpdateBuildingStatus: boolean
  canAddNewFloor: boolean
}

type Props = Readonly<{
  viewModel: BuildingLayoutBlockCardViewModel
  style: ViewStyle
  onSelect: (buildingBlock: string, floor: number) => void
  onAddBuildingFloor: (buildingBlockId: string) => void
  onRemoveBuildingBlock: (buildingBlockId: string) => void
  onRemoveBuildingFloor: (buildingBlockId: string, floor: number) => void
  onBuildingAction: (buildingBlockId: string) => void
  onLeafletAction: (buildingBlockId: string) => void
}>

const BuildingLayoutBlockCardView: FunctionComponent<Props> = ({
  viewModel,
  style,
  onSelect,
  onAddBuildingFloor,
  onRemoveBuildingBlock,
  onRemoveBuildingFloor,
  onBuildingAction,
  onLeafletAction,
}) => {
  return (
    <CardView style={style} backgroundColor={Colors.defaultBackground}>
      <View style={styles.statusContainer}>
        {viewModel.local && viewModel.removable ? (
          <View style={styles.removeContainer}>
            <TouchablePlatform touchHighlight={Colors.touchHighlight} onPress={() => onRemoveBuildingBlock(viewModel.id)}>
              <Image source={require('../../assets/images/iconCircledCross.png')} />
            </TouchablePlatform>
          </View>
        ) : null}
        <Image style={styles.statusImage} source={viewModel.buildingTypeIcon} />
        <Text style={styles.statusText}>{viewModel.buildingTypeName} </Text>
        {viewModel.canUpdateBuildingStatus ? (
          <BorderlessButton type="primary" title={viewModel.statusAction} onPress={() => onBuildingAction(viewModel.id)} style={styles.buildingAction} />
        ) : null}
      </View>
      <View style={styles.layoutContainer}>
        {viewModel.status === 'todo' && !!viewModel.floors[0] ? (
          <>
            <BuildingLayoutActionType onPress={() => onSelect(viewModel.floors[0].buildingBlock, viewModel.floors[0].floorNumber)}>
              Commencer le porte à porte
            </BuildingLayoutActionType>
            <View style={styles.separator} />
            <BuildingLayoutActionType onPress={() => onLeafletAction(viewModel.floors[0].buildingBlock)}>J’ai boité les documents</BuildingLayoutActionType>
          </>
        ) : (
          viewModel.floors.map((floorViewModel, index) => {
            return (
              <View key={floorViewModel.id}>
                <BuildingLayoutFloorCell
                  viewModel={floorViewModel}
                  style={{}}
                  onSelect={onSelect}
                  canRemove={floorViewModel.removable}
                  onRemoveBuildingFloor={(floor: number) => {
                    onRemoveBuildingFloor(viewModel.id, floor)
                  }}
                />
                {index !== viewModel.floors.length - 1 ? <View style={styles.separator} /> : null}
              </View>
            )
          })
        )}
        {viewModel.canAddNewFloor && viewModel.status !== 'todo' ? <AddBuildingFloorCard onAddBuildingFloor={() => onAddBuildingFloor(viewModel.id)} /> : null}
      </View>
    </CardView>
  )
}

type AddBuildingFloorCardProps = Readonly<{
  onAddBuildingFloor: () => void
}>

const AddBuildingFloorCard: FunctionComponent<AddBuildingFloorCardProps> = ({ onAddBuildingFloor }) => {
  return (
    <View>
      <View style={styles.separator} />
      <View style={styles.newFloorCard}>
        <TouchablePlatform touchHighlight={Colors.touchHighlight} onPress={() => onAddBuildingFloor()}>
          <View style={styles.newFloorContainer}>
            <Image source={require('../../assets/images/iconMore.png')} style={styles.newFloorIcon} />
            <Text style={styles.newFloorText}>{i18n.t('building.layout.add_floor')}</Text>
          </View>
        </TouchablePlatform>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buildingAction: {
    paddingVertical: Spacing.unit,
  },
  layoutContainer: {
    backgroundColor: Colors.secondaryButtonBackground,
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
    marginHorizontal: margin,
    marginTop: margin,
  },
  statusImage: {
    paddingRight: small,
  },
  statusText: {
    ...Typography.title3,
    flex: 1,
    marginVertical: Spacing.small,
    paddingLeft: Spacing.small,
  },
})

export default BuildingLayoutBlockCardView
