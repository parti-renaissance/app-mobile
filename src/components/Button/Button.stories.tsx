import { Fragment } from 'react'
import { Calendar } from '@tamagui/lucide-icons'
import { ScrollView, Stack, Text, XStack, YStack } from 'tamagui'
import { VoxButton as Button } from './Button'

export default {
  title: 'Button',
  component: Button,
}

export function Size() {
  return (
    <Stack gap="$4">
      <Button size="sm">Button Small</Button>
      <Button size="md">Button Medium</Button>
      <Button size="lg">Button Large</Button>
      <Button size="xl">Button extra Large</Button>
    </Stack>
  )
}

export function Default() {
  const variants = ['contained', 'outlined', 'soft', 'text'] as const
  const colors = ['gray', 'purple', 'orange', 'blue', 'green', 'yellow'] as const

  return (
    <ScrollView flex={1} alignContent="center" justifyContent="center">
      <Stack gap="$4">
        {variants.map((v) => (
          <Fragment key={v}>
            <Text> {v}</Text>
            <YStack gap="$2">
              <XStack gap="$4">
                {colors.map((c) => (
                  <Button key={c} theme={c} variant={v}>
                    Label
                  </Button>
                ))}
              </XStack>

              <XStack gap="$4">
                {colors.map((c) => (
                  <Button key={c} disabled theme={c} variant={v}>
                    Label
                  </Button>
                ))}
              </XStack>
              <XStack gap="$4">
                {colors.map((c) => (
                  <Button key={c} theme={c} iconLeft={Calendar} variant={v}>
                    Label
                  </Button>
                ))}
              </XStack>
              <XStack gap="$4">
                {colors.map((c) => (
                  <Button key={c} theme={c} iconLeft={Calendar} variant={v} />
                ))}
              </XStack>
              <XStack gap="$4">
                {colors.map((c) => (
                  <Button key={c} theme={c} loading variant={v}>
                    Label
                  </Button>
                ))}
              </XStack>
              <XStack gap="$4">
                {colors.map((c) => (
                  <Button key={c} theme={c} iconLeft={Calendar} loading variant={v}>
                    Label
                  </Button>
                ))}
              </XStack>
            </YStack>
          </Fragment>
        ))}
      </Stack>
    </ScrollView>
  )
}
