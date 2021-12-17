import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Image, ViewStyle } from 'react-native'
import { Colors } from '../../styles'
import { margin } from '../../styles/spacing'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import BuildingActionTitleView from './BuildingActionTitleView'

export interface BuildingLayoutFloorCellViewModel {
  id: string
  title: string
  subtitle: string
  isCompleted: boolean
}

type Props = Readonly<{
  viewModel: BuildingLayoutFloorCellViewModel
  style: ViewStyle
  onSelect: (floorId: string) => void
}>

const BuildingLayoutFloorCell: FunctionComponent<Props> = ({
  viewModel,
  style,
  onSelect,
}) => {
  const styles = useThemedStyles(stylesFactory)

  function icon(): JSX.Element {
    if (!viewModel.isCompleted) {
      return (
        <TouchablePlatform
          style={styles.button}
          onPress={() => {
            onSelect(viewModel.id)
          }}
          touchHighlight={Colors.touchHighlight}
        >
          <Image
            style={styles.icon}
            source={require('../../assets/images/arrow.png')}
          />
        </TouchablePlatform>
      )
    } else {
      return (
        <View style={styles.buttonInvertedColors}>
          <Image
            style={styles.iconInvertedColors}
            source={require('../../assets/images/checkIcon.png')}
          />
        </View>
      )
    }
  }

  return (
    <View style={[styles.layoutContainer, style]}>
      <BuildingActionTitleView
        viewModel={{ title: viewModel.title, subtitle: viewModel.subtitle }}
      />
      {icon()}
    </View>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: theme.primaryColor,
      borderRadius: 16,
      height: 32,
      justifyContent: 'center',
      margin: margin,
      width: 32,
    },
    buttonInvertedColors: {
      alignItems: 'center',
      backgroundColor: Colors.defaultBackground,
      borderRadius: 16,
      height: 32,
      justifyContent: 'center',
      margin: margin,
      width: 32,
    },
    icon: {
      tintColor: Colors.defaultBackground,
    },
    iconInvertedColors: {
      tintColor: theme.primaryColor,
    },
    layoutContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  })
}

export default BuildingLayoutFloorCell
