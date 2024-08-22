import Badge, { BadgeFrame } from '@/components/Badge'
import Text from '@/components/base/Text'
import Button from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import type { RestDonationsResponse } from '@/services/profile/schema'
import { getHumanFormattedDate } from '@/utils/date'
import { Crown } from '@tamagui/lucide-icons'
import { Image } from 'expo-image'
import { styled, XStack, YStack } from 'tamagui'

const HeaderFrame = styled(XStack, {
  paddingLeft: '$4.5',
  paddingRight: 0,
  paddingBottom: '$4.5',
  paddingTop: '$4.5',
})

export default function (props: { subscription: RestDonationsResponse[number] }) {
  return (
    <VoxCard bg="$green1">
      <VoxCard.Content>
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
        <YStack gap="$3" pr="$4" flex={1}>
          <YStack gap="$2" pr="$4" flex={1}>
            <Text fontSize="$2" fontWeight="$6">
              Vous êtes financeur depuis le {getHumanFormattedDate(props.subscription.date)}
            </Text>
            <Text fontSize="$2" color="$textSecondary">
              Un don est programmé mensuellement.
            </Text>
          </YStack>
          <XStack gap="$3">
            <Button theme="green" variant="soft">
              <Button.Text>Modifier</Button.Text>
            </Button>
            <Button theme="green">
              <Button.Text>Faire un don</Button.Text>
            </Button>
          </XStack>
        </YStack>
      </VoxCard.Content>
    </VoxCard>
  )
}
