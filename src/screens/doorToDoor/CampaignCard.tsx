import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import CardView from '../shared/CardView'
import ProgressBar from '../shared/ProgressBar'

export const CampaignCard = () => {
  const { theme } = useTheme()

  return (
    <CardView style={styles.card} backgroundColor={Colors.defaultBackground}>
      <View style={styles.content}>
        <View style={styles.campaign}>
          <Text style={styles.title}>Campagne nationale</Text>
          <Text style={styles.date}>jusqu’au 3 jan. 2022</Text>
        </View>
        <View>
          <Text style={styles.goal}>
            Mon objectif : <Text style={styles.indicator}>03/30</Text>
          </Text>
          <ProgressBar progress={0.3} color={theme.primaryColor} />
        </View>
      </View>
    </CardView>
  )
}

const styles = StyleSheet.create({
  campaign: {
    flex: 1,
    justifyContent: 'space-between',
  },
  card: {
    marginHorizontal: Spacing.margin,
  },
  content: {
    flexDirection: 'row',
    padding: Spacing.margin,
  },
  date: {
    ...Typography.lightCallout,
    marginTop: Spacing.small,
  },
  goal: {
    ...Typography.lightCallout,
    marginBottom: Spacing.unit,
  },
  indicator: {
    ...Typography.headline,
  },
  title: {
    ...Typography.title2,
  },
})
