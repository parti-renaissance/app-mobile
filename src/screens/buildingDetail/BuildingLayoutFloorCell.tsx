import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Image, ViewStyle } from 'react-native'
import { Colors } from '../../styles'
import { margin, unit } from '../../styles/spacing'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import BuildingActionTitleView from './BuildingActionTitleView'

export interface BuildingLayoutFloorCellViewModel {
  title: string
  subtitle: string
}

type Props = Readonly<{
  viewModel: BuildingLayoutFloorCellViewModel
  style: ViewStyle
  onSelect: () => void
}>

const BuildingLayoutFloorCell: FunctionComponent<Props> = ({
  viewModel,
  style,
  onSelect,
}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={[styles.layoutContainer, style]}>
      <BuildingActionTitleView
        viewModel={{ title: viewModel.title, subtitle: viewModel.subtitle }}
      />
      <TouchablePlatform
        style={styles.arrowButton}
        onPress={() => onSelect}
        touchHighlight={Colors.touchHighlight}
      >
        <Image
          style={styles.arrowImage}
          source={require('../../assets/images/arrow.png')}
        />
      </TouchablePlatform>
    </View>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    arrowButton: {
      backgroundColor: theme.primaryColor,
      borderRadius: 22,
      margin: margin,
      padding: unit,
    },
    arrowImage: {
      tintColor: Colors.defaultBackground,
    },
    layoutContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  })
}

export default BuildingLayoutFloorCell
