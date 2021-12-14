import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from '../../styles'
import { margin } from '../../styles/spacing'
import { useThemedStyles } from '../../themes'
import BuildingLayoutBuildingCardView, {
  BuildingLayoutBuildingCardViewModel,
} from './BuildingLayoutBuildingCardView'

export interface BuildingLayoutViewModel {
  buildings: BuildingLayoutBuildingCardViewModel[]
}

type Props = Readonly<{
  viewModel: BuildingLayoutViewModel
  onSelect: () => void
}>

const BuildingLayoutView: FunctionComponent<Props> = ({
  viewModel,
  onSelect,
}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={styles.container}>
      {viewModel.buildings.map((buildingViewModel) => {
        return (
          <BuildingLayoutBuildingCardView
            viewModel={buildingViewModel}
            onSelect={onSelect}
          />
        )
      })}
    </View>
  )
}

const stylesFactory = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: Colors.defaultBackground,
      padding: margin,
    },
  })
}

export default BuildingLayoutView
