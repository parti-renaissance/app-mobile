import { BadgeFrame } from '@/components/Badge'
import Text from '@/components/base/Text'
import Button from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useOpenExternalContent } from '@/hooks/useOpenExternalContent'
import type { RestDonationsResponse } from '@/services/profile/schema'
import { getHumanFormattedDate } from '@/utils/date'
import { Crown } from '@tamagui/lucide-icons'
import { XStack, YStack } from 'tamagui'

export default function (props: { subscription: RestDonationsResponse[number] }) {
  const { isPending, open: handlePress } = useOpenExternalContent({ slug: 'donation' })

  return (
    <VoxCard bg="$green1">
      <VoxCard.Content>
        <XStack gap="$4">
          <YStack flex={1} gap="$3">
            <XStack>
              <BadgeFrame theme="green">
                <XStack gap="$1.5" alignItems="center">
                  <Crown color="$color" size={10} />
                  <Text fontSize="$1" fontWeight="$6" color="$color">
                    Financeur
                  </Text>
                </XStack>
              </BadgeFrame>
            </XStack>
            <YStack gap="$3" flex={1}>
              <XStack alignItems="center" flex={1}>
                <YStack gap="$2" flex={2}>
                  <Text fontSize="$2" fontWeight="$6">
                    Vous êtes financeur depuis le {getHumanFormattedDate(props.subscription.date)}
                  </Text>
                  <Text fontSize="$2" color="$textSecondary">
                    Un don est programmé mensuellement.
                  </Text>
                </YStack>
              </XStack>
              <XStack gap="$3">
                <Button theme="green" variant="soft" onPress={handlePress('monthly')} disabled={isPending}>
                  <Button.Text>Modifier</Button.Text>
                </Button>
                <Button theme="green" onPress={handlePress('dayly')} disabled={isPending}>
                  <Button.Text>Faire un don</Button.Text>
                </Button>
              </XStack>
            </YStack>
          </YStack>
          <YStack justifyContent="center" alignItems="flex-end">
            <YStack justifyContent="center" alignItems="center" borderWidth="$1" borderRadius="$5" borderColor="$green3" height="$9" width="$9">
              <Text fontSize="$6" fontWeight="$8" color="$green7">
                {props.subscription.amount} €
              </Text>
            </YStack>
          </YStack>
        </XStack>
      </VoxCard.Content>
    </VoxCard>
  )
}
