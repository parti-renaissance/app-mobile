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
import CertifiedProfileView from './CertifiedProfileView'
import LabelInputContainer from './LabelInputContainer'
import LabelTextInput from './LabelTextInput'
import GenderPicker from './GenderPicker'
import BirthdayPicker from './BirthdayPicker'
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal'
import LocationPicker from './LocationPicker'
import {
  PersonalInformationScreenProps,
  ProfileParamList,
} from '../../navigation'
import { StatefulView, ViewState } from '../shared/StatefulView'
import {
  Address,
  DetailedProfile,
  FormViolation,
  PhoneNumber,
} from '../../core/entities/DetailedProfile'
import ProfileRepository from '../../data/ProfileRepository'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { Gender } from '../../core/entities/UserProfile'
import PhoneNumberInput from './PhoneNumberInput'
import LoadingOverlay from '../shared/LoadingOverlay'
import { StackNavigationProp } from '@react-navigation/stack'
import { ProfileFormError } from '../../core/errors'

type ContentProps = Readonly<{
  profile: DetailedProfile
  navigation: StackNavigationProp<ProfileParamList, 'PersonalInformation'>
}>

const PersonalInformationScreenContent: FC<ContentProps> = ({
  profile,
  navigation,
}) => {
  const [firstName, setFirstName] = useState<string>(profile.firstName)
  const [lastName, setLastName] = useState<string>(profile.lastName)
  const [currentGender, setCurrentGender] = useState<Gender>(profile.gender)
  const [customGender, setCustomGender] = useState<string | undefined>(
    profile.customGender,
  )
  const [countryCode, setCountryCode] = useState<CountryCode>(
    profile.nationality,
  )
  const [date, setDate] = useState<Date>(profile.birthDate)
  const [address, setAddress] = useState<Address | undefined>(profile.address)
  const [email, setEmail] = useState<string>(profile.email)
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber | undefined>(
    profile.phone,
  )
  const [facebook, setFacebook] = useState<string | undefined>(profile.facebook)
  const [twitter, setTwitter] = useState<string | undefined>(profile.twitter)
  const [linkedin, setLinkedin] = useState<string | undefined>(profile.linkedin)
  const [telegram, setTelegram] = useState<string | undefined>(profile.telegram)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<Array<FormViolation>>([])
  const firstNameRef = useRef<TextInput>(null)
  const lastNameRef = useRef<TextInput>(null)
  const genderOther = useRef<TextInput>(null)
  const facebookRef = useRef<TextInput>(null)
  const linkedInRef = useRef<TextInput>(null)
  const twitterRef = useRef<TextInput>(null)
  const telegramRef = useRef<TextInput>(null)
  const isCertified = false
  const getError = (violations: Array<FormViolation>, path: string): string => {
    return violations
      .filter((error) => error.propertyPath.startsWith(path))
      .map((value) => value.message)
      .reduce((previous, current) => {
        return previous + current + '\n'
      }, '')
  }

  const submit = useCallback(() => {
    const newDetailedProfile: DetailedProfile = {
      uuid: profile.uuid,
      firstName: firstName,
      lastName: lastName,
      gender: currentGender,
      customGender: currentGender === Gender.Other ? customGender : undefined,
      nationality: countryCode,
      birthDate: date,
      address: address,
      email: email,
      phone: phoneNumber,
      facebook: facebook,
      twitter: twitter,
      linkedin: linkedin,
      telegram: telegram,
    }
    setIsLoading(true)
    setErrors([])
    ProfileRepository.getInstance()
      .updateDetailedProfile(newDetailedProfile)
      .then(() => navigation.goBack())
      .catch((error) => {
        if (error instanceof ProfileFormError) {
          setErrors(error.violations)
        }
      })
      .finally(() => setIsLoading(false))
  }, [
    firstName,
    lastName,
    address,
    currentGender,
    customGender,
    countryCode,
    date,
    email,
    phoneNumber,
    facebook,
    twitter,
    linkedin,
    telegram,
    navigation,
    profile,
  ])

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
          <Text style={styles.headerButtonText}>
            {i18n.t('personalinformation.save')}
          </Text>
        </TouchableOpacity>
      ),
      headerTitleStyle: styles.title,
    })
  }, [navigation, submit])

  const genderListener = (value: Gender) => {
    setCurrentGender(value)
  }
  const onDateChange = (_: string, newDate: Date) => {
    setDate(newDate)
  }
  return (
    <KeyboardOffsetView>
      <ScrollView
        style={styles.mainContainer}
        keyboardShouldPersistTaps="handled"
      >
        <LoadingOverlay visible={isLoading} />
        <View style={styles.container}>
          <CertifiedProfileView
            style={styles.certifiedContainer}
            isCertified={isCertified}
          />
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
            defaultValue={profile.firstName}
            onValueChange={setFirstName}
            errorMessage={getError(errors, 'first_name')}
          />
          <LabelTextInput
            ref={lastNameRef}
            label={i18n.t('personalinformation.last_name')}
            textInputProps={{
              textContentType: 'familyName',
            }}
            defaultValue={profile.lastName}
            onValueChange={setLastName}
            errorMessage={getError(errors, 'last_name')}
          />
          <GenderPicker
            onValueChange={genderListener}
            defaultValue={currentGender}
            errorMessage={getError(errors, 'gender')}
          />
          {currentGender === Gender.Other ? (
            <LabelTextInput
              ref={genderOther}
              label={i18n.t('personalinformation.gender_other')}
              defaultValue={profile.customGender}
              onValueChange={setCustomGender}
            />
          ) : null}
          <LabelInputContainer
            label={i18n.t('personalinformation.birthdate')}
            errorMessage={getError(errors, 'birthdate')}
          >
            <BirthdayPicker date={date} onDateChange={onDateChange} />
          </LabelInputContainer>
          <LabelInputContainer
            label={i18n.t('personalinformation.nationality')}
            errorMessage={getError(errors, 'nationality')}
          >
            <CountryPicker
              countryCode={countryCode}
              preferredCountries={['FR']}
              withFlagButton={false}
              translation={'fra'}
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
                setCountryCode(country.cca2)
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
              address={address}
              onAddressSelected={(pickedAddress) => {
                setAddress(pickedAddress)
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
            defaultValue={profile.email}
            onValueChange={setEmail}
            errorMessage={getError(errors, 'email_address')}
          />
          <PhoneNumberInput
            defaultValue={profile.phone}
            label={i18n.t('personalinformation.phone')}
            nextInput={facebookRef}
            onValueChange={setPhoneNumber}
            errorMessage={getError(errors, 'phone')}
          />
          <Text style={styles.section}>
            {i18n.t('personalinformation.section_social')}
          </Text>
          <LabelTextInput
            ref={facebookRef}
            nextInput={linkedInRef}
            label={i18n.t('personalinformation.facebook')}
            defaultValue={profile.facebook}
            onValueChange={setFacebook}
            errorMessage={getError(errors, 'facebook_page_url')}
          />
          <LabelTextInput
            ref={linkedInRef}
            nextInput={twitterRef}
            label={i18n.t('personalinformation.linkedin')}
            defaultValue={profile.linkedin}
            onValueChange={setLinkedin}
            errorMessage={getError(errors, 'linkedin_page_url')}
          />
          <LabelTextInput
            ref={twitterRef}
            nextInput={telegramRef}
            label={i18n.t('personalinformation.twitter')}
            defaultValue={profile.twitter}
            onValueChange={setTwitter}
            errorMessage={getError(errors, 'twitter_page_url')}
          />
          <LabelTextInput
            ref={telegramRef}
            isLastInput={true}
            label={i18n.t('personalinformation.telegram')}
            defaultValue={profile.telegram}
            onValueChange={setTelegram}
            errorMessage={getError(errors, 'telegram_page_url')}
          />
        </View>
      </ScrollView>
    </KeyboardOffsetView>
  )
}

const PersonalInformationScreen = ({
  navigation,
}: PersonalInformationScreenProps) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<DetailedProfile>
  >(new ViewState.Loading())

  useEffect(() => {
    const fetchData = () => {
      ProfileRepository.getInstance()
        .getDetailedProfile()
        .then((detailedProfile) => {
          setStatefulState(new ViewState.Content(detailedProfile))
        })
        .catch((error) => {
          setStatefulState(
            new ViewState.Error(
              GenericErrorMapper.mapErrorMessage(error),
              () => {
                setStatefulState(new ViewState.Loading())
                fetchData()
              },
            ),
          )
        })
    }

    fetchData()
  }, [])

  return (
    <StatefulView
      state={statefulState}
      contentComponent={(detailedProfile) => {
        return (
          <PersonalInformationScreenContent
            navigation={navigation}
            profile={detailedProfile}
          />
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.defaultBackground,
  },
  container: {
    padding: Spacing.margin,
    flex: 1,
  },
  certifiedContainer: {},
  section: {
    ...Typography.caption1,
    color: Colors.lightText,
    marginTop: Spacing.margin,
  },
  headerButtonText: {
    paddingHorizontal: Spacing.margin,
  },
  title: {
    ...Typography.title2,
    paddingHorizontal: Spacing.mediumMargin,
  },
  countryPickerContainerButton: {
    alignSelf: 'flex-end',
  },
})

export default PersonalInformationScreen
