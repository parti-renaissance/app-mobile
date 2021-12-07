import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
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
      <VisitRecordsView viewModel={viewModel.visitRecords} />
    </View>
  )
}

type DateViewProps = Readonly<{ viewModel: DateViewModel }>
const DateView: FunctionComponent<DateViewProps> = ({ viewModel }) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View>
      <View style={styles.dateNumberContainer}>
        <Text style={styles.dateNumber}>{viewModel.dayNumber}</Text>
      </View>
      <Text style={styles.dateMonthAndYear}>{viewModel.dateContext}</Text>
    </View>
  )
}

type VisitRecordsViewProps = Readonly<{ viewModel: VisitRecordsViewModel }>
const VisitRecordsView: FunctionComponent<VisitRecordsViewProps> = ({
  viewModel,
}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View>
      <View style={styles.visitRecordsList}>
        {viewModel.doorVisit.map((doorVisitViewModel, index) => {
          return (
            <View
              style={
                index === viewModel.doorVisit.length - 1
                  ? styles.visitRecordCell
                  : styles.visitRecordsCellWithSeparator
              }
            >
              <Text style={styles.visitRecordDoorText}>
                {doorVisitViewModel.door}
              </Text>
              <Text style={styles.visitRecordStatusText}>
                {doorVisitViewModel.status}
              </Text>
            </View>
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
      flex: 1,
      justifyContent: 'space-between',
      maxWidth: Dimensions.get('window').width,
    },
    visitRecordCell: {
      flexDirection: 'row',
    },
    visitRecordDoorText: {
      ...Typography.body,
      margin: unit,
    },
    visitRecordListFootnote: {
      ...Typography.footnoteLight,
      marginVertical: unit,
    },
    visitRecordStatusText: {
      ...Typography.lightBody,
      margin: unit,
    },
    visitRecordsCellWithSeparator: {
      borderBottomColor: Colors.separator,
      borderBottomWidth: 2,
      flexDirection: 'row',
    },
    visitRecordsList: {
      backgroundColor: Colors.groupedListBackground,
      borderRadius: unit,
      flexShrink: 1,
    },
  })
}

export default BuildingVisitsHistoryView
