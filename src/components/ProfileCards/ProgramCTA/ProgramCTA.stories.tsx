import ProgramCTA from '@/components/ProfileCards/ProgramCTA/ProgramCTA'
import { StoryObj } from '@storybook/react'
import { View } from 'tamagui'

const meta = {
  title: 'Profile CTA/Program',
  component: () => (
    <View width={400}>
      <ProgramCTA />
    </View>
  ),
}

type Story = StoryObj<typeof ProgramCTA>

export const Default: Story = {}

export default meta
