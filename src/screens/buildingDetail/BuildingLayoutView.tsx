import React, { FunctionComponent } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Colors, Typography } from '../../styles'
import { margin, small } from '../../styles/spacing'
import { useThemedStyles } from '../../themes'
import { BuildingLayoutViewModel } from './BuildingLayoutViewModel'

type Props = Readonly<{ viewModel: BuildingLayoutViewModel }>

const BuildingLayoutView: FunctionComponent<Props> = ({ viewModel }) => {
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
        width: 4,
        height: 10,
      },
      shadowOpacity: 10,
    },
    container: {
      backgroundColor: Colors.defaultBackground,
      padding: margin,
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
