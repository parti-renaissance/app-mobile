import Badge, { BadgeFrame } from '@/components/Badge'
import Text from '@/components/base/Text'
import Button from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useGetMagicLink } from '@/services/magic-link/hook'
import type { RestDonationsResponse } from '@/services/profile/schema'
import { getHumanFormattedDate } from '@/utils/date'
import { Crown } from '@tamagui/lucide-icons'
import { Image } from 'expo-image'
import * as WebBrowser from 'expo-web-browser'
import { styled, XStack, YStack } from 'tamagui'

export default function (props: { subscription: RestDonationsResponse[number] }) {
  const { data: magicLink, isPending } = useGetMagicLink({ platform: 'donation' })
  const handlePress = (duration: 'monthly' | 'dayly') => () => {
    if (magicLink) {
      const Url = new URL(magicLink.link)
      Url.searchParams.set('duration', duration === 'monthly' ? '-1' : '0')
      WebBrowser.openBrowserAsync(Url.toString())
    }
  }
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
        <XStack>
          <YStack gap="$3" flex={1}>
            <XStack alignItems="center">
              <YStack gap="$2" flex={2}>
                <Text fontSize="$2" fontWeight="$6">
                  Vous êtes financeur depuis le {getHumanFormattedDate(props.subscription.date)}
                </Text>
                <Text fontSize="$2" color="$textSecondary">
                  Un don est programmé mensuellement.
                </Text>
              </YStack>
              <YStack flex={1} justifyContent="center" alignItems="flex-end">
                <YStack
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  borderWidth="$1"
                  borderRadius="$5"
                  borderColor="$green3"
                  p="$3"
                  height="$8"
                  width="$8"
                >
                  <Text fontSize="$7" fontWeight="$8" color="$green7">
                    {props.subscription.amount} €
                  </Text>
                </YStack>
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
        </XStack>
      </VoxCard.Content>
    </VoxCard>
  )
}
