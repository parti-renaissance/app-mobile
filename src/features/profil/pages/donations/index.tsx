import React, { useMemo } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import { useGetDetailProfil, useGetDonations } from '@/services/profile/hook'
import { isWeb, ScrollView, useMedia, YStack } from 'tamagui'
import ForceBirthdateModal from '../account/form/ForceBirthdateModal'
import DonationCard from './components/DonationCard'
import DonationHistoryCard from './components/DonationHistoryCard'
import DonationTaxReceiptCard from './components/DonationTaxReceiptsCard'
import MembershipCard from './components/MembershipCard'

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
      <ForceBirthdateModal />
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ flex: 1 }} keyboardVerticalOffset={100}>
        <ScrollView contentContainerStyle={scrollViewContainerStyle}>
          <YStack gap="$medium" flex={1} $sm={{ pt: 8, gap: 8 }}>
            <MembershipCard full other_party_membership={profile.other_party_membership} last_membership_donation={profile.last_membership_donation} />
            <DonationCard full />
            <DonationTaxReceiptCard />
            <DonationHistoryCard />
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageLayout.MainSingleColumn>
  )
}

export default EditInformations
