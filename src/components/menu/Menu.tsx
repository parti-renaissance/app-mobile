import Item from '@/components/menu/Item'
import { styled, withStaticProperties, YStack } from 'tamagui'

const MenuFrame = styled(YStack, {
  // flex: 1,
  $gtSm: {
    overflow: 'hidden',
    borderRadius: '$4',
    maxWidth: 260,
  },
})

export default withStaticProperties(MenuFrame, {
  Item,
})
