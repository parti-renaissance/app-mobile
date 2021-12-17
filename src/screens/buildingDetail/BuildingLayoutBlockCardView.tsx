import React, { FunctionComponent } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native'
import { Colors, Typography } from '../../styles'
import { margin, small, unit } from '../../styles/spacing'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import BuildingActionTitleView, {
  BuildingActionTitleViewModel,
} from './BuildingActionTitleView'

export interface BuildingLayoutBlockCardViewModel {
  buildingTypeName: string
  buildingTypeIcon: ImageSourcePropType
  action: BuildingActionTitleViewModel
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
        <BuildingActionTitleView viewModel={viewModel.action} />
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
      alignItems: 'center',
      backgroundColor: Colors.groupedListBackground,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: margin,
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
