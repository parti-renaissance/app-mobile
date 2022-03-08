import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import KeyboardOffsetView from '../shared/KeyboardOffsetView'
import LabelInputContainer from './LabelInputContainer'
import LabelTextInput from './LabelTextInput'
import GenderPicker from './GenderPicker'
import BirthdayPicker from '../shared/BirthdayPicker'
import LocationPicker from './LocationPicker'
import { FormViolation } from '../../core/entities/DetailedProfile'
import ProfileRepository from '../../data/ProfileRepository'
import { Gender } from '../../core/entities/UserProfile'
import PhoneNumberInput from './PhoneNumberInput'
import LoadingOverlay from '../shared/LoadingOverlay'
import { ProfileFormError } from '../../core/errors'
import { PersonalInformationsForm } from '../../core/entities/PersonalInformationsForm'
import { AlertUtils } from '../shared/AlertUtils'
import { useNavigation } from '@react-navigation/native'
import { HeaderTextButton } from './HeaderTextButton'
import { PersonalInformationModalNavigatorScreenProps } from '../../navigation/personalInformationModal/PersonalInformationModalNavigatorScreenProps'
import { CountryRepository } from '../../data/CountryRepository'
import { NationalityListPikerViewModelMapper } from './NationalityListPikerViewModelMapper'
import { DisplayNameFormatter } from '../../utils/DisplayNameFormatter'
import { NationalityPicker } from './NationalityPicker'
import { CallingCodeListPikerViewModelMapper } from './CallingCodeListPickerViewModelMapper'

type Props = Readonly<{
  profileUuid: string
  initialForm: PersonalInformationsForm
}>

export const PersonalInformationScreenContent: FC<Props> = ({
  profileUuid,
  initialForm,
}) => {
  const [form, updateForm] = useState<PersonalInformationsForm>(initialForm)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<Array<FormViolation>>([])
  const firstNameRef = useRef<TextInput>(null)
  const lastNameRef = useRef<TextInput>(null)
  const genderOther = useRef<TextInput>(null)
  const facebookRef = useRef<TextInput>(null)
  const linkedInRef = useRef<TextInput>(null)
  const twitterRef = useRef<TextInput>(null)
  const telegramRef = useRef<TextInput>(null)

  const navigation = useNavigation<
    PersonalInformationModalNavigatorScreenProps<'PersonalInformation'>['navigation']
  >()

  const getError = (violations: Array<FormViolation>, path: string): string => {
    return violations
      .filter((error) => error.propertyPath.startsWith(path))
      .map((value) => value.message)
      .reduce((previous, current) => {
        return previous + current + '\n'
      }, '')
  }

  const submit = useCallback(() => {
    setIsLoading(true)
    setErrors([])
    ProfileRepository.getInstance()
      .updateDetailedProfile(profileUuid, form)
      .then(() => navigation.goBack())
      .catch((error) => {
        if (error instanceof ProfileFormError) {
          setErrors(error.violations)
        } else {
          AlertUtils.showNetworkAlert(error, submit)
        }
      })
      .finally(() => setIsLoading(false))
  }, [profileUuid, form, navigation])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderTextButton
          title={i18n.t('personalinformation.save')}
          type="primary"
          onPress={submit}
        />
      ),
    })
  }, [navigation, submit])

  const genderListener = (value: Gender) => {
    updateForm({ ...form, gender: value })
  }
  const onDateChange = (newDate: Date) => {
    updateForm({ ...form, birthdate: newDate })
  }

  const onLocationPickerPress = () => {
    navigation.navigate('LocationPickerModal', {
      screen: 'LocationPicker',
      params: {
        onAddressSelected: (pickedAddress) => {
          updateForm({ ...form, address: pickedAddress })
        },
      },
    })
  }

  const onNationalityPress = () => {
    const countries = CountryRepository.getInstance().getCountries()
    navigation.navigate('ListPickerModal', {
      screen: 'ListPicker',
      params: {
        title: i18n.t('personalinformation.nationality'),
        items: NationalityListPikerViewModelMapper.map(countries),
        selectedItemId: form.countryCode,
        onItemSelected: (id) => {
          const selectedCountry = countries.find((c) => c.code === id)
          if (selectedCountry !== undefined) {
            updateForm({ ...form, countryCode: selectedCountry.code })
          }
        },
        displaySearch: true,
        presentationType: 'modal',
      },
    })
  }

  const onCallingCodePress = () => {
    const countries = CountryRepository.getInstance().getCountries()
    navigation.navigate('ListPickerModal', {
      screen: 'ListPicker',
      params: {
        title: i18n.t('personalinformation.calling_code'),
        items: CallingCodeListPikerViewModelMapper.map(countries),
        selectedItemId: form.countryCode,
        onItemSelected: (id) => {
          const selectedCountry = countries.find((c) => c.code === id)
          if (selectedCountry !== undefined) {
            updateForm({
              ...form,
              phoneCountryCode: selectedCountry.code,
            })
          }
        },
        displaySearch: true,
        presentationType: 'modal',
      },
    })
  }

  return (
    <KeyboardOffsetView>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <LoadingOverlay visible={isLoading} />
        <View>
          <Text style={styles.section}>
            {i18n.t('personalinformation.section_identity')}
          </Text>
          <LabelTextInput
            ref={firstNameRef}
            nextInput={lastNameRef}
            label={i18n.t('personalinformation.first_name')}
            textInputProps={{
              textContentType: 'givenName',
            }}
            defaultValue={initialForm.firstName}
            onValueChange={(value) => updateForm({ ...form, firstName: value })}
            errorMessage={getError(errors, 'first_name')}
          />
          <LabelTextInput
            ref={lastNameRef}
            label={i18n.t('personalinformation.last_name')}
            textInputProps={{
              textContentType: 'familyName',
            }}
            defaultValue={initialForm.lastName}
            onValueChange={(value) => updateForm({ ...form, lastName: value })}
            errorMessage={getError(errors, 'last_name')}
          />
          <GenderPicker
            onValueChange={genderListener}
            defaultValue={form.gender}
            errorMessage={getError(errors, 'gender')}
          />
          {form.gender === Gender.Other ? (
            <LabelTextInput
              ref={genderOther}
              label={i18n.t('personalinformation.gender_other')}
              defaultValue={initialForm.customGender}
              onValueChange={(value) =>
                updateForm({ ...form, customGender: value })
              }
            />
          ) : null}
          <LabelInputContainer
            label={i18n.t('personalinformation.birthdate')}
            errorMessage={getError(errors, 'birthdate')}
          >
            <BirthdayPicker
              date={form.birthdate}
              placeholder={i18n.t('personalinformation.placeholder')}
              onDateChange={onDateChange}
              maximumDate={new Date()}
              textAlign="right"
            />
          </LabelInputContainer>
          <LabelInputContainer
            label={i18n.t('personalinformation.nationality')}
            errorMessage={getError(errors, 'nationality')}
          >
            <NationalityPicker
              country={DisplayNameFormatter.formatRegion(form.countryCode)}
              onPress={onNationalityPress}
            />
          </LabelInputContainer>
          <Text style={styles.section}>
            {i18n.t('personalinformation.section_coordinates')}
          </Text>
          <LabelInputContainer
            label={i18n.t('personalinformation.address')}
            errorMessage={getError(errors, 'address')}
          >
            <LocationPicker
              address={form.address}
              placeholder={i18n.t('personalinformation.placeholder')}
              onPress={onLocationPickerPress}
            />
          </LabelInputContainer>
          <LabelTextInput
            label={i18n.t('personalinformation.email')}
            textInputProps={{
              keyboardType: 'email-address',
              textContentType: 'emailAddress',
              autoCapitalize: 'none',
              autoCorrect: false,
            }}
            defaultValue={initialForm.email}
            onValueChange={(value) => updateForm({ ...form, email: value })}
            errorMessage={getError(errors, 'email_address')}
          />
          <PhoneNumberInput
            phoneNumber={initialForm.phoneNumber}
            label={i18n.t('personalinformation.phone')}
            placeholder={i18n.t('personalinformation.placeholder')}
            nextInput={facebookRef}
            onPhoneNumberChange={(value) =>
              updateForm({
                ...form,
                phoneNumber: value,
              })
            }
            onCallingCodePress={onCallingCodePress}
            callingCode={CountryRepository.getInstance().getCallingCodeForCountryCode(
              form.phoneCountryCode,
            )}
            errorMessage={getError(errors, 'phone')}
          />
          <Text style={styles.section}>
            {i18n.t('personalinformation.section_social')}
          </Text>
          <LabelTextInput
            ref={facebookRef}
            nextInput={linkedInRef}
            label={i18n.t('personalinformation.facebook')}
            defaultValue={initialForm.facebook}
            onValueChange={(value) => updateForm({ ...form, facebook: value })}
            errorMessage={getError(errors, 'facebook_page_url')}
          />
          <LabelTextInput
            ref={linkedInRef}
            nextInput={twitterRef}
            label={i18n.t('personalinformation.linkedin')}
            defaultValue={initialForm.linkedin}
            onValueChange={(value) => updateForm({ ...form, linkedin: value })}
            errorMessage={getError(errors, 'linkedin_page_url')}
          />
          <LabelTextInput
            ref={twitterRef}
            nextInput={telegramRef}
            label={i18n.t('personalinformation.twitter')}
            defaultValue={initialForm.twitter}
            onValueChange={(value) => updateForm({ ...form, twitter: value })}
            errorMessage={getError(errors, 'twitter_page_url')}
          />
          <LabelTextInput
            ref={telegramRef}
            isLastInput={true}
            label={i18n.t('personalinformation.telegram')}
            defaultValue={initialForm.telegram}
            onValueChange={(value) => updateForm({ ...form, telegram: value })}
            errorMessage={getError(errors, 'telegram_page_url')}
          />
        </View>
      </ScrollView>
    </KeyboardOffsetView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
  },
  contentContainer: {
    paddingHorizontal: Spacing.margin,
    paddingBottom: Spacing.margin,
  },
  countryPickerContainerButton: {
    alignSelf: 'flex-end',
  },
  section: {
    ...Typography.caption1,
    color: Colors.lightText,
    marginTop: Spacing.mediumMargin,
  },
})
