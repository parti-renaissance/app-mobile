import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import { StoryObj } from '@storybook/react'
import { View } from 'tamagui'

const meta = {
  title: 'Profile CTA/App Download',
  component: () => (
    <View width={400}>
      <AppDownloadCTA />
    </View>
  ),
}

type Story = StoryObj<typeof AppDownloadCTA>

export const Default: Story = {}

export default meta