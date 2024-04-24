import { PropsWithChildren, useCallback, useRef } from 'react'
import { useSession } from '@/ctx/SessionProvider'
import { router } from 'expo-router'
import { isWeb, ListItem, Popover, Separator, YGroup } from 'tamagui'

export default function ProfilePopover({ children }: PropsWithChildren) {
  const { signOut } = useSession()

  const ref = useRef<Popover>(null)

  const onGoToProfile = useCallback(() => {
    ref.current?.close()
    router.push('/profil/')
  }, [])

  const onDisconnect = useCallback(async () => {
    ref.current?.close()
    await signOut()
  }, [])

  const onOpen = useCallback(() => {
    ref.current?.toggle()
  }, [])

  return (
    <Popover ref={ref} hoverable allowFlip placement={'bottom'} offset={{ mainAxis: isWeb ? 10 : 60, crossAxis: -20 }}>
      <Popover.Trigger cursor={'pointer'}>{children}</Popover.Trigger>

      <Popover.Content borderWidth={1} padding={0} borderColor="$gray4">
        <YGroup width={300}>
          <MenuEntry onPress={onGoToProfile} title="Mon profil" />
          <Separator borderStyle={'dashed'} borderColor="$gray4" />
          <MenuEntry onPress={onDisconnect} title="Me déconnecter" danger />
        </YGroup>
      </Popover.Content>
    </Popover>
  )
}

const MenuEntry = ({ title, onPress, danger }: { title: string; onPress: () => void; danger?: boolean }) => (
  <YGroup.Item>
    <ListItem hoverTheme onPress={onPress} cursor={'pointer'}>
      <ListItem.Text color={danger ? '$textDanger' : undefined} cursor={'pointer'}>
        {title}
      </ListItem.Text>
    </ListItem>
  </YGroup.Item>
)
