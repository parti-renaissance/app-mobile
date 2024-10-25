import { BadgeFrame } from '@/components/Badge'
import Text from '@/components/base/Text'
import Button, { VoxButton } from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useOpenExternalContent } from '@/hooks/useOpenExternalContent'
import type { RestDonationsResponse } from '@/services/profile/schema'
import { getHumanFormattedDate } from '@/utils/date'
import { Crown } from '@tamagui/lucide-icons'
import { XStack, YStack } from 'tamagui'

export default function (props: { subscription: RestDonationsResponse[number]; full?: boolean }) {
  const { isPending, open: handlePress } = useOpenExternalContent({ slug: 'donation' })

  return (
    <VoxCard bg="$green1" inside={!props.full}>
      <VoxCard.Content>
        <XStack gap="$4">
          <YStack flex={1} gap="$3">
            <XStack>
              <BadgeFrame theme="green">
                <XStack gap="$1.5" alignItems="center">
                  <Crown color="$color" size={10} />
                  <Text.SM semibold color="$color">
                    Financeur
                  </Text.SM>
                </XStack>
              </BadgeFrame>
            </XStack>
            <YStack gap="$3" flex={1}>
              <XStack alignItems="center" flex={1}>
                <YStack gap="$2" flex={2}>
                  <Text.MD semibold>Vous êtes financeur depuis le {getHumanFormattedDate(props.subscription.date)}</Text.MD>
                  <Text.MD secondary>Un don est programmé mensuellement.</Text.MD>
                </YStack>
              </XStack>
              <XStack gap="$3">
                <VoxButton theme="green" variant="soft" onPress={handlePress('monthly')} disabled={isPending}>
                  Modifier
                </VoxButton>
                <VoxButton theme="green" onPress={handlePress('dayly')} disabled={isPending}>
                  Faire un don
                </VoxButton>
              </XStack>
            </YStack>
          </YStack>
          <YStack justifyContent="center" alignItems="flex-end">
            <YStack justifyContent="center" alignItems="center" borderWidth="$1" borderRadius="$5" borderColor="$green3" height="$9" width="$9">
              <Text.LG primary={false} fontSize="$6" fontWeight="$8" theme="green">
                {props.subscription.amount} €
              </Text.LG>
            </YStack>
          </YStack>
        </XStack>
      </VoxCard.Content>
    </VoxCard>
  )
}
