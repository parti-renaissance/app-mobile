import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import ProfileRepository from '../../data/ProfileRepository'
import { Screen } from '../../navigation'
import { UnauthenticatedRootNavigatorScreenProps } from '../../navigation/UnauthenticatedRootNavigator'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import LabelTextInput from '../shared/LabelTextInput'
import LoadingOverlay from '../shared/LoadingOverlay'
import { useValidateZipCode } from '../shared/useValidateZipCode'

type AnonymousLoginZipCodeScreenProps = UnauthenticatedRootNavigatorScreenProps<'AnonymousLoginZipCode'>

const AnonymousLoginZipCodeScreen = ({
  navigation,
}: AnonymousLoginZipCodeScreenProps) => {
  const [zipCode, setZipCode] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  )

  const onSuccessZipCode = () => {
    ProfileRepository.getInstance().saveZipCode(zipCode)
    navigation.navigate(Screen.zipCodeConfirmation, {
      zipCode: zipCode,
    })
  }
  const onErrorZipCode = (error: Error) => {
    setErrorMessage(GenericErrorMapper.mapErrorMessage(error))
  }
  const onInvalidFormat = () => {
    setErrorMessage(i18n.t('anonymousloginzipcode.invalid_code'))
  }
  const { validateZipCode, isLoading } = useValidateZipCode(
    onSuccessZipCode,
    onErrorZipCode,
    onInvalidFormat,
  )

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay visible={isLoading} />
      <Text style={styles.title}>{i18n.t('anonymousloginzipcode.title')}</Text>
      <LabelTextInput
        style={styles.zipCode}
        errorMessage={errorMessage}
        textInputProps={{
          autoFocus: true,
          keyboardType: 'numeric',
          textContentType: 'postalCode',
          maxLength: 5,
          onChangeText: (text) => {
            setZipCode(text)
            setErrorMessage(undefined)
            setButtonDisabled(text.length !== 5)
          },
        }}
      />
      <PrimaryButton
        disabled={buttonDisabled}
        style={styles.continueButton}
        title={i18n.t('anonymousloginzipcode.continue')}
        onPress={() => validateZipCode(zipCode)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  continueButton: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.mediumMargin,
  },
  title: {
    ...Typography.title,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.unit,
  },
  zipCode: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.mediumMargin,
  },
})

export default AnonymousLoginZipCodeScreen
