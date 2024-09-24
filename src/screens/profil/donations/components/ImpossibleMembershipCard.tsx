import React from 'react'
import Badge from '@/components/Badge'
import RadioGroup from '@/components/base/RadioGroup/RadioGroup'
import Text from '@/components/base/Text'
import { VoxButton } from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useGetDetailProfil } from '@/services/profile/hook'
import { styled, XStack, YStack } from 'tamagui'
import PartyMembershipForm from '../../account/form/PartyMembershipFrom'
import type { CommonMembershipCardProps } from './types'

export default function (props: CommonMembershipCardProps & { full?: boolean }) {
  const { data } = useGetDetailProfil()
  return (
    <VoxCard bg="$white1">
      <VoxCard.Content>
        <YStack gap="$5" flex={1}>
          <XStack>
            <Badge theme="orange">Adhésion impossible</Badge>
          </XStack>
          <XStack gap="$3">
            <YStack gap="$2" flex={1}>
              <Text.MD semibold>La double adhésion n’étant pas permise par Renaissance, il ne vous est pas possible d’adhérer.</Text.MD>
            </YStack>
            <YStack alignContent="center" height="100%" alignItems="center" justifyContent="center">
              <VoxButton theme="blue" disabled>
                J'adhère
              </VoxButton>
            </YStack>
          </XStack>
        </YStack>
        {props.full && (
          <YStack gap="$3">
            <PartyMembershipForm profile={data} />
          </YStack>
        )}
      </VoxCard.Content>
    </VoxCard>
  )
}
