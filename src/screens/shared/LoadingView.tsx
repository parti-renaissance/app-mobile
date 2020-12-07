import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import LoaderView from './LoaderView'

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <LoaderView style={styles.loader} />
      <Text style={styles.text}>{i18n.t('common.loading')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 0,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginBottom: Spacing.margin,
  },
  text: {
    ...Typography.body,
  },
})

export default LoadingView
