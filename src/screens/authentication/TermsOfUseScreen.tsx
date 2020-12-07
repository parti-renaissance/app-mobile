import React, { FunctionComponent, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { AnonymousLoginInteractor } from '../../core/interactor/AnonymousLoginInteractor'
import { TermsOfUseScreenProps } from '../../navigation'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import LoadingOverlay from '../shared/LoadingOverlay'

const TermsOfUseScreen: FunctionComponent<TermsOfUseScreenProps> = ({
  route,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const displayError = (error: string) => {
    Alert.alert(
      i18n.t('common.error_title'),
      error,
      [
        {
          text: i18n.t('common.error_retry'),
          onPress: authenticate,
        },
        {
          text: i18n.t('common.cancel'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
  }

  const authenticate = () => {
    setIsLoading(true)
    new AnonymousLoginInteractor()
      .login(route.params.zipCode)
      .catch((error) => displayError(GenericErrorMapper.mapErrorMessage(error)))
      .finally(() => setIsLoading(false))
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay visible={isLoading} />
      <View style={styles.contentContainer}>
        <ScrollView style={styles.textContainer}>
          <Text style={styles.title}>{i18n.t('termsofuse.title')}</Text>
          <Text style={styles.content}>{i18n.t('termsofuse.content')}</Text>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <PrimaryButton
            title={i18n.t('termsofuse.accept')}
            onPress={authenticate}
          />
        </View>
      </View>
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
  bottomContainer: {
    ...Styles.topElevatedContainerStyle,
    backgroundColor: Colors.defaultBackground,
    padding: Spacing.margin,
  },
  title: {
    ...Typography.largeTitle,
    marginTop: Spacing.unit,
    marginHorizontal: Spacing.margin,
  },
  content: {
    ...Typography.body,
    margin: Spacing.margin,
  },
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
})

export default TermsOfUseScreen
