import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from '../../styles'
import { margin, unit } from '../../styles/spacing'
import { useThemedStyles } from '../../themes'
import BuildingLayoutBlockCardView, {
  BuildingLayoutBlockCardViewModel,
} from './BuildingLayoutBlockCardView'

export interface BuildingLayoutViewModel {
  buildings: BuildingLayoutBlockCardViewModel[]
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
          <BuildingLayoutBlockCardView
            viewModel={buildingViewModel}
            style={styles.blockCard}
            onSelect={onSelect}
          />
        )
      })}
    </View>
  )
}

const stylesFactory = () => {
  return StyleSheet.create({
    blockCard: {
      marginVertical: unit,
    },
    container: {
      backgroundColor: Colors.defaultBackground,
      padding: margin,
    },
  })
}

export default BuildingLayoutView
