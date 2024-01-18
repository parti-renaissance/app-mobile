import { useCallback, useEffect, useState } from 'react'
import { DeviceEventEmitter } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  DetailedProfile,
  FormViolation,
} from '../../core/entities/DetailedProfile'
import { Gender } from '../../core/entities/UserProfile'
import { ProfileFormError } from '../../core/errors'
import { CountryRepository } from '../../data/CountryRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { PersonalInformationModalNavigatorScreenProps } from '../../navigation/personalInformationModal/PersonalInformationModalNavigatorScreenProps'
import i18n from '../../utils/i18n'
import { AlertUtils } from '../shared/AlertUtils'
import { CallingCodeListPikerViewModelMapper } from './CallingCodeListPickerViewModelMapper'
import { NationalityListPikerViewModelMapper } from './NationalityListPikerViewModelMapper'
import { PersonalInformationsForm } from './PersonalInformationsForm'
import { PersonalInformationsFormMapper } from './PersonalInformationsFormMapper'
import { router } from 'expo-router'

export const usePersonalInformationScreenContent = (
  profile: DetailedProfile,
): {
  form: PersonalInformationsForm
  isLoading: boolean
  callingCode: string
  displayCustomGender: boolean
  getError: (path: string) => string
  onFirstNameChange: (firstName: string) => void
  onLastNameChange: (firstName: string) => void
  onGenderChange: (gender: Gender) => void
  onCustomGenderChange: (customGender: string) => void
  onBirthdateChange: (birthdate: Date) => void
  onNationalityPress: () => void
  onLocationPickerPress: () => void
  onEmailChange: (email: string) => void
  onPhoneNumberChange: (phoneNumber: string) => void
  onCallingCodePress: () => void
  onFacebookChange: (facebook: string) => void
  onTwitterChange: (twitter: string) => void
  onLinkedInChange: (linkedin: string) => void
  onTelegramChange: (telegram: string) => void
  onSubmit: () => void
} => {
  const [form, updateForm] = useState<PersonalInformationsForm>(
    PersonalInformationsFormMapper.map(profile),
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<Array<FormViolation>>([])

  useEffect(() => {
    DeviceEventEmitter.addListener('onAddressSelected', (address) => {
      updateForm((state) => ({
        ...state,
        address,
      }))
    })

    return () => {
      DeviceEventEmitter.removeAllListeners('onAddressSelected')
    }
  }, [])

  const navigation =
    useNavigation<
      PersonalInformationModalNavigatorScreenProps<'PersonalInformation'>['navigation']
    >()

  const getError = (path: string): string => {
    return errors
      .filter((error) => error.propertyPath.startsWith(path))
      .map((value) => value.message)
      .reduce((previous, current) => {
        return previous + current + '\n'
      }, '')
  }

  const onFirstNameChange = (firstName: string) => {
    updateForm({ ...form, firstName })
  }

  const onLastNameChange = (lastName: string) => {
    updateForm({ ...form, lastName })
  }

  const onSubmit = useCallback(() => {
    setIsLoading(true)
    setErrors([])
    ProfileRepository.getInstance()
      .updateDetailedProfile(profile.uuid, form)
      .then(() => navigation.goBack())
      .catch((error) => {
        if (error instanceof ProfileFormError) {
          setErrors(error.violations)
        } else {
          AlertUtils.showNetworkAlert(error, onSubmit)
        }
      })
      .finally(() => setIsLoading(false))
  }, [profile.uuid, form, navigation])

  const onGenderChange = (gender: Gender) => {
    updateForm({ ...form, gender })
  }

  const onCustomGenderChange = (customGender: string) => {
    updateForm({ ...form, customGender })
  }

  const onBirthdateChange = (birthdate: Date) => {
    updateForm({ ...form, birthdate })
  }

  const onLocationPickerPress = () => {
    router.push('/(tabs)/home/profile/location-picker')
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

  const onEmailChange = (email: string) => {
    updateForm({ ...form, email })
  }

  const onPhoneNumberChange = (phoneNumber: string) => {
    updateForm({ ...form, phoneNumber })
  }

  const onCallingCodePress = () => {
    const countries = CountryRepository.getInstance().getCountries()
    navigation.navigate('ListPickerModal', {
      screen: 'ListPicker',
      params: {
        title: i18n.t('personalinformation.calling_code'),
        items: CallingCodeListPikerViewModelMapper.map(countries),
        selectedItemId: form.phoneCountryCode,
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

  const onFacebookChange = (facebook: string) => {
    updateForm({ ...form, facebook })
  }

  const onTwitterChange = (twitter: string) => {
    updateForm({ ...form, twitter })
  }

  const onLinkedInChange = (linkedin: string) => {
    updateForm({ ...form, linkedin })
  }

  const onTelegramChange = (telegram: string) => {
    updateForm({ ...form, telegram })
  }

  return {
    form,
    isLoading,
    callingCode: CountryRepository.getInstance().getCallingCodeForCountryCode(
      form.phoneCountryCode,
    ),
    displayCustomGender: form.gender === Gender.Other,
    getError,
    onFirstNameChange,
    onLastNameChange,
    onGenderChange,
    onCustomGenderChange,
    onBirthdateChange,
    onNationalityPress,
    onLocationPickerPress,
    onEmailChange,
    onPhoneNumberChange,
    onCallingCodePress,
    onFacebookChange,
    onTwitterChange,
    onLinkedInChange,
    onTelegramChange,
    onSubmit,
  }
}
