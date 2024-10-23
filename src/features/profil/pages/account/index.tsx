import React, { useMemo } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { VoxButton } from '@/components/Button'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useSession } from '@/ctx/SessionProvider'
import { AlertUtils } from '@/screens/shared/AlertUtils'
import { useDeleteProfil, useGetDetailProfil } from '@/services/profile/hook'
import { useUserStore } from '@/store/user-store'
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
      pt: media.gtSm ? '$5' : undefined,
      pl: media.gtSm ? '$5' : undefined,
      pr: media.gtSm ? '$5' : undefined,
      pb: isWeb ? '$10' : '$12',
    }),
    [media],
  )

  return (
    <PageLayout.MainSingleColumn position="relative">
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ flex: 1 }} keyboardVerticalOffset={100}>
        <ScrollView contentContainerStyle={scrollViewContainerStyle}>
          <YStack gap={16}>
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
