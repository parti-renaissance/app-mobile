import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { BuildingStatusViewModel } from './BuildingStatusViewModel'
import StatBlockView from './StatBlockView'

type Props = Readonly<{
  viewModel: BuildingStatusViewModel
}>

const BuildingStatusView: FunctionComponent<Props> = ({ viewModel }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Image style={styles.statusImage} source={viewModel.statusIcon} />
        <Text style={styles.statusText}>{viewModel.statusTile} </Text>
      </View>
      <View style={styles.statBlockContainer}>
        <StatBlockView viewModel={viewModel.estimatedDoorsStatBlock} />
        <StatBlockView viewModel={viewModel.doorKnockedStatBlock} />
        <StatBlockView viewModel={viewModel.completedQuestionnairesStatBlock} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    backgroundColor: Colors.secondaryButtonBackground,
    borderRadius: 8,
    margin: Spacing.margin,
    padding: Spacing.margin,
  },
  statBlockContainer: {
    backgroundColor: Colors.defaultBackground,
    borderRadius: 8,
    flexDirection: 'row',
    padding: Spacing.margin,
  },
  statusContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.unit,
    marginHorizontal: Spacing.unit,
  },
  statusImage: {
    paddingRight: Spacing.small,
  },
  statusText: {
    ...Typography.subheadline,
    paddingLeft: Spacing.small,
  },
})

export default BuildingStatusView
