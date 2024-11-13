import React, { useMemo } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import { useGetDetailProfil } from '@/services/profile/hook'
import { isWeb, ScrollView, useMedia, YStack } from 'tamagui'
import ContactForm from './form/ContactForm'
import ForceBirthdateModal from './form/ForceBirthdateModal'
import InformationsForm from './form/InformationForm'
import LocationForm from './form/LocationForm'
import RSForm from './form/RSForm'

const EditInformations = () => {
  const media = useMedia()
  const { data: profile } = useGetDetailProfil()

  const scrollViewContainerStyle = useMemo(
    () => ({
      pt: media.gtSm ? '$medium' : undefined,
      pl: media.gtSm ? '$medium' : undefined,
      pr: media.gtSm ? '$medium' : undefined,
      pb: isWeb ? '$10' : '$12',
    }),
    [media],
  )

  return (
    <PageLayout.MainSingleColumn position="relative">
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ flex: 1 }} keyboardVerticalOffset={100}>
        <ScrollView contentContainerStyle={scrollViewContainerStyle}>
          <YStack gap={16} flex={1} $sm={{ pt: 8, gap: 8 }}>
            <ForceBirthdateModal />

            <InformationsForm profile={profile} />
            <ContactForm profile={profile} />
            <LocationForm profile={profile} />
            <RSForm profile={profile} />
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageLayout.MainSingleColumn>
  )
}

export default EditInformations
