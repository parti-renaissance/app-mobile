import React from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'

const ProfileTermsOfUseScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.textContainer}>
        <Text style={styles.title}>{i18n.t('termsofuse.title')}</Text>
        <Text style={styles.content}>{i18n.t('termsofuse.content')}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
  textContainer: {
    flex: 1,
    flexGrow: 1,
  },
  title: {
    ...Typography.largeTitle,
    marginTop: Spacing.unit,
    marginHorizontal: Spacing.margin,
  },
  content: {
    ...Typography.body,
    margin: Spacing.margin,
    lineHeight: 19,
  },
})

export default ProfileTermsOfUseScreen
