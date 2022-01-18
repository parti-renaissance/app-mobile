import CheckBox from '@react-native-community/checkbox'
import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  Alert,
  KeyboardTypeOptions,
  ScrollView,
  StyleSheet,
  Text,
  TextInputProps,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FormViolation } from '../../core/entities/DetailedProfile'
import { SignUpScreenProps } from '../../navigation'
import { Colors, Spacing, Styles, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import BirthdayPicker from '../personalInformation/BirthdayPicker'
import LabelInputContainer from '../personalInformation/LabelInputContainer'
import LocationPicker from '../personalInformation/LocationPicker'
import PhoneNumberInput from '../personalInformation/PhoneNumberInput'
import { PrimaryButton } from '../shared/Buttons'
import KeyboardOffsetView from '../shared/KeyboardOffsetView'
import LabelTextInput from '../shared/LabelTextInput'
import LoadingOverlay from '../shared/LoadingOverlay'
import HTMLView from 'react-native-htmlview'
import { SignUpFormData } from '../../core/entities/SignUpFormData'
import { Gender } from '../../core/entities/UserProfile'
import { AlertUtils } from '../shared/AlertUtils'
import PersonalInformationRepository from '../../data/PersonalInformationRepository'
import { SignUpFormError } from '../../core/errors'
import LegalRepository from '../../data/LegalRepository'

const getError = (violations: Array<FormViolation>, path: string): string => {
  return violations
    .filter((error) => error.propertyPath.startsWith(path))
    .map((value) => value.message)
    .reduce((previous, current) => {
      return previous + current + '\n'
    }, '')
}

const SignUpScreen: FunctionComponent<SignUpScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Array<FormViolation>>([])
  const [gdpr, setGdpr] = useState<string>('')
  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    gender: Gender.Female,
    mail: '',
    notificationMail: false,
    notificationSms: false,
    birthDate: undefined,
    phone: {
      countryCode: 'FR',
      callingCode: '+33',
      number: '',
    },
    address: undefined,
    gcuAccepted: false,
  })

  useEffect(() => {
    LegalRepository.getInstance()
      .getGdrp()
      .then((newGdpr) => setGdpr(newGdpr.content))
  }, [])

  const isActionEnabled = (form: SignUpFormData): boolean => {
    return (
      form.address !== undefined &&
      isValidTextInput(form.firstName) &&
      isValidTextInput(form.lastName) &&
      isValidMail(form.mail) &&
      isValidTextInput(form.address.address) &&
      isNotEmpty(form.address.city) &&
      isNotEmpty(form.address.country) &&
      isValidPostalCode(form.address.postalCode) &&
      isNotEmpty(signUpFormData.phone.number) &&
      form.gcuAccepted
    )
  }

  const submit = () => {
    setIsLoading(true)
    setErrors([])
    PersonalInformationRepository.getInstance()
      .signUp(signUpFormData)
      .then(() => showSuccessAlert())
      .catch((error) => {
        if (error instanceof SignUpFormError) {
          setErrors(error.violations)
        } else {
          AlertUtils.showNetworkAlert(error, submit)
        }
      })
      .finally(() => setIsLoading(false))
  }

  const getTextInputProps = (
    value: string,
    placeholder: string,
    onChangeText: (text: string) => void,
    keyboardType: KeyboardTypeOptions = 'default',
    autoCapitalize: TextInputProps['autoCapitalize'] = 'sentences',
  ): TextInputProps => {
    return {
      value: value,
      placeholder: placeholder,
      placeholderTextColor: Colors.lightTextOnLightBackground,
      autoCapitalize: autoCapitalize,
      keyboardType: keyboardType,
      returnKeyType: 'next',
      onChangeText: onChangeText,
    }
  }

  const showSuccessAlert = () => {
    Alert.alert(
      i18n.t('sign_up.success_alert.title'),
      i18n.t('sign_up.success_alert.message'),
      [
        {
          text: i18n.t('sign_up.success_alert.action'),
          onPress: () => {
            navigation.goBack()
          },
        },
      ],
      { cancelable: false },
    )
  }

  const renderSectionAccount = () => (
    <>
      <Text style={styles.subtitle}>{i18n.t('sign_up.account.title')}</Text>
      <LabelTextInput
        style={styles.field}
        label={i18n.t('sign_up.account.first_name')}
        errorMessage={getError(errors, 'first_name')}
        textInputProps={getTextInputProps(
          signUpFormData.firstName,
          i18n.t('sign_up.account.first_name_placeholder'),
          (text: string) => {
            setSignUpFormData({
              ...signUpFormData,
              firstName: text,
            })
          },
        )}
      />
      <LabelTextInput
        style={styles.field}
        label={i18n.t('sign_up.account.name')}
        errorMessage={getError(errors, 'last_name')}
        textInputProps={getTextInputProps(
          signUpFormData.lastName,
          i18n.t('sign_up.account.name_placeholder'),
          (text: string) => {
            setSignUpFormData({
              ...signUpFormData,
              lastName: text,
            })
          },
        )}
      />
      <LabelTextInput
        style={styles.field}
        label={i18n.t('sign_up.account.mail')}
        errorMessage={getError(errors, 'email_address')}
        textInputProps={getTextInputProps(
          signUpFormData.mail,
          i18n.t('sign_up.account.mail_placeholder'),
          (text: string) => {
            setSignUpFormData({
              ...signUpFormData,
              mail: text,
            })
          },
          'email-address',
          'none',
        )}
      />
      <View style={[styles.checkboxContainer, styles.gcuContainer]}>
        <CheckBox
          value={signUpFormData.gcuAccepted}
          boxType="square"
          onValueChange={(newValue) => {
            setSignUpFormData({
              ...signUpFormData,
              gcuAccepted: newValue,
            })
          }}
        />
        <View style={styles.checkboxText}>
          <HTMLView
            value={`<div>${i18n.t('sign_up.account.gcu')}</div>`}
            textComponentProps={styles.termsOfUse}
            stylesheet={makeHtmlViewStyle}
          />
        </View>
      </View>
    </>
  )

  const renderSectionPersonalData = () => (
    <>
      <Text style={styles.subtitle}>
        {i18n.t('sign_up.personal_data.title')}
      </Text>
      <View style={styles.field}>
        <LabelInputContainer
          label={i18n.t('sign_up.personal_data.birth_date')}
          errorMessage={getError(errors, 'birthdate')}
          labelStyle={styles.fieldTitle}
          multiLine={true}
        >
          <BirthdayPicker
            date={signUpFormData.birthDate}
            placeholder={i18n.t('sign_up.personal_data.birth_date_placeholder')}
            onDateChange={(_, date) => {
              setSignUpFormData({
                ...signUpFormData,
                birthDate: date,
              })
            }}
            style={styles.birthdayPicker}
            inputAlign="flex-start"
          />
        </LabelInputContainer>
      </View>
      <View style={styles.field}>
        <PhoneNumberInput
          labelStyle={styles.fieldTitle}
          defaultValue={signUpFormData.phone}
          label={i18n.t('sign_up.personal_data.phone')}
          placeholder={i18n.t('sign_up.personal_data.phone_placeholder')}
          onValueChange={(value) => {
            if (value) {
              setSignUpFormData({
                ...signUpFormData,
                phone: value,
              })
            }
          }}
          errorMessage={getError(errors, 'phone')}
          multiLine={true}
        />
      </View>
      <View style={styles.field}>
        <LabelInputContainer
          label={i18n.t('sign_up.personal_data.address')}
          errorMessage={getError(errors, 'address')}
          labelStyle={styles.fieldTitle}
          multiLine={true}
        >
          <LocationPicker
            address={signUpFormData.address}
            placeholder={i18n.t('sign_up.personal_data.address_placeholder')}
            onAddressSelected={(pickedAddress) => {
              setSignUpFormData({
                ...signUpFormData,
                address: pickedAddress,
              })
            }}
            textStyle={styles.textLeft}
          />
        </LabelInputContainer>
      </View>
    </>
  )

  const renderSectionNotifications = () => (
    <>
      <Text style={styles.subtitle}>
        {i18n.t('sign_up.notifications.title')}
      </Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={signUpFormData.notificationMail}
          boxType="square"
          onValueChange={(newValue) => {
            setSignUpFormData({
              ...signUpFormData,
              notificationMail: newValue,
            })
          }}
        />
        <Text style={styles.checkboxText}>
          {i18n.t('sign_up.notifications.mail')}
        </Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={signUpFormData.notificationSms}
          boxType="square"
          onValueChange={(newValue) => {
            setSignUpFormData({
              ...signUpFormData,
              notificationSms: newValue,
            })
          }}
        />
        <Text style={styles.checkboxText}>
          {i18n.t('sign_up.notifications.sms')}
        </Text>
      </View>
    </>
  )

  const renderSectionGcu = (gcu: string) => (
    <View style={styles.gcuContainer}>
      <Text style={styles.gcu}>{gcu}</Text>
    </View>
  )

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <LoadingOverlay visible={isLoading} />
      <Text style={styles.title}>{i18n.t('sign_up.title')}</Text>
      <KeyboardOffsetView>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="always"
        >
          {renderSectionAccount()}
          {renderSectionPersonalData()}
          {renderSectionNotifications()}
          {renderSectionGcu(gdpr)}
        </ScrollView>
      </KeyboardOffsetView>
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t('sign_up.action')}
          onPress={submit}
          disabled={!isActionEnabled(signUpFormData)}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  birthdayPicker: {
    width: '100%',
  },
  bottomContainer: {
    ...Styles.topElevatedContainerStyle,
    padding: Spacing.margin,
  },
  checkbox: {
    height: 20,
    width: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.margin,
  },
  checkboxText: {
    alignSelf: 'center',
    flex: 1,
    marginStart: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  content: {
    padding: Spacing.margin,
  },
  field: {
    marginBottom: Spacing.margin,
  },
  fieldTitle: {
    ...Typography.subheadline,
  },
  gcu: {
    ...Typography.caption1,
    color: Colors.lightText,
    textAlign: 'justify',
  },
  gcuContainer: {
    marginVertical: Spacing.margin,
  },
  subtitle: {
    ...Typography.title3,
    marginVertical: Spacing.margin,
  },
  termsOfUse: {
    ...Typography.body,
  },
  textLeft: {
    textAlign: 'left',
  },
  title: {
    ...Typography.largeTitle,
    marginHorizontal: Spacing.margin,
  },
})

const makeHtmlViewStyle = StyleSheet.create({
  a: {
    color: Colors.primaryColor,
  },
})

function isNotEmpty(str: string | undefined): boolean {
  return typeof str === 'string' && str.length > 0
}

function isValidTextInput(str: string | undefined): boolean {
  return typeof str === 'string' && str.length < 50
}

function isValidMail(mail: string): boolean {
  return mail.length < 255
}

function isValidPostalCode(code: string | undefined): boolean {
  return typeof code === 'string' && code.length < 255
}

export default SignUpScreen
