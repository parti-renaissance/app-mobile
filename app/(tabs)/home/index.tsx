import { Header, NavBar } from '@/components'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import HomeFeedList from '@/screens/home/feed/HomeFeedList'
import { Stack } from 'expo-router'
import { YStack } from 'tamagui'

const HomeScreen: React.FC = () => (
  <>
    <Stack.Screen
      options={{
        header: () => <Header />,
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
