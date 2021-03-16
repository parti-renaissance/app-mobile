import React, { useRef, useState } from 'react'
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
import { gender_unknown } from '../../core/entities/PersonalInformation'
import BirthdayPicker from './BirthdayPicker'
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal'
import LocationPicker from './LocationPicker'
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete'
import { PersonalInformationScreenProps } from '../../navigation'

const PersonalInformationScreen = ({
  navigation,
}: PersonalInformationScreenProps) => {
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
      <TouchableOpacity>
        <Text style={styles.headerButtonText}>
          {i18n.t('personalinformation.save')}
        </Text>
      </TouchableOpacity>
    ),
    headerTitleStyle: styles.title,
  })
  const [currentGender, setCurrentGender] = useState<any>()
  const [countryCode, setCountryCode] = useState<CountryCode>('FR')
  const [date, setDate] = useState<string | undefined>(undefined)
  const [address, setAddress] = useState<GooglePlaceDetail | null>(null)
  const firstNameRef = useRef<TextInput>(null)
  const lastNameRef = useRef<TextInput>(null)
  const genderOther = useRef<TextInput>(null)
  const facebookRef = useRef<TextInput>(null)
  const linkedInRef = useRef<TextInput>(null)
  const twitterRef = useRef<TextInput>(null)
  const telegramRef = useRef<TextInput>(null)
  const isCertified = false
  const genderListener = (value: any) => {
    setCurrentGender(value)
  }
  const onDateChange = (newDate: string) => {
    setDate(newDate)
  }
  return (
    <KeyboardOffsetView>
      <ScrollView
        style={styles.mainContainer}
        keyboardShouldPersistTaps="handled"
      >
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
          />
          <LabelTextInput
            ref={lastNameRef}
            label={i18n.t('personalinformation.last_name')}
            textInputProps={{
              textContentType: 'familyName',
            }}
          />
          <GenderPicker onValueChange={genderListener} />
          {currentGender === gender_unknown ? (
            <LabelTextInput
              ref={genderOther}
              label={i18n.t('personalinformation.gender_other')}
            />
          ) : null}
          <LabelInputContainer label={i18n.t('personalinformation.birthdate')}>
            <BirthdayPicker date={date} onDateChange={onDateChange} />
          </LabelInputContainer>
          <LabelInputContainer
            label={i18n.t('personalinformation.nationality')}
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
              onSelect={(country) => {
                setCountryCode(country.cca2)
              }}
            />
          </LabelInputContainer>
          <Text style={styles.section}>
            {i18n.t('personalinformation.section_coordinates')}
          </Text>
          <LabelInputContainer label={i18n.t('personalinformation.address')}>
            <LocationPicker
              address={address?.formatted_address}
              onAddressSelected={(_, details) => setAddress(details)}
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
          />
          <LabelTextInput
            label={i18n.t('personalinformation.phone')}
            textInputProps={{
              keyboardType: 'phone-pad',
              textContentType: 'telephoneNumber',
              autoCapitalize: 'none',
              autoCorrect: false,
            }}
          />
          <Text style={styles.section}>
            {i18n.t('personalinformation.section_social')}
          </Text>
          <LabelTextInput
            ref={facebookRef}
            nextInput={linkedInRef}
            label={i18n.t('personalinformation.facebook')}
          />
          <LabelTextInput
            ref={linkedInRef}
            nextInput={twitterRef}
            label={i18n.t('personalinformation.linkedin')}
          />
          <LabelTextInput
            ref={twitterRef}
            nextInput={telegramRef}
            label={i18n.t('personalinformation.twitter')}
          />
          <LabelTextInput
            ref={telegramRef}
            isLastInput={true}
            label={i18n.t('personalinformation.telegram')}
          />
        </View>
      </ScrollView>
    </KeyboardOffsetView>
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
