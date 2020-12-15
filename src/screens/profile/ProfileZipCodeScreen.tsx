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
import { useTheme } from '../../themes'
import InputAccessoryClose from '../shared/InputAccessoryClose'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { useValidateZipCode } from '../shared/useValidateZipCode'
import ProfileRepository from '../../data/ProfileRepository'
import { Department } from '../../core/entities/Department'
import RegionTheme from '../../core/entities/RegionTheme'
import ThemeRepository from '../../data/ThemeRepository'
import PushRepository from '../../data/PushRepository'

const ProfileZipCodeScreen: FC<ProfileZipCodeScreenProps> = ({
  navigation,
  route,
}) => {
  const { theme, setTheme } = useTheme()
  const [zipCode, setZipCode] = useState(route.params.zipCode)
  const [buttonDisabled, setButtonDisabled] = useState(zipCode.length !== 5)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  )
  const inputRef = useRef<TextInput>(null)
  const inputAccessoryViewId = 'profileZipCodeInputAccessory'

  const updateTheme = (newTheme: RegionTheme) => {
    setTheme(newTheme)
    ThemeRepository.getInstance().saveRegionTheme(newTheme)
  }

  const onSuccessZipCode = async (department: Department) => {
    await ProfileRepository.getInstance().saveZipCode(zipCode)
    try {
      await PushRepository.getInstance().subscribeToDepartment(department)
      await PushRepository.getInstance().subscribeToRegion(department.region)
    } catch (error) {
      //no-op
    }
    updateTheme(department.region.theme)
    navigation.navigate(Screen.profile)
  }
  const onErrorZipCode = (error: Error) => {
    setErrorMessage(GenericErrorMapper.mapErrorMessage(error))
  }
  const onInvalidFormat = () => {
    setErrorMessage(i18n.t('anonymousloginzipcode.invalid_code'))
  }
  const { validateZipCode } = useValidateZipCode(
    onSuccessZipCode,
    onErrorZipCode,
    onInvalidFormat,
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrap}>
        <Image source={theme.image.zipCode()} />
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
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
  imageWrap: {
    alignItems: 'center',
  },
  title: {
    ...Typography.subheadline,
    marginTop: Spacing.unit,
    marginHorizontal: Spacing.margin,
  },
  zipCode: {
    marginTop: Spacing.margin,
    marginHorizontal: Spacing.margin,
  },
  continueButton: {
    marginTop: Spacing.mediumMargin,
    marginHorizontal: Spacing.margin,
  },
  blur: {
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.margin,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

export default ProfileZipCodeScreen
