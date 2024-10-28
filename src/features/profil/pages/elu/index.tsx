import React, { useMemo } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import { useGetElectProfil } from '@/services/profile/hook'
import { isWeb, ScrollView, useMedia, YStack } from 'tamagui'
import ForceBirthdateModal from '../account/form/ForceBirthdateModal'
import CotisationHistoryEluCard from './components/CotisationHistoryEluCard'
import DeclaEluCard from './components/DeclaEluCard'
import DeclaMandateEluCard from './components/DeclaMandateEluCard'
import InfoEluCard from './components/InfoEluCard'

const EditInformations = () => {
  const media = useMedia()
  const { data: profile } = useGetElectProfil()

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
          <YStack gap={16} flex={1} $sm={{ pt: 8, gap: 8 }}>
            <ForceBirthdateModal />
            <InfoEluCard profil={profile} />
            <DeclaEluCard declaration={profile.last_revenue_declaration?.amount} cotisation={profile.contribution_amount ?? undefined} />
            <DeclaMandateEluCard profil={profile} />
            <CotisationHistoryEluCard payments={profile.payments} />
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageLayout.MainSingleColumn>
  )
}

export default EditInformations
