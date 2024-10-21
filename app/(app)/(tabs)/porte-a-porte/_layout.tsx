import { SmallHeader } from '@/components/Header/Header'
import { Stack } from 'expo-router'

export default function DoorToDoorLayout() {
  return (
    <Stack screenOptions={{ header: (x) => null, animation: 'slide_from_right' }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Porte à porte',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="building-detail" options={{ title: '' }} />
      <Stack.Screen name="tunnel" options={{ presentation: 'fullScreenModal', headerShown: false }} />
    </Stack>
  )
}
