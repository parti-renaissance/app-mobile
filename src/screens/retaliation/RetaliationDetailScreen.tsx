import React, { FunctionComponent } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import RetaliationCard from './RetaliationCard'
import { PrimaryButton } from '../shared/Buttons'
import { RetaliationCardViewModelMapper } from './RetaliationCardViewModelMapper'
import { RetaliationService } from '../../data/RetaliationService'
import { HomeNavigatorScreenProps } from '../../navigation/HomeNavigator'

type RetaliationDetailScreenProps = HomeNavigatorScreenProps<'RetaliationDetail'>

const RetaliationDetailScreen: FunctionComponent<RetaliationDetailScreenProps> = ({
  route,
}) => {
  const retaliation = route.params.retaliation

  return (
    <SafeAreaView style={styles.container}>
      <>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>{retaliation.title}</Text>
          <RetaliationCard
            viewModel={RetaliationCardViewModelMapper.map(retaliation)}
          />
          <Text style={styles.subtitle}>{i18n.t('retaliation.title')}</Text>
          <Text style={styles.retaliation}>{retaliation.body}</Text>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <PrimaryButton
            title={i18n.t('retaliation.execute')}
            onPress={() => RetaliationService.retaliate(retaliation)}
          />
        </View>
      </>
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
