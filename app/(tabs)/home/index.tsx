import { SafeAreaView } from 'react-native-safe-area-context'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import Navbar from '@/components/Navbar/Navbar'
import HomeFeedList from '@/screens/home/feed/HomeFeedList'
import { Stack } from 'expo-router'
import { Avatar, getToken, YStack } from 'tamagui'

const HomeScreen: React.FC = () => (
  <>
    <Stack.Screen
      options={{
        header: () => <Navbar />,
      }}
    />
    <YStack flex={1}>
      <BoundarySuspenseWrapper loadingMessage="Nous chargons votre fil">
        <HomeFeedList />
      </BoundarySuspenseWrapper>
    </YStack>
  </>
)

export default HomeScreen
