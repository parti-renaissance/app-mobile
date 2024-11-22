import { useState } from 'react'
import { Lock } from '@tamagui/lucide-icons'
import { Stack } from 'tamagui'
import { Tabs } from './Tabs'

export default {
  title: 'Tabs',
  component: Tabs,
}

export function Default() {
  const [value, setValue] = useState<'1' | '2' | '3'>('1')
  return (
    <Stack gap="$medium">
      <Tabs<typeof value> onChange={setValue} value={value}>
        <Tabs.Tab id="1">Tab 1</Tabs.Tab>
        <Tabs.Tab id="2">Tab 2</Tabs.Tab>
        <Tabs.Tab id="3">Tab 3</Tabs.Tab>
      </Tabs>
    </Stack>
  )
}
export function grouped() {
  const [value, setValue] = useState<'1' | '2' | '3'>('1')
  return (
    <Stack gap="$medium">
      <Tabs<typeof value> grouped onChange={setValue} value={value}>
        <Tabs.Tab id="1">Tab 1</Tabs.Tab>
        <Tabs.Tab id="2">Tab 2</Tabs.Tab>
        <Tabs.Tab id="3">Tab 3</Tabs.Tab>
      </Tabs>
    </Stack>
  )
}
