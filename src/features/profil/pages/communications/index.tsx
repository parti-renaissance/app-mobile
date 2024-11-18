import React, { useMemo } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import { useGetDetailProfil } from '@/services/profile/hook'
import { ScrollView, useMedia, YStack } from 'tamagui'
import ContactForm from '../account/form/ContactForm'
import ForceBirthdateModal from '../account/form/ForceBirthdateModal'
import NotificationForm from './components/NotificationForm'

const EditInformations = () => {
  const media = useMedia()
  const { data: profile } = useGetDetailProfil()

  const scrollViewContainerStyle = useMemo(
    () => ({
      pt: media.gtSm ? '$medium' : undefined,
      pl: media.gtSm ? '$medium' : undefined,
      pr: media.gtSm ? '$medium' : undefined,
      pb: 'xxlarge',
    }),
    [media],
  )

  return (
    <PageLayout.MainSingleColumn position="relative">
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ flex: 1 }} keyboardVerticalOffset={100}>
        <ScrollView contentContainerStyle={scrollViewContainerStyle}>
          <YStack gap="$medium" flex={1} $sm={{ pt: '$medium' }}>
            <ForceBirthdateModal />

            <ContactForm profile={profile} />
            <NotificationForm profile={profile} />
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageLayout.MainSingleColumn>
  )
}

export default EditInformations
