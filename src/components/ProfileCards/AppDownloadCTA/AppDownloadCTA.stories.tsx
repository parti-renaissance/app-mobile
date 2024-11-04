import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import { StoryObj } from '@storybook/react'
import { View } from 'tamagui'

const meta = {
  title: 'Profil CTA/App Download',
  component: () => (
    <>
      <View width={400} mb={'$4'}>
        <AppDownloadCTA />
      </View>
      <View width={400}>
        <AppDownloadCTA variant={'screenshots'} />
      </View>
    </>
  ),
}

type Story = StoryObj<typeof AppDownloadCTA>

export const Default: Story = {}

export default meta
