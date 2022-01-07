import React, { FC, useRef, useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
} from 'react-native'

import { Colors, Spacing, Typography } from '../../styles'
import { ProfileZipCodeScreenProps } from '../../navigation'
import { Screen } from '../../navigation'
import { PrimaryButton } from '../shared/Buttons'
import LabelTextInput from '../shared/LabelTextInput'
import i18n from '../../utils/i18n'
import InputAccessoryClose from '../shared/InputAccessoryClose'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { useValidateZipCode } from '../shared/useValidateZipCode'
import { Department } from '../../core/entities/Department'
import LoadingOverlay from '../shared/LoadingOverlay'
import { UpdateZipCodeInteractor } from '../../core/interactor/UpdateZipCodeInteractor'
import CircularIcon from '../shared/CircularIcon'

const ProfileZipCodeScreen: FC<ProfileZipCodeScreenProps> = ({
  navigation,
  route,
}) => {
  const [zipCode, setZipCode] = useState(route.params.zipCode)
  const [buttonDisabled, setButtonDisabled] = useState(zipCode.length !== 5)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  )
  const inputRef = useRef<TextInput>(null)
  const inputAccessoryViewId = 'profileZipCodeInputAccessory'

  const onSuccessZipCode = async (department: Department) => {
    try {
      await new UpdateZipCodeInteractor().execute(zipCode, department)
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(GenericErrorMapper.mapErrorMessage(error))
      }
      return
    }
    navigation.navigate(Screen.profile)
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
      <View style={styles.imageWrap}>
        <CircularIcon source={require('../../assets/images/mapIcon.png')} />
      </View>
      <Text style={styles.title}>{i18n.t('profileZipCode.label')}</Text>
      <LabelTextInput
        ref={inputRef}
        style={styles.zipCode}
        errorMessage={errorMessage}
        textInputProps={{
          inputAccessoryViewID: inputAccessoryViewId,
          autoFocus: true,
          keyboardType: 'numeric',
          textContentType: 'postalCode',
          maxLength: 5,
          defaultValue: zipCode,
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
        title={i18n.t('profileZipCode.validate')}
        onPress={() => validateZipCode(zipCode)}
      />
      <InputAccessoryClose
        id={inputAccessoryViewId}
        title={i18n.t('common.keyboard.done')}
        onPress={() => inputRef.current?.blur()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  blur: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.margin,
    paddingVertical: Spacing.small,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  continueButton: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.mediumMargin,
  },
  imageWrap: {
    alignItems: 'center',
  },
  title: {
    ...Typography.subheadline,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.unit,
  },
  zipCode: {
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
  },
})

export default ProfileZipCodeScreen
