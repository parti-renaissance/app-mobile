import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetProfilObserver } from '@/hooks/useProfil'
import { Avatar, getToken, YStack } from 'tamagui'

const Navbar: React.FC = () => {
  const { data: profile } = useGetProfilObserver()
  console.log(profile)
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

export default Navbar
