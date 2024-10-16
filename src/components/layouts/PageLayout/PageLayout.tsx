// first fetch profile,
import { ComponentProps } from 'react'
import Container from '@/components/layouts/Container'
import { Media, StackProps, useMedia, View, ViewProps, withStaticProperties, XStack, YStack, YStackProps } from 'tamagui'

export const padding = '$5'
export const columnWidth = 333

const LayoutFrame = ({ children, ...props }: ComponentProps<typeof Container>) => {
  return (
    <Container flex={1} bg="$textSurface" $gtMd={{ pl: padding }} $gtLg={{ pl: 0 }} {...props}>
      <XStack flex={1}>{children}</XStack>
    </Container>
  )
}

const LayoutSideBarLeft = ({ children, showOn = 'gtMd', ...props }: ViewProps & { showOn?: keyof Media }) => {
  const media = useMedia()
  return (
    media[showOn] && (
      <View width={columnWidth} height="100%" pt={padding} {...props}>
        {children}
      </View>
    )
  )
}

export const LayoutStateFrame = ({ children, ...props }: YStackProps) => {
  return (
    <YStack $sm={{ justifyContent: 'center' }} $gtSm={{ pt: 80 }} flex={1} {...props}>
      <YStack p="$4.5" paddingTop="$4.5" alignItems="center" gap="$4">
        {children}
      </YStack>
    </YStack>
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
  StateFrame: LayoutStateFrame,
})

export default LayoutPage
