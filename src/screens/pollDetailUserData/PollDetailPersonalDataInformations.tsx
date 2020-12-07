import React from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import { Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import i18n from '../../utils/i18n'

const PollDetailPersonalDataInformations = () => {
  const { theme } = useTheme()
  return (
    <ScrollView>
      <Image style={styles.image} source={theme.image.personalData()} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{i18n.t('personal_data.title')}</Text>
        <Text style={styles.content}>{i18n.t('personal_data.message')}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: undefined,
    aspectRatio: 396 / 301,
    marginBottom: Spacing.unit,
  },
  textContainer: {
    paddingHorizontal: Spacing.margin,
  },
  title: {
    ...Typography.largeTitle,
  },
  content: {
    ...Typography.body,
    marginVertical: Spacing.margin,
  },
})

export default PollDetailPersonalDataInformations
