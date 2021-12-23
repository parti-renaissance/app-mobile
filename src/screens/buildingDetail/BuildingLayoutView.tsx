import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text } from 'react-native-paper'
import { Colors, Spacing, Typography } from '../../styles'
import { margin, unit } from '../../styles/spacing'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import i18n from '../../utils/i18n'
import CardView from '../shared/CardView'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import BuildingLayoutBlockCardView, {
  BuildingLayoutBlockCardViewModel,
} from './BuildingLayoutBlockCardView'

export interface BuildingLayoutViewModel {
  buildings: BuildingLayoutBlockCardViewModel[]
}

type Props = Readonly<{
  viewModel: BuildingLayoutViewModel
  onSelect: (buildingBlock: string, floor: number) => void
  onAddBuildingBlock: () => void
  onAddBuildingFloor: (buildingBlockId: string) => void
  editMode: boolean
}>

const BuildingLayoutView: FunctionComponent<Props> = ({
  viewModel,
  onSelect,
  onAddBuildingBlock,
  onAddBuildingFloor,
  editMode,
}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={styles.container}>
      {viewModel.buildings.map((buildingViewModel) => {
        return (
          <BuildingLayoutBlockCardView
            key={buildingViewModel.id}
            viewModel={buildingViewModel}
            style={styles.blockCard}
            onSelect={onSelect}
            onAddBuildingFloor={onAddBuildingFloor}
            editMode={editMode}
          />
        )
      })}
      {editMode ? (
        <AddBuildingCard onAddBuildingBlock={onAddBuildingBlock} />
      ) : null}
    </View>
  )
}

type AddBuildingCardProps = Readonly<{
  onAddBuildingBlock: () => void
}>

const AddBuildingCard: FunctionComponent<AddBuildingCardProps> = ({
  onAddBuildingBlock,
}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <CardView
      backgroundColor={Colors.defaultBackground}
      style={styles.newBuildingCard}
    >
      <TouchablePlatform
        touchHighlight={Colors.touchHighlight}
        onPress={() => onAddBuildingBlock()}
      >
        <View style={styles.newBuildingContainer}>
          <Image
            source={require('../../assets/images/iconMore.png')}
            style={styles.newBuildingIcon}
          />
          <Text style={styles.newBuildingText}>
            {i18n.t('building.layout.add_building')}
          </Text>
        </View>
      </TouchablePlatform>
    </CardView>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    blockCard: {
      marginVertical: unit,
    },
    container: {
      backgroundColor: Colors.defaultBackground,
      padding: margin,
    },
    newBuildingCard: {
      marginVertical: Spacing.unit,
    },
    newBuildingContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      padding: Spacing.margin,
    },
    newBuildingIcon: {
      marginHorizontal: Spacing.unit,
      tintColor: theme.primaryColor,
    },
    newBuildingText: {
      ...Typography.callout,
      color: theme.primaryColor,
    },
  })
}

export default BuildingLayoutView
