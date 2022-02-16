import React, { FunctionComponent, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import PersonalInformationRepository from '../../data/PersonalInformationRepository'
import { UnauthenticatedRootNavigatorScreenProps } from '../../navigation/UnauthenticatedRootNavigator'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { AlertUtils } from '../shared/AlertUtils'
import { PrimaryButton } from '../shared/Buttons'
import LabelTextInput from '../shared/LabelTextInput'
import LoadingOverlay from '../shared/LoadingOverlay'
import { CloseButton } from '../shared/NavigationHeaderButton'

type ForgottenPasswordScreenProps = UnauthenticatedRootNavigatorScreenProps<'ForgottenPassword'>

const ForgottenPasswordScreen: FunctionComponent<ForgottenPasswordScreenProps> = ({
  route,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState(route.params.email ?? '')

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
      title: i18n.t('forgot_password.title'),
      headerTintColor: Colors.darkText,
    })
  })

  const isSubmitEnabled = (): boolean => {
    return email.length > 0
  }

  const onSubmit = () => {
    setIsLoading(true)
    PersonalInformationRepository.getInstance()
      .resetPassword(email)
      .then(() => {
        navigation.goBack()
      })
      .catch((error) => AlertUtils.showNetworkAlert(error, onSubmit))
      .finally(() => setIsLoading(false))
  }

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <LoadingOverlay visible={isLoading} />
      <ScrollView>
        <Text style={styles.subtitle}>
          {i18n.t('forgot_password.subtitle')}
        </Text>
        <LabelTextInput
          label={i18n.t('forgot_password.mail')}
          textInputProps={{
            value: email,
            placeholder: i18n.t('forgot_password.mail_placeholder'),
            placeholderTextColor: Colors.lightTextOnLightBackground,
            autoCapitalize: 'none',
            keyboardType: 'default',
            returnKeyType: 'next',
            autoFocus: true,
            onChangeText: (text: string) => {
              setEmail(text)
            },
          }}
        />
        <PrimaryButton
          disabled={!isSubmitEnabled()}
          style={styles.submitButton}
          title={i18n.t('forgot_password.action')}
          onPress={onSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
    paddingHorizontal: Spacing.margin,
  },
  input: {
    borderColor: Colors.inputTextBorder,
    borderRadius: Spacing.unit,
    borderWidth: 1,
    marginTop: Spacing.margin,
    padding: Spacing.margin,
  },
  submitButton: {
    marginVertical: Spacing.margin + Spacing.unit,
  },
  subtitle: {
    ...Typography.body,
    marginVertical: Spacing.largeMargin,
  },
})

export default ForgottenPasswordScreen
