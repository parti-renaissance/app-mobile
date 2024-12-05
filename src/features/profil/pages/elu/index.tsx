import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { useGetElectProfil } from '@/services/profile/hook'
import { YStack } from 'tamagui'
import ScrollView from '../../components/ScrollView'
import ForceBirthdateModal from '../account/form/ForceBirthdateModal'
import CotisationHistoryEluCard from './components/CotisationHistoryEluCard'
import DeclaEluCard from './components/DeclaEluCard'
import DeclaMandateEluCard from './components/DeclaMandateEluCard'
import InfoEluCard from './components/InfoEluCard'

const EditInformations = () => {
  const { data: profile } = useGetElectProfil()

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ flex: 1 }} keyboardVerticalOffset={100}>
      <ScrollView>
        <YStack gap="$medium" flex={1} $sm={{ pt: 8, gap: 8 }}>
          <ForceBirthdateModal />
          <InfoEluCard profil={profile} />
          <DeclaEluCard declaration={profile.last_revenue_declaration?.amount} cotisation={profile.contribution_amount ?? undefined} />
          <DeclaMandateEluCard profil={profile} />
          <CotisationHistoryEluCard payments={profile.payments} />
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default EditInformations
