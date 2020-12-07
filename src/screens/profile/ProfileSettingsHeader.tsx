import React, { FC } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'

type Props = Readonly<{
  title: string
}>

const ProfileSettingsHeader: FC<Props> = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>
}

const styles = StyleSheet.create({
  title: {
    ...Typography.caption1,
    color: Colors.lightText,
    marginTop: Spacing.largeMargin,
    paddingHorizontal: Spacing.margin,
  },
})

export default ProfileSettingsHeader
