import Text from '@/components/base/Text'
import Button from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useGetMagicLink } from '@/services/magic-link/hook'
import { Image } from 'expo-image'
import * as WebBrowser from 'expo-web-browser'
import { styled, XStack, YStack } from 'tamagui'

const HeaderFrame = styled(XStack, {
  paddingLeft: '$4.5',
  paddingRight: 0,
  paddingBottom: '$4.5',
  paddingTop: '$4.5',
})

export default function () {
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
      <HeaderFrame>
        <YStack gap="$3" pr="$4" flex={1}>
          <YStack gap="$3" pr="$4" flex={1}>
            <Text fontSize="$4" fontWeight="$6">
              Faite la différence.
            </Text>
            <Text fontSize="$2" color="$textSecondary">
              Devenez financeur du parti en faisant un don mensuel.
            </Text>
          </YStack>
          <XStack gap="$3">
            <Button theme="green" onPress={handlePress('monthly')} disabled={isPending}>
              <Button.Text>Je finance le parti</Button.Text>
            </Button>
            <Button theme="green" variant="soft" onPress={handlePress('dayly')} disabled={isPending}>
              <Button.Text>Je donne</Button.Text>
            </Button>
          </XStack>
        </YStack>
        <Image
          source={require('@/assets/images/donation/don-illu.png')}
          style={{
            width: 187,
            height: 128,
          }}
        />
      </HeaderFrame>
    </VoxCard>
  )
}
