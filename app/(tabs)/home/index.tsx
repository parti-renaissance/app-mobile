import { SafeAreaView } from 'react-native-safe-area-context'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import HomeFeedList from '@/screens/home/feed/HomeFeedList'
import { Stack } from 'expo-router'
import { Avatar, getToken, YStack } from 'tamagui'

const HomeScreen: React.FC = () => (
  <>
    <Stack.Screen
      options={{
        header: () => (
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
        ),
      }}
    />
    <YStack>
      <BoundarySuspenseWrapper loadingMessage="Nous chargons votre fil">
        <HomeFeedList />
      </BoundarySuspenseWrapper>
    </YStack>
  </>
)

export default HomeScreen
