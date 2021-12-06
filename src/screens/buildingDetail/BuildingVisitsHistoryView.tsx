import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { FunctionComponent } from 'react'
import { useThemedStyles } from '../../themes'
import { margin, unit } from '../../styles/spacing'
import { Colors, Typography } from '../../styles'

type Props = Readonly<{}>

const BuildingVisitsHistoryView: FunctionComponent<Props> = ({}) => {
  return (
    <View>
      <BuildingVisitsHistory />
      <BuildingVisitsHistory />
      <BuildingVisitsHistory />
      <BuildingVisitsHistory />
      <BuildingVisitsHistory />
    </View>
  )
}

const BuildingVisitsHistory: FunctionComponent<Props> = ({}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={styles.container}>
      {/*  2021/12/6 (Denis Poifol) stub value use a viewModel  */}
      <Text style={styles.buildingTitle}>{'Batiment A'}</Text>
      <BuildingVisitsDateRecords />
      <BuildingVisitsDateRecords />
      <BuildingVisitsDateRecords />
    </View>
  )
}

const BuildingVisitsDateRecords: FunctionComponent<Props> = ({}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={styles.dateRecordsContainer}>
      <DateView />
      <VisitRecordsView />
    </View>
  )
}

const DateView: FunctionComponent<Props> = ({}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View>
      <View style={styles.dateNumberContainer}>
        {/*  2021/12/6 (Denis Poifol) stub value use a viewModel  */}
        <Text style={styles.dateNumber}>{'12'}</Text>
      </View>
      {/*  2021/12/6 (Denis Poifol) stub value use a viewModel  */}
      <Text style={styles.dateMonthAndYear}>{'oct\n2021'}</Text>
    </View>
  )
}

const VisitRecordsView: FunctionComponent<Props> = ({}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View>
      <View style={styles.visitRecordsList}>
        <View style={styles.visitRecordsCellWithSeparator}>
          {/*  2021/12/6 (Denis Poifol) stub value use a viewModel  */}
          <Text style={styles.visitRecordDoorText}>{'ooizadnapzodn'}</Text>
          {/*  2021/12/6 (Denis Poifol) stub value use a viewModel  */}
          <Text style={styles.visitRecordStatusText}>
            {'oazndâzdâzdâzdâp^o'}
          </Text>
        </View>
        <View style={styles.visitRecordCell}>
          {/*  2021/12/6 (Denis Poifol) stub value use a viewModel  */}
          <Text style={styles.visitRecordDoorText}>{'ooizadnapzodn'}</Text>
          {/*  2021/12/6 (Denis Poifol) stub value use a viewModel  */}
          <Text style={styles.visitRecordStatusText}>
            {'oazndâzdâzdâzdâp^o'}
          </Text>
        </View>
      </View>
      <Text style={styles.visitRecordListFootnote}>
        {/*  2021/12/6 (Denis Poifol) stub value use a viewModel  */}
        {'Effectué par PierreD. & Rapphaelle E.'}
      </Text>
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
