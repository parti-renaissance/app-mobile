import React, { FunctionComponent, useEffect, useState } from 'react'
import { Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Retaliation } from '../../core/entities/Retaliation'
import RetaliationRepository from '../../data/RetaliationRepository'
import { RetaliationDetailScreenProp } from '../../navigation'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import RetaliationCard from './RetaliationCard'
import { PrimaryButton } from '../shared/Buttons'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { RetaliationCardViewModelMapper } from './RetaliationCardViewModelMapper'
import Clipboard from '@react-native-community/clipboard'

const RetaliationDetailScreen: FunctionComponent<RetaliationDetailScreenProp> = ({
  route,
}) => {
  const id = route.params.retaliationId
  const [state, setState] = useState<ViewState.Type<Retaliation>>(
    new ViewState.Loading(),
  )

  const fetchData = () => {
    RetaliationRepository.getInstance()
      .getRetaliation(id)
      .then((retaliation) => {
        setState(new ViewState.Content(retaliation))
      })
      .catch((error) => {
        setState(
          new ViewState.Error(GenericErrorMapper.mapErrorMessage(error), () => {
            fetchData()
          }),
        )
      })
  }

  const retaliate = (text: string, url: string) => {
    Clipboard.setString(text)
    Linking.openURL(url)
  }

  useEffect(fetchData, [setState])

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView
        state={state}
        contentComponent={(retaliation) => {
          return (
            <>
              <ScrollView style={styles.contentContainer}>
                <Text style={styles.title}>{retaliation.title}</Text>
                <RetaliationCard
                  viewModel={RetaliationCardViewModelMapper.map(retaliation)}
                />
                <Text style={styles.subtitle}>
                  {i18n.t('retaliation.title')}
                </Text>
                <Text style={styles.retaliation}>{retaliation.body}</Text>
              </ScrollView>
              <View style={styles.bottomContainer}>
                <PrimaryButton
                  title={i18n.t('retaliation.execute')}
                  onPress={() =>
                    retaliate(retaliation.body, retaliation.sourceUrl)
                  }
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
