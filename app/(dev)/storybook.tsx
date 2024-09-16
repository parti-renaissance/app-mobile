import { VoxButton } from '@/components/Button'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { router, Stack } from 'expo-router'
import Storybook from '../../.storybook'

const HeaderLeft = () => (
  <VoxButton variant="text" onPress={() => router.replace('/(tabs)/(home)/')} iconLeft={ArrowLeft} theme="blue">
    Back
  </VoxButton>
)

export default () => (
  <>
    <Stack.Screen
      options={{
        headerTitle: 'Storybook',
        headerLeft: HeaderLeft,
      }}
    />
    <Storybook />
  </>
)
