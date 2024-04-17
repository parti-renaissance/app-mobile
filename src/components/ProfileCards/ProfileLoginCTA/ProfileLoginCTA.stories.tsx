import ProfileLoginCTA from '@/components/ProfileCards/ProfileLoginCTA/ProfileLoginCTA'
import { StoryObj } from '@storybook/react'
import { View } from 'tamagui'

const meta = {
  title: 'Profile CTA/Login',
  component: () => (
    <View width={400}>
      <ProfileLoginCTA />
    </View>
  ),
}

type Story = StoryObj<typeof ProfileLoginCTA>

export const Default: Story = {}

export default meta
