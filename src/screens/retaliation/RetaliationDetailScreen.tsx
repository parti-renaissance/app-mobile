import React, { FunctionComponent } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native'
import { HomeNavigatorScreenProps } from '../../navigation/home/HomeNavigatorScreenProps'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { VerticalSpacer } from '../shared/Spacer'
import { StatefulView } from '../shared/StatefulView'
import RetaliationPostCard from './RetaliationPostCard'
import { useRetaliationDetailScreen } from './useRetaliationDetailScreen.hook'
import { useLocalSearchParams } from 'expo-router'

type RetaliationDetailScreenProps =
  HomeNavigatorScreenProps<'RetaliationDetail'>

const RetaliationDetailScreen: FunctionComponent<
  RetaliationDetailScreenProps
> = () => {
  const { id } = useLocalSearchParams<{id: string}>()
  const { statefulState, onRetaliate } = useRetaliationDetailScreen(id)

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView
        state={statefulState}
        contentComponent={(viewModel) => {
          return (
            <>
              <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>{viewModel.title}</Text>
                <RetaliationPostCard viewModel={viewModel.card} />
                <VerticalSpacer spacing={Spacing.mediumMargin} />
                <Text style={styles.subtitle}>
                  {i18n.t('retaliation.title')}
                </Text>
                <Text style={styles.retaliation}>{viewModel.body}</Text>
              </ScrollView>
              <View style={styles.bottomContainer}>
                <PrimaryButton
                  title={i18n.t('retaliation.execute')}
                  onPress={onRetaliate}
                />
              </View>
            </>
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    ...Styles.topElevatedContainerStyle,
    backgroundColor: Colors.defaultBackground,
    padding: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.margin,
  },
  retaliation: {
    ...Typography.body,
    marginVertical: Spacing.unit,
  },
  subtitle: {
    ...Typography.title2,
  },
  title: {
    ...Typography.title,
    lineHeight: 34,
  },
})

export default RetaliationDetailScreen
