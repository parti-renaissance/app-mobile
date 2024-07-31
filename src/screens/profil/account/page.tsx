import React, { useMemo } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { Button } from '@/components'
import Text from '@/components/base/Text'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import VoxCard from '@/components/VoxCard/VoxCard'
import clientEnv from '@/config/clientEnv'
import { useSession } from '@/ctx/SessionProvider'
import { AccountForm } from '@/screens/profil/account/form/AccountForm'
import { AlertUtils } from '@/screens/shared/AlertUtils'
import { useDeleteProfil, useGetDetailProfil } from '@/services/profile/hook'
import { useUserStore } from '@/store/user-store'
import { nativeBuildVersion } from 'expo-application'
import Constants from 'expo-constants'
import * as WebBrowser from 'expo-web-browser'
import { isWeb, ScrollView, useMedia, YStack } from 'tamagui'

const EditInformations = () => {
  const media = useMedia()
  const { data: profile } = useGetDetailProfil()
  const { user } = useSession()
  const { user: credentials } = useUserStore()

  const isAdherent = !!user.data?.tags?.find((tag) => tag.type === 'adherent')
  const { signOut } = useSession()

  const { mutateAsync } = useDeleteProfil()

  const onRemoveAccountConfirmed = async () => {
    if (!isAdherent) return mutateAsync().then(() => signOut())
    const ACCOUNT_ROUTE_RE = `https://${clientEnv.APP_RENAISSANCE_HOST}/parametres/mon-compte`
    if (isWeb && window) {
      window.location.href = ACCOUNT_ROUTE_RE
    } else {
      await WebBrowser.openAuthSessionAsync(ACCOUNT_ROUTE_RE, null, { createTask: false })
    }
  }

  const removeAccount = () => {
    AlertUtils.showDestructiveAlert(
      isAdherent ? 'Désadhérer' : 'Suppression du compte',
      isAdherent ? 'Êtes-vous sûr de vouloir désadhérer ?' : 'Êtes-vous sûr de vouloir supprimer votre compte ?',
      isAdherent ? 'Désadhérer' : 'Supprimer',
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
        <ScrollView contentContainerStyle={scrollViewContainerStyle} backgroundColor={!isWeb ? '#fff' : ''}>
          <VoxCard>
            <VoxCard.Content>
              <AccountForm profile={profile} onSubmit={() => {}} />
              <Text>
                Version: v{Constants.expoConfig?.version ?? '0.0.0'} [{isWeb ? '???' : nativeBuildVersion} - {clientEnv.ENVIRONMENT}]
              </Text>
              <YStack gap="$4">
                <Button variant="outlined" size="lg" width="100%" onPress={signOut}>
                  <Button.Text>{credentials?.isAdmin ? 'Quitter l’impersonnification' : 'Me déconnecter'}</Button.Text>
                </Button>
                <Button variant="outlined" size="lg" width="100%" onPress={removeAccount}>
                  <Button.Text>{isAdherent ? 'Désadhérer' : 'Supprimer mon compte'}</Button.Text>
                </Button>
              </YStack>
            </VoxCard.Content>
          </VoxCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageLayout.MainSingleColumn>
  )
}

export default EditInformations
