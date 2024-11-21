import { useState } from 'react'
import BotBilanCTA from '@/components/ProfileCards/BotBilanCTA/BotBilanCTA'
import { StoryObj } from '@storybook/react'
import { View } from 'tamagui'
import Text from '../base/Text'
import DepartementSelect from './DepartementSelect'

const Component = () => {
  const [state, setState] = useState('FR')

  return (
    <View width={400}>
      <DepartementSelect id="Departement" color="gray" value={state} onChange={setState} />

      <Text mt="$medium">Selected Departement is {state}</Text>
    </View>
  )
}

const meta = {
  title: 'Select/Departement',
  component: Component,
}

type Story = StoryObj<typeof BotBilanCTA>

export const Default: Story = {}

export default meta
