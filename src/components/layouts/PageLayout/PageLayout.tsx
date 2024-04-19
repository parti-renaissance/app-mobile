// first fetch profile,
import Container from '@/components/layouts/Container'
import VoxCard from '@/components/VoxCard/VoxCard'
import { StackProps, useMedia, View, ViewProps, withStaticProperties, XStack, YStack } from 'tamagui'

export const padding = '$7'
export const columnWidth = 333

const LayoutFrame = ({ children, ...props }: StackProps) => {
  return (
    <Container flex={1} bg="$gray2" $gtMd={{ pl: padding }} $gtLg={{ pl: 0 }} {...props}>
      <XStack flex={1}>{children}</XStack>
    </Container>
  )
}

const LayoutSideBarLeft = ({ children }: ViewProps) => {
  const media = useMedia()
  return (
    media.gtMd && (
      <View width={columnWidth} height="100%" pt={padding}>
        {children}
      </View>
    )
  )
}

const LayoutMainBarLeft = ({ children }: ViewProps) => {
  return (
    <View
      width="100%"
      $gtSm={{
        width: columnWidth,
        height: '100%',
        pt: padding,
        marginLeft: 'auto',
      }}
    >
      {children}
    </View>
  )
}

const LayoutSideBarRight = ({ children }: ViewProps) => {
  const media = useMedia()
  return (
    media.gtLg && (
      <View width={columnWidth} height="100%" pt={padding}>
        {children}
      </View>
    )
  )
}

const LayoutMainSingleColumn = ({ children }: StackProps) => {
  return (
    <YStack flex={1} flexBasis={0} gap={2}>
      {children}
    </YStack>
  )
}

export const LayoutPage = withStaticProperties(LayoutFrame, {
  SideBarLeft: LayoutSideBarLeft,
  SideBarRight: LayoutSideBarRight,
  MainSingleColumn: LayoutMainSingleColumn,
  MainSingleLeft: LayoutMainBarLeft,
})

export default LayoutPage
