import React, { useMemo } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import { useSession } from '@/ctx/SessionProvider'
import { useGetDetailProfil, useGetDonations } from '@/services/profile/hook'
import { isWeb, ScrollView, useMedia, YStack } from 'tamagui'
import DonationCard from './components/DonationCard'
import DonationHistoryCard from './components/DonationHistoryCard'
import MembershipCard from './components/MembershipCard'

const EditInformations = () => {
  const media = useMedia()
  const { data: profile } = useGetDetailProfil()

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
        <ScrollView contentContainerStyle={scrollViewContainerStyle} backgroundColor={!isWeb ? '#fff' : '$colorTransparent'}>
          <YStack gap="$4" flex={1} $sm={{ pt: '$4' }}>
            <MembershipCard other_party_membership={profile.other_party_membership} last_membership_donation={profile.last_membership_donation} />
            <DonationCard />
            <DonationHistoryCard />
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageLayout.MainSingleColumn>
  )
}

export default EditInformations
