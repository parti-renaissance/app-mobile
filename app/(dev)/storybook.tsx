import { Button } from '@/components'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { router, Stack } from 'expo-router'
import Storybook from '../../.storybook'

const HeaderLeft = () => (
  <Button variant="text" onPress={() => router.replace('/(tabs)/(home)/')}>
    <ArrowLeft size={16} color="$blue6" />
    <Button.Text color="$blue6">Back</Button.Text>
  </Button>
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
