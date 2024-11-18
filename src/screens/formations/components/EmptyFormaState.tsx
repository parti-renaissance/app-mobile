import EmptyStateFormationIllustration from '@/assets/illustrations/EmptyStateFormationIllustration'
import Text from '@/components/base/Text'
import { YStack } from 'tamagui'

export default function ({ visibility, textColor }: { visibility: 'local' | 'national'; textColor: string }) {
  return (
    <YStack gap="$medium" justifyContent="center" alignItems="center">
      <EmptyStateFormationIllustration />
      <Text.LG multiline semibold>
        Aucune formation <Text.LG color={textColor}>{visibility === 'local' ? 'locale' : 'nationale'}</Text.LG>
      </Text.LG>
    </YStack>
  )
}
