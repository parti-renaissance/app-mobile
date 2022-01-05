import React, { FC } from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'

import i18n from '../../utils/i18n'
import { Colors, Spacing, Typography } from '../../styles'
import { ProfilePollsCompletedViewModel } from './ProfilePollsCompletedViewModel'
import { useTheme } from '../../themes'

type Props = Readonly<{
  viewModel: ProfilePollsCompletedViewModel
}>

const ProfilePollsCompleted: FC<Props> = ({ viewModel }) => {
  const { theme } = useTheme()
  return (
    <View style={styles.container}>
      <ImageBackground source={theme.image.profilePoll()} style={styles.image}>
        <Text style={styles.title}>{i18n.t('profile.polls_accomplished')}</Text>
      </ImageBackground>
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
    ...Typography.largeTitle,
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
  image: {
    flexDirection: 'column-reverse',
    height: 62,
    resizeMode: 'contain',
    width: '100%',
  },
  title: {
    ...Typography.headline,
    marginBottom: Spacing.unit,
  },
})

export default ProfilePollsCompleted
