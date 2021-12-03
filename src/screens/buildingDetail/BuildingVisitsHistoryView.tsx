import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FunctionComponent } from 'react'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import { margin, unit } from '../../styles/spacing'
import { Colors, Typography } from '../../styles'

type Props = Readonly<{}>

const BuildingVisitsHistoryView: FunctionComponent<Props> = ({}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={styles.container}>
      <DateView />
      <VisitRecordsView />
    </View>
  )
}

const DateView: FunctionComponent<Props> = ({}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={styles.dateNumberContainer}>
      <Text style={styles.dateNumber}>{'12'}</Text>
    </View>
  )
}

const VisitRecordsView: FunctionComponent<Props> = ({}) => {
  const styles = useThemedStyles(stylesFactory)

  return (
    <View style={styles.container}>
      <Text>{'ooizadnapzodnoazndâzdâzdâzdâp^o'}</Text>
    </View>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: margin,
    },
    dateNumber: {
      ...Typography.caption1,
      alignContent: 'center',
      backgroundColor: Colors.groupedListBackground,
      borderRadius: 16,
      height: 32,
      justifyContent: 'center',
      width: 32,
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
  })
}

export default BuildingVisitsHistoryView
