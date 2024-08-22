import Badge from '@/components/Badge'
import Text from '@/components/base/Text'
import VoxCard from '@/components/VoxCard/VoxCard'
import { getHumanFormattedDate } from '@/utils/date'
import { CheckCircle } from '@tamagui/lucide-icons'
import { styled, View, XStack, YStack } from 'tamagui'
import type { CommonMembershipCardProps } from './types'

export default function (props: CommonMembershipCardProps) {
  return (
    <VoxCard bg="$blue1">
      <VoxCard.Content>
        <XStack>
          <YStack gap="$5" flex={1}>
            <XStack>
              <Badge theme="blue">Adhérent à jour</Badge>
            </XStack>
            <XStack>
              <YStack gap="$2" flex={1}>
                <Text fontWeight="$6">Vous êtes à jour de cotisation</Text>
                <Text color="$textSecondary">Dernière cotisation le {getHumanFormattedDate(props.last_membership_donation!)}</Text>
              </YStack>
            </XStack>
          </YStack>
          <YStack justifyContent="center">
            <CheckCircle size="$5" color="$blue6" strokeWidth={1} />
          </YStack>
        </XStack>
      </VoxCard.Content>
    </VoxCard>
  )
}
