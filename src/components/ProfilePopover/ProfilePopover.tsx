import { PropsWithChildren, useCallback, useRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSession } from '@/ctx/SessionProvider'
import { useUserStore } from '@/store/user-store'
import { router } from 'expo-router'
import { Adapt, isWeb, ListItem, Popover, Separator, YGroup } from 'tamagui'

export default function ProfilePopover({ children }: PropsWithChildren) {
  const { signOut } = useSession()
  const { user } = useUserStore()
  const { bottom } = useSafeAreaInsets()

  const ref = useRef<Popover>(null)

  const onGoToProfile = useCallback(() => {
    ref.current?.close()
    router.push('/profil/')
  }, [])

  const onGoToStorybook = useCallback(() => {
    ref.current?.close()
    router.replace('/storybook/')
  }, [])

  const onDisconnect = useCallback(async () => {
    ref.current?.close()
    await signOut()
  }, [])

  return (
    <Popover ref={ref} hoverable allowFlip placement={'bottom'} offset={{ mainAxis: isWeb ? 10 : 60, crossAxis: -20 }}>
      <Popover.Trigger cursor={'pointer'}>{children}</Popover.Trigger>

      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
          <Popover.Sheet.Handle />
          <Popover.Sheet.Frame padding="$4" pb={bottom}>
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Popover.Sheet>
      </Adapt>

      <Popover.Content borderWidth={1} padding={0} borderColor="$gray4">
        <YGroup $gtLg={{ width: 300 }}>
          <MenuEntry onPress={onGoToProfile} title="Mon profil" />
          <Separator borderStyle={'dashed'} borderColor="$gray4" />
          {__DEV__ && (
            <>
              <MenuEntry onPress={onGoToStorybook} title="Storybook" />
              <Separator borderStyle={'dashed'} borderColor="$gray4" />
            </>
          )}
          <MenuEntry onPress={onDisconnect} title={user?.isAdmin ? 'Quitter l’impersonnification' : 'Me déconnecter'} danger />
        </YGroup>
      </Popover.Content>
    </Popover>
  )
}

const MenuEntry = ({ title, onPress, danger }: { title: string; onPress: () => void; danger?: boolean }) => (
  <YGroup.Item>
    <ListItem hoverTheme onPress={onPress} cursor={'pointer'}>
      <ListItem.Text color={danger ? '$textDanger' : '$textPrimary'} cursor={'pointer'}>
        {title}
      </ListItem.Text>
    </ListItem>
  </YGroup.Item>
)
