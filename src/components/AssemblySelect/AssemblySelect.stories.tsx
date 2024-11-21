import { useState } from 'react'
import BotBilanCTA from '@/components/ProfileCards/BotBilanCTA/BotBilanCTA'
import { StoryObj } from '@storybook/react'
import { View } from 'tamagui'
import Text from '../base/Text'
import AssemblySelect from './AssemblySelect'

const Component = () => {
  const [state, setState] = useState('FR')

  return (
    <View width={400}>
      <AssemblySelect id="Assembly" color="gray" value={state} onChange={setState} />

      <Text mt="$medium">Selected Assembly is {state}</Text>
    </View>
  )
}

const meta = {
  title: 'Select/Assembly',
  component: Component,
}

type Story = StoryObj<typeof BotBilanCTA>

export const Default: Story = {}

export default meta
