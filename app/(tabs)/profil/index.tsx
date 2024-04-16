import * as metatags from '@/config/metatags'
import ProfileScreen from '@/screens/profile/ProfileScreen'
import { CloseButton } from '@/screens/shared/NavigationHeaderButton'
import { router, Stack } from 'expo-router'
import Head from 'expo-router/head'

function Root() {
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <CloseButton onPress={() => router.push('../')} />,
        }}
      />

      <Head>
        <title>{metatags.createTitle('Mon profil')}</title>
      </Head>

      <ProfileScreen />
    </>
  )
}

export default Root
