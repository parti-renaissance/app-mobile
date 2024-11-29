import React, { useMemo } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { usePageLayoutScroll } from '@/components/layouts/PageLayout/usePageLayoutScroll'
import { useGetDetailProfil } from '@/services/profile/hook'
import { useMedia, YStack } from 'tamagui'
import ScrollView from '../../components/ScrollView'
import ContactForm from '../account/form/ContactForm'
import ForceBirthdateModal from '../account/form/ForceBirthdateModal'
import NotificationForm from './components/NotificationForm'

const EditInformations = () => {
  const media = useMedia()
  const { data: profile } = useGetDetailProfil()
  const { isWebPageLayoutScrollActive } = usePageLayoutScroll()

  const scrollViewContainerStyle = useMemo(
    () => ({
      pt: media.gtSm ? '$medium' : undefined,
      pl: media.gtSm ? '$medium' : undefined,
      pr: media.gtSm ? '$medium' : undefined,
      pb: '$11',
    }),
    [media],
  )

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ flex: 1 }} keyboardVerticalOffset={100}>
      <ScrollView>
        <YStack gap="$medium" flex={1} $sm={{ pt: '$medium' }}>
          <ForceBirthdateModal />

          <ContactForm profile={profile} />
          <NotificationForm profile={profile} />
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default EditInformations
