import React, { useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Text from '@/components/base/Text'
import { VoxButton } from '@/components/Button'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import ProfilBlock from '@/components/ProfilBlock'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useSession } from '@/ctx/SessionProvider'
import { AlertUtils } from '@/screens/shared/AlertUtils'
import { useDeleteProfil, useGetDetailProfil, useGetProfil } from '@/services/profile/hook'
import { useUserStore } from '@/store/user-store'
import { ArrowRight, Delete, HelpingHand, LogOut } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import { isWeb, ScrollView, useMedia, XStack, YStack } from 'tamagui'
import ProfilMenu from '../../components/Menu'
import Version from '../../components/Version'
import DonationCard from '../donations/components/DonationCard'
import MembershipCard from '../donations/components/MembershipCard'

const DashboardScreen = () => {
  const media = useMedia()
  const { data: profile } = useGetDetailProfil()
  const { data: me } = useGetProfil()

  const isAdherent = !!me?.tags?.find((tag) => tag.type === 'adherent')
  const { signOut } = useSession()
  const { user: credentials } = useUserStore()

  const { mutateAsync } = useDeleteProfil()

  const onRemoveAccountConfirmed = async () => {
    return mutateAsync().then(() => signOut())
  }

  const removeAccount = () => {
    AlertUtils.showDestructiveAlert(
      isAdherent ? 'Désadhésion' : 'Suppression du compte',
      isAdherent ? 'Êtes-vous sûr de vouloir désadhérer et de supprimer votre compte ?' : 'Êtes-vous sûr de vouloir supprimer votre compte ?',
      isAdherent ? 'Désadhérer' : 'Supprimer',
      'Annuler',
      onRemoveAccountConfirmed,
    )
  }

  const scrollViewContainerStyle = useMemo(
    () => ({
      pt: media.gtSm ? '$5' : undefined,
      pl: media.gtSm ? '$5' : undefined,
      pr: media.gtSm ? '$5' : undefined,
    }),
    [media],
  )

  return (
    <PageLayout.MainSingleColumn position="relative">
      <ScrollView contentContainerStyle={scrollViewContainerStyle}>
        <YStack gap={8} flex={1} $sm={{ pt: 8 }}>
          <ProfilBlock />
          {media.sm && <ProfilMenu />}
          <VoxCard>
            <VoxCard.Content>
              <Link asChild={!isWeb} href="/profil/cotisation-et-dons" replace={media.gtSm}>
                <XStack gap={6} alignItems="center">
                  <HelpingHand size={20} />
                  <XStack width="100%" flexShrink={1}>
                    <Text.LG multiline semibold>
                      Cotisations et don
                    </Text.LG>
                  </XStack>
                  <ArrowRight size={20} alignSelf="flex-end" />
                </XStack>
              </Link>
              <MembershipCard last_membership_donation={profile.last_membership_donation} other_party_membership={profile.other_party_membership} />
              <DonationCard />
            </VoxCard.Content>
          </VoxCard>

          <VoxCard>
            <VoxCard.Content>
              <XStack gap={6} alignItems="center">
                <Delete size={20} />
                <XStack width="100%" flexShrink={1}>
                  <Text.LG multiline semibold>
                    {isAdherent ? 'Désadhérer et supprimer mon compte' : 'Supprimer mon compte'}
                  </Text.LG>
                </XStack>
              </XStack>
              <Text.P>
                {isAdherent
                  ? 'Cette action est définitive, vous devrez à nouveau payer une cotisation pour réadhérer. Nous ne serons pas en mesure de restaurer votre historique.'
                  : 'Cette action est définitive et entraintera la suppression de toutes vos informations personnelles. Nous ne serons pas en mesure de restaurer votre historique.'}
              </Text.P>
              <VoxButton variant="outlined" size="lg" theme="orange" onPress={removeAccount}>
                {isAdherent ? 'Désadhérer' : 'Supprimer mon compte'}
              </VoxButton>
            </VoxCard.Content>
          </VoxCard>
          <VoxCard justifyContent="center" alignItems="center">
            <SafeAreaView edges={['bottom']}>
              <VoxCard.Content pt={24}>
                <Version />
                <VoxButton variant="text" size="lg" theme="orange" onPress={signOut} iconRight={LogOut}>
                  {credentials?.isAdmin ? 'Quitter l’impersonnification' : 'Me déconnecter'}
                </VoxButton>
              </VoxCard.Content>
            </SafeAreaView>
          </VoxCard>
        </YStack>
      </ScrollView>
    </PageLayout.MainSingleColumn>
  )
}

export default DashboardScreen
