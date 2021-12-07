import React from 'react'
import { StyleSheet, View, Text, ViewStyle } from 'react-native'
import { FunctionComponent } from 'react'
import { useThemedStyles } from '../../themes'
import { margin, unit } from '../../styles/spacing'
import { Colors, Typography } from '../../styles'
import {
  BuildingHistoryViewModel,
  BuildingVisitsDateRecordsViewModel,
  BuildingVisitsHistoryViewModel,
  DateViewModel,
  VisitRecordsViewModel,
} from './BuildingVisitsHistoryViewModel'
import KeyValueCell from './KeyValueCell'

type Props = Readonly<{ viewModel: BuildingHistoryViewModel }>

const BuildingVisitsHistoryView: FunctionComponent<Props> = ({ viewModel }) => {
  return (
    <View>
      {viewModel.buildings.map((buildingViewModel) => {
        return <BuildingVisitsHistory viewModel={buildingViewModel} />
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
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={styles.container}>
      <Text style={styles.buildingTitle}>{viewModel.buildingName}</Text>
      {viewModel.dateRecords.map((dateRecordsViewModel) => {
        return <BuildingVisitsDateRecords viewModel={dateRecordsViewModel} />
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
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={styles.dateRecordsContainer}>
      <DateView viewModel={viewModel.date} />
      <VisitRecordsView
        containerStyle={styles.visitRecords}
        viewModel={viewModel.visitRecords}
      />
    </View>
  )
}

type DateViewProps = Readonly<{ viewModel: DateViewModel }>
const DateView: FunctionComponent<DateViewProps> = ({ viewModel }) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={styles.dateContainer}>
      <View style={styles.dateNumberContainer}>
        <Text style={styles.dateNumber}>{viewModel.dayNumber}</Text>
      </View>
      <Text style={styles.dateMonthAndYear}>{viewModel.dateContext}</Text>
    </View>
  )
}

type VisitRecordsViewProps = Readonly<{
  containerStyle: ViewStyle
  viewModel: VisitRecordsViewModel
}>
const VisitRecordsView: FunctionComponent<VisitRecordsViewProps> = ({
  containerStyle,
  viewModel,
}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={containerStyle}>
      <View style={styles.visitRecordsList}>
        {viewModel.doorVisit.map((doorVisitViewModel, index) => {
          return (
            <KeyValueCell
              viewModel={doorVisitViewModel}
              bottomSeparator={index === viewModel.doorVisit.length - 1}
            />
          )
        })}
      </View>
      <Text style={styles.visitRecordListFootnote}>{viewModel.visitors}</Text>
    </View>
  )
}

const stylesFactory = () => {
  return StyleSheet.create({
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
    visitRecordListFootnote: {
      ...Typography.footnoteLight,
      marginVertical: unit,
    },
    visitRecords: {
      flex: 1,
    },
    visitRecordsList: {
      backgroundColor: Colors.groupedListBackground,
      borderRadius: unit,
    },
  })
}

export default BuildingVisitsHistoryView
