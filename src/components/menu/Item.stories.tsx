import { User } from '@tamagui/lucide-icons'
import { YStack } from 'tamagui'
import Item from './Item'

export default {
  title: 'Item',
  component: Item,
}

export function Default() {
  return (
    <YStack width={300}>
      <Item icon={User}>Item de menu</Item>
      <Item icon={User} size="lg">
        Item de menu
      </Item>
      <Item icon={User} active>
        Item de menu
      </Item>
    </YStack>
  )
}
