import Item from '@/components/menu/Item'
import { styled, withStaticProperties, YStack } from 'tamagui'

const MenuFrame = styled(YStack, {
  backgroundColor: '$white1',
  // flex: 1,
  $sm: {
    width: '100%',
  },
  $gtSm: {
    overflow: 'hidden',
    borderRadius: '$4',
    maxWidth: 270,
    elevation: 1,
  },
})

export default withStaticProperties(MenuFrame, {
  Item,
})
