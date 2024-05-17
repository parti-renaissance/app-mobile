import MobileWallLayout from '@/components/MobileWallLayout/MobileWallLayout'
import { headerBlank } from '@/styles/navigationAppearance'
import { Stack } from 'expo-router'
import { isWeb } from 'tamagui'

export default function DoorToDoorLayout() {
  return isWeb ? (
    <MobileWallLayout />
  ) : (
    <Stack screenOptions={{ ...headerBlank, headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="tunnel" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  )
}
