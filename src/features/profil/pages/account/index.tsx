import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { useGetDetailProfil } from '@/services/profile/hook'
import { YStack } from 'tamagui'
import ScrollView from '../../components/ScrollView'
import ContactForm from './form/ContactForm'
import ForceBirthdateModal from './form/ForceBirthdateModal'
import InformationsForm from './form/InformationForm'
import LocationForm from './form/LocationForm'
import RSForm from './form/RSForm'

const EditInformations = () => {
  const { data: profile } = useGetDetailProfil()

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ flex: 1 }} keyboardVerticalOffset={100}>
      <ScrollView>
        <YStack gap="$medium" flex={1} $sm={{ pt: 8, gap: 8 }}>
          <ForceBirthdateModal />

          <InformationsForm profile={profile} />
          <ContactForm profile={profile} />
          <LocationForm profile={profile} />
          <RSForm profile={profile} />
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default EditInformations
