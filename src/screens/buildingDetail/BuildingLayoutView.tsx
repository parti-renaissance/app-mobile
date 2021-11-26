import React, { FunctionComponent } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Colors, Typography } from '../../styles'
import { margin, small, unit } from '../../styles/spacing'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import { TouchablePlatform } from '../shared/TouchablePlatform'
import { BuildingLayoutViewModel } from './BuildingLayoutViewModel'

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
      <View style={styles.card}>
        <View style={styles.statusContainer}>
          <Image
            style={styles.statusImage}
            source={viewModel.buildingTypeIcon}
          />
          <Text style={styles.statusText}>{viewModel.buildingTypeName} </Text>
        </View>
        <View style={styles.layoutContainer}>
          <Text style={styles.actionText}>{viewModel.layout.actionTitle}</Text>
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
    </View>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    actionText: {
      ...Typography.callout,
      margin: margin,
    },
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
        width: 4,
        height: 10,
      },
      shadowOpacity: 10,
    },
    container: {
      backgroundColor: Colors.defaultBackground,
      padding: margin,
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

export default BuildingLayoutView
