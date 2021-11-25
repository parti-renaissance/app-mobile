import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { Colors, Typography } from '../../styles'
import { small, margin, unit } from '../../styles/spacing'
import { useThemedStyles } from '../../themes'
import { BuildingStatusViewModel } from './BuildingStatusViewModel'
import StatBlockView from './StatBlockView'

type Props = Readonly<{
  viewModel: BuildingStatusViewModel
}>

const BuildingStatusView: FunctionComponent<Props> = ({ viewModel }) => {
  const styles = useThemedStyles(stylesFactory)
  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Image style={styles.statusImage} source={viewModel.statusIcon} />
        <Text style={styles.statusText}>{viewModel.statusTile} </Text>
      </View>
      <View style={styles.statBlockContainer}>
        <StatBlockView viewModel={viewModel.encounteredElectorsStatBlock} />
        <StatBlockView viewModel={viewModel.doorKnockedStatBlock} />
        <StatBlockView viewModel={viewModel.completedQuestionnairesStatBlock} />
      </View>
    </View>
  )
}

const stylesFactory = () => {
  return StyleSheet.create({
    container: {
      alignContent: 'center',
      backgroundColor: Colors.groupedListBackground,
      borderRadius: 8,
      flex: 1,
      margin: margin,
      padding: margin,
    },
    statBlockContainer: {
      backgroundColor: Colors.defaultBackground,
      borderRadius: 8,
      flexDirection: 'row',
      marginBottom: margin,
      padding: margin,
    },
    statusContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      margin: unit,
    },
    statusImage: {
      paddingRight: small,
    },
    statusText: {
      ...Typography.subheadline,
      paddingLeft: small,
    },
  })
}

export default BuildingStatusView
