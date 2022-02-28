import React, { FunctionComponent } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import RetaliationCard from './RetaliationCard'
import { PrimaryButton } from '../shared/Buttons'
import { HomeNavigatorScreenProps } from '../../navigation/HomeNavigator'
import { useRetaliationDetailScreen } from './useRetaliationDetailScreen.hook'
import { StatefulView } from '../shared/StatefulView'

type RetaliationDetailScreenProps = HomeNavigatorScreenProps<'RetaliationDetail'>

const RetaliationDetailScreen: FunctionComponent<RetaliationDetailScreenProps> = ({
  route,
}) => {
  const { statefulState, onRetaliate } = useRetaliationDetailScreen(
    route.params.retaliationId,
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView
        state={statefulState}
        contentComponent={(viewModel) => {
          return (
            <>
              <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>{viewModel.title}</Text>
                <RetaliationCard viewModel={viewModel} />
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
  },
})

export default RetaliationDetailScreen
