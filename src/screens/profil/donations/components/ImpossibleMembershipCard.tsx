import Badge from '@/components/Badge'
import Text from '@/components/base/Text'
import { VoxButton } from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { styled, XStack, YStack } from 'tamagui'
import type { CommonMembershipCardProps } from './types'

export default function (props: CommonMembershipCardProps) {
  return (
    <VoxCard bg="$white1">
      <VoxCard.Content>
        <YStack gap="$5" flex={1}>
          <XStack>
            <Badge theme="orange">Adhésion impossible</Badge>
          </XStack>
          <XStack gap="$3">
            <YStack gap="$2" flex={1}>
              <Text fontWeight="$6">La double adhésion n’étant pas permise par Renaissance, il ne vous est pas possible d’adhérer.</Text>
            </YStack>
            <YStack alignContent="center" height="100%" alignItems="center" justifyContent="center">
              <VoxButton theme="blue" disabled>
                J'adhère
              </VoxButton>
            </YStack>
          </XStack>
        </YStack>
      </VoxCard.Content>
    </VoxCard>
  )
}
