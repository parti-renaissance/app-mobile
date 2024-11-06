import Item from '@/components/menu/Item'
import { styled, withStaticProperties, YStack } from 'tamagui'

const MenuFrame = styled(YStack, {
  backgroundColor: '$white1',
  width: '100%',

  $gtSm: {
    overflow: 'hidden',
    borderRadius: 16,
    maxWidth: 280,
    elevation: 1,
  },
})

export default withStaticProperties(MenuFrame, {
  Item,
})
