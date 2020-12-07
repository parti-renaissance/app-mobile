import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Department } from '../../core/entities/Department'
import RegionTheme from '../../core/entities/RegionTheme'
import ProfileRepository from '../../data/ProfileRepository'
import ThemeRepository from '../../data/ThemeRepository'

import { AnonymousLoginZipCodeScreenProps, Screen } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import LabelTextInput from '../shared/LabelTextInput'
import LoadingOverlay from '../shared/LoadingOverlay'
import { useValidateZipCode } from '../shared/useValidateZipCode'

const AnonymousLoginZipCodeScreen = ({
  navigation,
}: AnonymousLoginZipCodeScreenProps) => {
  const [zipCode, setZipCode] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  )

  const { setTheme } = useTheme()

  const updateTheme = (theme: RegionTheme) => {
    setTheme(theme)
    ThemeRepository.getInstance().saveRegionTheme(theme)
  }

  const onSuccessZipCode = (department: Department) => {
    ProfileRepository.getInstance().saveZipCode(zipCode)
    updateTheme(department.region.theme)
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
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
  title: {
    ...Typography.title,
    marginTop: Spacing.unit,
    marginHorizontal: Spacing.margin,
  },
  zipCode: {
    marginTop: Spacing.mediumMargin,
    marginHorizontal: Spacing.margin,
  },
  continueButton: {
    marginTop: Spacing.mediumMargin,
    marginHorizontal: Spacing.margin,
  },
})

export default AnonymousLoginZipCodeScreen
