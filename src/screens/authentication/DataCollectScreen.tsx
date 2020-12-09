import React, { FunctionComponent, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { AnonymousLoginInteractor } from '../../core/interactor/AnonymousLoginInteractor'
import { DataCollectScreenProps } from '../../navigation'
import { Colors, Spacing, Styles } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import LoadingOverlay from '../shared/LoadingOverlay'
import PdfView from '../shared/PdfView'

const DataCollectScreen: FunctionComponent<DataCollectScreenProps> = ({
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
        <PdfView style={styles.pdf} assetFileName="dataprotection.pdf" />
        <View style={styles.bottomContainer}>
          <PrimaryButton
            title={i18n.t('datacollect.accept')}
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
  pdf: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
  bottomContainer: {
    ...Styles.topElevatedContainerStyle,
    backgroundColor: Colors.defaultBackground,
    padding: Spacing.margin,
  },
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
})

export default DataCollectScreen
