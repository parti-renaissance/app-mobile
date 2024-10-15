import Text from '@/components/base/Text'
import { VoxButton } from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { RestGetFormationsResponse } from '@/services/formations/schema'
import { Download, GraduationCap } from '@tamagui/lucide-icons'
import { XStack } from 'tamagui'

export const FormaCard = ({ payload, last, left, right }: { payload: RestGetFormationsResponse[number]; last?: boolean; left?: boolean; right?: boolean }) => {
  const chipLabel = payload.visibility === 'local' ? 'Formation locale' : 'Formation nationale'
  const chipTheme = payload.visibility === 'local' ? 'green' : 'blue'
  return (
    <VoxCard.Content
      borderBottomWidth={last ? 0 : 1}
      borderRightWidth={left ? 1 : 0}
      borderColor="$textOutline"
      paddingLeft={left ? 0 : 16}
      paddingRight={right ? 0 : 16}
      backgroundColor="$white1"
    >
      <XStack justifyContent="space-between">
        <VoxCard.Chip theme={chipTheme} icon={GraduationCap}>
          {chipLabel}
        </VoxCard.Chip>
        {payload.category ? <VoxCard.Chip>{payload.category}</VoxCard.Chip> : null}
      </XStack>
      <Text.LG>{payload.title}</Text.LG>
      <VoxCard.Description markdown>{payload.description}</VoxCard.Description>
      <VoxButton variant="outlined" iconLeft={Download}>
        Télécharger
      </VoxButton>
    </VoxCard.Content>
  )
}
