import Text from '@/components/base/Text'
import Button from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { Image } from 'expo-image'
import { styled, XStack, YStack } from 'tamagui'

const HeaderFrame = styled(XStack, {
  paddingLeft: '$4.5',
  paddingRight: 0,
  paddingBottom: '$4.5',
  paddingTop: '$4.5',
})

export default function () {
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
            <Button theme="green">
              <Button.Text>Je finance le parti</Button.Text>
            </Button>
            <Button theme="green" variant="soft">
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
