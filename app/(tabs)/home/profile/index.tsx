import ProfileScreen from '@/screens/profile/ProfileScreen'
import { CloseButton } from '@/screens/shared/NavigationHeaderButton'
import { router, Stack } from 'expo-router'

function Root() {
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <CloseButton onPress={() => router.push('../')} />,
        }}
      />

      <ProfileScreen />
    </>
  )
}

export default Root
