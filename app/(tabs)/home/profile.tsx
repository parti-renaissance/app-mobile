import ProfileScreen from '@/screens/profile/ProfileScreen'
import { CloseButton } from '@/screens/shared/NavigationHeaderButton'
import i18n from '@/utils/i18n'
import { router, Stack, useNavigation } from 'expo-router'

function Root() {
  const navigation = useNavigation()
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <CloseButton onPress={() => router.push('../')} />,
          title: i18n.t('personalinformation.address'),
        }}
      />

      <ProfileScreen />
    </>
  )
}

export default Root
