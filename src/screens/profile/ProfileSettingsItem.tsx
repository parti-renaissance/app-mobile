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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    marginHorizontal: Spacing.margin,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  title: {
    ...Typography.subheadline,
  },
})

export default ProfileSettingsItem
