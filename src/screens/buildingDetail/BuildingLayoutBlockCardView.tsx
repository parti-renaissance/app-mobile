import React, { FunctionComponent } from 'react'
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
  Image,
  Text,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { margin, small } from '../../styles/spacing'
import { useThemedStyles } from '../../themes'
import BuildingLayoutFloorCell, {
  BuildingLayoutFloorCellViewModel,
} from './BuildingLayoutFloorCell'

export interface BuildingLayoutBlockCardViewModel {
  buildingTypeName: string
  buildingTypeIcon: ImageSourcePropType
  floors: BuildingLayoutFloorCellViewModel[]
}

type Props = Readonly<{
  viewModel: BuildingLayoutBlockCardViewModel
  style: ViewStyle
  onSelect: () => void
}>

const BuildingLayoutBlockCardView: FunctionComponent<Props> = ({
  viewModel,
  style,
  onSelect,
}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={[styles.card, style]}>
      <View style={styles.statusContainer}>
        <Image style={styles.statusImage} source={viewModel.buildingTypeIcon} />
        <Text style={styles.statusText}>{viewModel.buildingTypeName} </Text>
      </View>
      <View style={styles.layoutContainer}>
        {viewModel.floors.map((floorViewModel, index) => {
          if (index !== viewModel.floors.length - 1) {
            return (
              <>
                <BuildingLayoutFloorCell
                  viewModel={floorViewModel}
                  style={{}}
                  onSelect={onSelect}
                />
                <View style={styles.separator} />
              </>
            )
          } else {
            return (
              <BuildingLayoutFloorCell
                viewModel={floorViewModel}
                style={{}}
                onSelect={onSelect}
              />
            )
          }
        })}
      </View>
    </View>
  )
}

const stylesFactory = () => {
  return StyleSheet.create({
    card: {
      backgroundColor: Colors.defaultBackground,
      borderRadius: 8,
      shadowColor: Colors.loadingOverlayBackground,
      shadowOffset: {
        width: 2,
        height: 10,
      },
      shadowOpacity: 10,
    },
    layoutContainer: {
      backgroundColor: Colors.groupedListBackground,
      borderRadius: 8,
      margin: margin,
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
      paddingLeft: small,
    },
  })
}

export default BuildingLayoutBlockCardView
