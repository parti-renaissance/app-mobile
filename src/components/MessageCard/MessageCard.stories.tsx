import { Fragment } from 'react'
import { Calendar } from '@tamagui/lucide-icons'
import { ScrollView, Stack, Text, XStack, YStack } from 'tamagui'
import { MessageCard } from './MessageCard'

export default {
  title: 'MessageCard',
  component: MessageCard,
}

export function Default() {
  const colors = ['gray', 'purple', 'orange', 'blue', 'green', 'yellow'] as const

  return (
    <ScrollView flex={1} alignContent="center" justifyContent="center">
      <Stack gap="$4">
        <YStack gap="$2">
          {colors.map((c) => (
            <MessageCard key={c} theme={c} iconLeft={Calendar}>
              Label
            </MessageCard>
          ))}
        </YStack>
      </Stack>
    </ScrollView>
  )
}
