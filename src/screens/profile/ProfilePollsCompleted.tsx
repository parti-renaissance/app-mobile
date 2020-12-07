import React, { FC } from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'

import i18n from '../../utils/i18n'
import { Spacing, Typography } from '../../styles'
import { ProfilePollsCompletedViewModel } from './ProfilePollsCompletedViewModel'
import Theme from '../../themes/Theme'
import { useTheme, useThemedStyles } from '../../themes'

type Props = Readonly<{
  viewModel: ProfilePollsCompletedViewModel
}>

const ProfilePollsCompleted: FC<Props> = ({ viewModel }) => {
  const { theme } = useTheme()
  const styles = useThemedStyles(stylesFactory)
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

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flexDirection: 'column-reverse',
      resizeMode: 'contain',
      width: '100%',
      height: 62,
    },
    title: {
      ...Typography.headline,
      marginBottom: Spacing.unit,
    },
    counters: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: Spacing.unit,
      height: 77,
      backgroundColor: theme.lightBackground,
      borderRadius: 8,
    },
    counter: {
      alignItems: 'center',
    },
    counterNumber: {
      ...Typography.largeTitle,
    },
    counterLegend: {
      ...Typography.body,
    },
  })
}

export default ProfilePollsCompleted
