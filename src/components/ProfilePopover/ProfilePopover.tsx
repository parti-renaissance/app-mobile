import { useCallback, useRef } from 'react'
import { Button } from '@/components'
import { useSession } from '@/ctx/SessionProvider'
import { ChevronDown } from '@tamagui/lucide-icons'
import { router } from 'expo-router'
import { ListItem, Popover, Separator, YGroup } from 'tamagui'

export default function ProfilePopover() {
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

  return (
    <Popover ref={ref} hoverable>
      <Popover.Trigger>
        <Button variant="text">
          <ChevronDown size={16} color="$gray6" />
        </Button>
      </Popover.Trigger>

      <Popover.Content borderWidth={1} padding={0} borderColor="$gray4" marginRight="$5" marginTop="$3" backgroundColor="$white">
        <Popover.Arrow />
        <Popover.Close />

        <YGroup width={400}>
          <MenuEntry onPress={onGoToProfile} title="Mon profil" />
          <Separator borderStyle={'dashed'} borderColor="$gray4" />
          <MenuEntry onPress={onDisconnect} title="Me déconnecter" danger />
        </YGroup>
      </Popover.Content>

      {/* optionally change to sheet when small screen */}
      <Popover.Adapt when="sm">
        <Popover.Sheet>
          <Popover.Sheet.Overlay />
          <Popover.Sheet.Frame>
            <Popover.Sheet.ScrollView>
              <Popover.Adapt.Contents />
            </Popover.Sheet.ScrollView>
          </Popover.Sheet.Frame>
        </Popover.Sheet>
      </Popover.Adapt>
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
