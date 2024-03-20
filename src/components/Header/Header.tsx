import { SafeAreaView } from 'react-native-safe-area-context'
import EuCampaignIllustration from '@/assets/illustrations/EuCampaignIllustration'
import { useGetProfilObserver } from '@/hooks/useProfil'
import { Search, X } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import { Avatar, Button, getToken, Stack, styled, useMedia, YStack } from 'tamagui'

export type HeaderProps = {
  hideLogo?: boolean
  hideAvatar?: boolean
  onLogoPress?: () => void
  onSearchPress?: () => void
  onClosePress?: () => void
  onAvatarPress?: () => void
}

const ButtonCircle = styled(Button, {
  width: 46,
  height: 46,
  borderRadius: 100,
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '$gray3',
})

/**
 * Header component for the app with declinaison for the pages
 */
const Header = (props: HeaderProps) => {
  const { hideLogo = false, hideAvatar = false, onLogoPress, onAvatarPress, onClosePress, onSearchPress } = props
  const { data: profile } = useGetProfilObserver()
  const media = useMedia()

  if (media.gtSm) {
    return null
  }

  const rightItems = [
    {
      name: 'profil',
      label: 'Mon Profil',
      show: true,
      component: () => (
        <Stack mt={'$1.5'}>
          <Link href="/(tabs)/home/profile/" onPress={onAvatarPress}>
            <Avatar circular size="$4" width={46} height={46}>
              <Avatar.Image
                source={{
                  uri: 'https://picsum.photos/200/200',
                  width: 200,
                  height: 200,
                }}
              />
              <Avatar.Fallback bc="$gray3" />
            </Avatar>
          </Link>
        </Stack>
      ),
    },
    {
      name: 'search',
      label: 'Rechercher',
      show: onSearchPress !== undefined,
      component: () => (
        <ButtonCircle onPress={onSearchPress}>
          <X color={'$gray5'} size={24} />
        </ButtonCircle>
      ),
    },
    {
      name: 'close',
      label: 'Fermer',
      show: onClosePress !== undefined,
      component: () => (
        <ButtonCircle onPress={onClosePress}>
          <Search color={'$gray5'} size={24} />
        </ButtonCircle>
      ),
    },
  ]

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        backgroundColor: getToken('$white1'),
      }}
    >
      <YStack
        justifyContent={rightItems.filter((item) => item.show).length > 0 ? 'space-between' : 'flex-start'}
        p="$4.5"
        flexDirection="row"
        alignItems="center"
        borderBottomWidth="$1"
        borderColor="$gray2"
      >
        {!hideLogo && (
          <Link href="/(tabs)/home/" onPress={onLogoPress}>
            <EuCampaignIllustration />
          </Link>
        )}

        <Stack gap={'$3'} flexDirection="row">
          {rightItems
            .filter((item) => item.show)
            .map((item) => (
              <item.component key={item.name} />
            ))}
        </Stack>
      </YStack>
    </SafeAreaView>
  )
}

export default Header
