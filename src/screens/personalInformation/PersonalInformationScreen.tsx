import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import KeyboardOffsetView from '../shared/KeyboardOffsetView'
import LabelInputContainer from './LabelInputContainer'
import LabelTextInput from './LabelTextInput'
import GenderPicker from './GenderPicker'
import BirthdayPicker from './BirthdayPicker'
import CountryPicker from 'react-native-country-picker-modal'
import LocationPicker from './LocationPicker'
import { StatefulView } from '../shared/StatefulView'
import { ViewState } from '../shared/ViewState'
import {
  DetailedProfile,
  FormViolation,
} from '../../core/entities/DetailedProfile'
import ProfileRepository from '../../data/ProfileRepository'
import { Gender } from '../../core/entities/UserProfile'
import PhoneNumberInput from './PhoneNumberInput'
import LoadingOverlay from '../shared/LoadingOverlay'
import { ProfileFormError } from '../../core/errors'
import { PersonalInformationsForm } from '../../core/entities/PersonalInformationsForm'
import { PersonalInformationsFormMapper } from '../../core/mapper/PersonalInformationsFormMapper'
import { AlertUtils } from '../shared/AlertUtils'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import { ProfileModalNavigatorScreenProps } from '../../navigation/profileModal/ProfileModalNavigatorScreenProps'

type ContentProps = Readonly<{
  profileUuid: string
  initialForm: PersonalInformationsForm
  navigation: PersonalInformationScreenProps['navigation']
}>

const PersonalInformationScreenContent: FC<ContentProps> = ({
  profileUuid,
  initialForm,
  navigation,
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
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButtonText}>
            {i18n.t('personalinformation.cancel')}
          </Text>
        </TouchableOpacity>
      ),
      title: i18n.t('personalinformation.title'),
      headerRight: () => (
        <TouchableOpacity onPress={submit}>
          <Text style={[styles.headerButtonText, styles.headerSubmit]}>
            {i18n.t('personalinformation.save')}
          </Text>
        </TouchableOpacity>
      ),
      headerTitleStyle: styles.title,
    })
  }, [navigation, submit])

  const genderListener = (value: Gender) => {
    updateForm({ ...form, gender: value })
  }
  const onDateChange = (_: string, newDate: Date) => {
    updateForm({ ...form, birthdate: newDate })
  }
  return (
    <KeyboardOffsetView>
      <ScrollView
        style={styles.mainContainer}
        keyboardShouldPersistTaps="handled"
      >
        <LoadingOverlay visible={isLoading} />
        <View style={styles.container}>
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
            />
          </LabelInputContainer>
          <LabelInputContainer
            label={i18n.t('personalinformation.nationality')}
            errorMessage={getError(errors, 'nationality')}
          >
            <CountryPicker
              countryCode={form.countryCode}
              preferredCountries={[
                i18n.t('personalinformation.default_country_code'),
              ]}
              withFlagButton={false}
              translation={i18n.t(
                'personalinformation.country_picker_language',
              )}
              // @ts-ignore: Issue in the country picker typescript definition
              closeButtonImage={require('../../assets/images/navigationBarBack.png')}
              withCountryNameButton={true}
              containerButtonStyle={styles.countryPickerContainerButton}
              withFlag={false}
              theme={Typography.countryPicker}
              // @ts-ignore: Issue in the country picker typescript definition
              flatListProps={{
                contentContainerStyle: { paddingHorizontal: Spacing.margin },
              }}
              onSelect={(country) => {
                updateForm({ ...form, countryCode: country.cca2 })
              }}
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
              onAddressSelected={(pickedAddress) => {
                updateForm({ ...form, address: pickedAddress })
              }}
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
            defaultValue={initialForm.phoneNumber}
            label={i18n.t('personalinformation.phone')}
            placeholder={i18n.t('personalinformation.placeholder')}
            nextInput={facebookRef}
            onValueChange={(value) =>
              updateForm({ ...form, phoneNumber: value })
            }
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

type PersonalInformationScreenProps = ProfileModalNavigatorScreenProps<'PersonalInformation'>

const PersonalInformationScreen = ({
  navigation,
}: PersonalInformationScreenProps) => {
  const [statefulState, setStatefulState] = useState<
    ViewState<DetailedProfile>
  >(ViewState.Loading())

  useEffect(() => {
    const fetchData = () => {
      ProfileRepository.getInstance()
        .getDetailedProfile()
        .then((detailedProfile) => {
          setStatefulState(ViewState.Content(detailedProfile))
        })
        .catch((error) => {
          setStatefulState(
            ViewStateUtils.networkError(error, () => {
              setStatefulState(ViewState.Loading())
              fetchData()
            }),
          )
        })
    }

    fetchData()
  }, [])

  return (
    <StatefulView
      state={statefulState}
      contentComponent={(detailedProfile) => {
        const form = PersonalInformationsFormMapper.mapFromDetailedProfile(
          detailedProfile,
        )
        return (
          <PersonalInformationScreenContent
            profileUuid={detailedProfile.uuid}
            navigation={navigation}
            initialForm={form}
          />
        )
      }}
    />
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.margin,
  },
  countryPickerContainerButton: {
    alignSelf: 'flex-end',
  },
  headerButtonText: {
    ...Typography.headline,
    fontSize: 14,
    paddingHorizontal: Spacing.margin,
  },
  headerSubmit: {
    color: Colors.primaryColor,
  },
  mainContainer: {
    backgroundColor: Colors.defaultBackground,
  },
  section: {
    ...Typography.caption1,
    color: Colors.lightText,
    marginTop: Spacing.margin,
  },
  title: {
    ...Typography.title2,
    paddingHorizontal: Spacing.mediumMargin,
  },
})

export default PersonalInformationScreen
