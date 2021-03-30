import React, { FC } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

import { Colors, Spacing, Typography } from '../../styles'
import { TouchablePlatform } from '../shared/TouchablePlatform'
const disclosureIndicator = require('../../assets/images/disclosureIndicator.png')

type Props = Readonly<{
  title: string
  onPress: () => void
}>

const ProfileSettingsItem: FC<Props> = ({ title, onPress }) => {
  return (
    <TouchablePlatform touchHighlight={Colors.touchHighlight} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Image source={disclosureIndicator} />
      </View>
    </TouchablePlatform>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: Colors.separator,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
    marginHorizontal: Spacing.margin,
  },
  title: {
    ...Typography.subheadline,
  },
})

export default ProfileSettingsItem
