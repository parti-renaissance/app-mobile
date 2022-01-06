import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FunctionComponent } from 'react'
import { margin, unit } from '../../styles/spacing'
import { Colors, Typography } from '../../styles'
import {
  BuildingHistoryViewModel,
  BuildingVisitsDateRecordsViewModel,
  BuildingVisitsHistoryViewModel,
  DateViewModel,
} from './BuildingVisitsHistoryViewModel'
import KeyValueListView from './KeyValueListView'

type Props = Readonly<{ viewModel: BuildingHistoryViewModel }>

const BuildingVisitsHistoryView: FunctionComponent<Props> = ({ viewModel }) => {
  return (
    <View>
      {viewModel.buildings.map((buildingViewModel) => {
        return (
          <BuildingVisitsHistory
            key={buildingViewModel.buildingName}
            viewModel={buildingViewModel}
          />
        )
      })}
    </View>
  )
}

type BuildingVisitsHistoryProps = Readonly<{
  viewModel: BuildingVisitsHistoryViewModel
}>
const BuildingVisitsHistory: FunctionComponent<BuildingVisitsHistoryProps> = ({
  viewModel,
}) => {
  return (
    <View style={styles.container}>
      <Text key={viewModel.buildingName} style={styles.buildingTitle}>
        {viewModel.buildingName}
      </Text>
      {viewModel.dateRecords.map((dateRecordsViewModel) => {
        return (
          <BuildingVisitsDateRecords
            key={dateRecordsViewModel.key}
            viewModel={dateRecordsViewModel}
          />
        )
      })}
    </View>
  )
}

type BuildingVisitsDateRecordsProps = Readonly<{
  viewModel: BuildingVisitsDateRecordsViewModel
}>
const BuildingVisitsDateRecords: FunctionComponent<BuildingVisitsDateRecordsProps> = ({
  viewModel,
}) => {
  return (
    <View style={styles.dateRecordsContainer}>
      <DateView viewModel={viewModel.date} />
      <KeyValueListView
        containerStyle={styles.visitRecords}
        viewModel={viewModel.visitRecords}
      />
    </View>
  )
}

type DateViewProps = Readonly<{ viewModel: DateViewModel }>
const DateView: FunctionComponent<DateViewProps> = ({ viewModel }) => {
  return (
    <View style={styles.dateContainer}>
      <View style={styles.dateNumberContainer}>
        <Text style={styles.dateNumber}>{viewModel.dayNumber}</Text>
      </View>
      <Text style={styles.dateMonthAndYear}>{viewModel.dateContext}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  buildingTitle: {
    ...Typography.headline,
    marginBottom: unit,
  },
  container: {
    paddingHorizontal: margin,
    paddingVertical: unit,
  },
  dateContainer: {
    marginRight: unit,
    width: 32,
  },
  dateMonthAndYear: {
    ...Typography.caption1,
    textAlign: 'center',
  },
  dateNumber: {
    ...Typography.caption1,
    textAlign: 'center',
  },
  dateNumberContainer: {
    ...Typography.caption1,
    alignContent: 'center',
    backgroundColor: Colors.groupedListBackground,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  dateRecordsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  visitRecords: {
    flex: 1,
  },
})

export default BuildingVisitsHistoryView
