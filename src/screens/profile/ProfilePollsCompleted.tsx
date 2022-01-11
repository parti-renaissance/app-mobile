import React, { FC } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import i18n from '../../utils/i18n'
import { Colors, Spacing, Typography } from '../../styles'
import { ProfilePollsCompletedViewModel } from './ProfilePollsCompletedViewModel'

type Props = Readonly<{
  viewModel: ProfilePollsCompletedViewModel
}>

const ProfilePollsCompleted: FC<Props> = ({ viewModel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('profile.polls_accomplished')}</Text>
      <View style={styles.counters}>
        <View style={styles.counter}>
          <Text style={styles.counterNumber}>
            {viewModel.completedThisMonth}
          </Text>
          <Text style={styles.counterLegend}>
            {i18n.t('profile.polls_month')}
          </Text>
        </View>
        <View style={styles.counter}>
          <Text style={styles.counterNumber}>{viewModel.completed}</Text>
          <Text style={styles.counterLegend}>
            {i18n.t('profile.polls_total')}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  counter: {
    alignItems: 'center',
  },
  counterLegend: {
    ...Typography.body,
  },
  counterNumber: {
    ...Typography.title2,
  },
  counters: {
    alignItems: 'center',
    backgroundColor: Colors.lightBackground,
    borderRadius: 8,
    flexDirection: 'row',
    height: 77,
    justifyContent: 'space-around',
    marginBottom: Spacing.unit,
  },
  title: {
    ...Typography.headline,
    marginBottom: Spacing.unit,
    marginTop: Spacing.margin,
  },
})

export default ProfilePollsCompleted
