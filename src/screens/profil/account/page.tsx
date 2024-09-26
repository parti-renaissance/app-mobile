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
  const { user } = useSession()
  const { user: credentials } = useUserStore()

  const isAdherent = !!user.data?.tags?.find((tag) => tag.type === 'adherent')
  const { signOut } = useSession()

  const { mutateAsync } = useDeleteProfil()

  const onRemoveAccountConfirmed = async () => {
    return mutateAsync().then(() => signOut())
  }

  const removeAccount = () => {
    AlertUtils.showDestructiveAlert(
      'Suppression du compte',
      'Êtes-vous sûr de vouloir supprimer votre compte ?',
      'Supprimer',
      'Annuler',
      onRemoveAccountConfirmed,
    )
  }

  const scrollViewContainerStyle = useMemo(
    () => ({
      pt: media.gtSm ? '$8' : undefined,
      pl: media.gtSm ? '$8' : undefined,
      pr: media.gtSm ? '$8' : undefined,
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
            <VoxCard>
              <VoxCard.Content>
                <YStack gap="$4">
                  <VoxButton variant="outlined" size="lg" width="100%" onPress={signOut}>
                    {credentials?.isAdmin ? 'Quitter l’impersonnification' : 'Me déconnecter'}
                  </VoxButton>
                  <VoxButton variant="outlined" size="lg" width="100%" onPress={removeAccount}>
                    {isAdherent ? 'Supprimer mon compte' : 'Supprimer mon compte'}
                  </VoxButton>
                </YStack>
              </VoxCard.Content>
            </VoxCard>
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageLayout.MainSingleColumn>
  )
}

export default EditInformations
