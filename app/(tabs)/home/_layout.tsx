import { headerBlank } from '@/styles/navigationAppearance'
import { Stack } from 'expo-router'

export default function AppLayout() {
  // Set up the auth context and render our layout inside of it.
  return (
    <Stack screenOptions={headerBlank}>
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: 'transparent' },
        }}
      />
      <Stack.Screen name="profile" options={{ presentation: 'modal' }} />
    </Stack>
  )
}
