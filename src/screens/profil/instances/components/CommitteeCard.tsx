import Text from '@/components/base/Text'
import { VoxButton } from '@/components/Button'
import VoxCard, { VoxCardFrame } from '@/components/VoxCard/VoxCard'
import type { RestGetComitteesResponse } from '@/services/committee/schema'
import { styled, XStack, YStack } from 'tamagui'

const CommitteeCardFrame = styled(VoxCardFrame, {
  tag: 'button',
  backgroundColor: '$blue/8',
  animation: 'quick',
  cursor: 'pointer',
  flex: 1,
  height: 148,
  borderWidth: 2,
  borderColor: 'white',
  justifyContent: 'center',

  pressStyle: {
    borderColor: '$blue5',
    backgroundColor: '$blue1',
  },
  hoverStyle: {
    borderColor: '$blue3',
    backgroundColor: '$blue/16',
  },
  focusStyle: {
    borderColor: '$blue5',
    backgroundColor: '$blue1',
  },

  variants: {
    selected: {
      true: {
        borderColor: '$blue5',
        backgroundColor: '$blue1',
        cursor: 'default',
        hoverStyle: {
          borderColor: '$blue5',
          backgroundColor: '$blue1',
        },
      },
    },
  },
})

type CommitteeCardProps = {
  committee: RestGetComitteesResponse[number]
  selected: boolean
  onPress?: () => void
  loading?: boolean
}

export default function CommitteeCard({ committee, selected, onPress }: CommitteeCardProps) {
  return (
    <CommitteeCardFrame inside selected={selected} onPress={onPress} focusable>
      <VoxCard.Content>
        <XStack justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={16}>
          <YStack flex={1} gap={8}>
            <Text.MD semibold color="$blue6">
              {committee.name}
            </Text.MD>
            <Text.SM color="$blue5">{committee.members_count} Adhérents</Text.SM>
          </YStack>
          <YStack flex={1}>
            {selected ? (
              <VoxButton variant="text" w={90} theme="blue" onPress={onPress}>
                Membre
              </VoxButton>
            ) : (
              <VoxButton variant="outlined" bg="white" w={90} theme="blue" onPress={onPress}>
                Rejoindre
              </VoxButton>
            )}
          </YStack>
        </XStack>
      </VoxCard.Content>
    </CommitteeCardFrame>
  )
}
