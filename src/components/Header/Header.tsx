import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetProfilObserver } from '@/hooks/useProfil'
import { Avatar, getToken, YStack } from 'tamagui'

/**
 * Header component for the app with declinaison for the pages
 */
const Header = () => {
  const { data: profile } = useGetProfilObserver()

  if (Platform.OS === 'web') {
    return null
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        backgroundColor: getToken('$white1'),
      }}
    >
      <YStack justifyContent="center" p="$4.5">
        <Avatar circular size="$4">
          <Avatar.Image source={{ uri: 'https://picsum.photos/200/200', width: 200, height: 200 }} />
          <Avatar.Fallback bc="$gray3" />
        </Avatar>
      </YStack>
    </SafeAreaView>
  )
}

export default Header
