import React, { useMemo } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import SkeCard from '@/components/Skeleton/CardSkeleton'
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
        <ScrollView contentContainerStyle={scrollViewContainerStyle}>
          <YStack gap="$4" flex={1} $sm={{ pt: '$4' }}>
            <BoundarySuspenseWrapper
              fallback={
                <SkeCard>
                  <SkeCard.Content>
                    <SkeCard.Title />
                    <SkeCard.Content>
                      <SkeCard.Description />
                    </SkeCard.Content>
                  </SkeCard.Content>
                </SkeCard>
              }
            >
              <MembershipCard full other_party_membership={profile.other_party_membership} last_membership_donation={profile.last_membership_donation} />
            </BoundarySuspenseWrapper>
            <DonationCard />
            <DonationHistoryCard />
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageLayout.MainSingleColumn>
  )
}

export default EditInformations
