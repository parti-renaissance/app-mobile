import { ComponentProps } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Container from '@/components/layouts/Container'
import { Media, ScrollView, StackProps, useMedia, View, ViewProps, withStaticProperties, XStack, YStack, YStackProps } from 'tamagui'

export const padding = '$medium'
export const columnWidth = 333

const LayoutFrame = ({ children, ...props }: ComponentProps<typeof Container>) => {
  const insets = useSafeAreaInsets()
  return (
    <Container flex={1} bg="$textSurface" pl={insets.left} pr={insets.right} $gtMd={{ pl: insets.left ?? padding }} $gtLg={{ pl: 0 + insets.left }} {...props}>
      <XStack flex={1}>{children}</XStack>
    </Container>
  )
}

const LayoutSideBarLeft = ({ children, showOn = 'gtSm', ...props }: ViewProps & { showOn?: keyof Media }) => {
  const media = useMedia()
  const insets = useSafeAreaInsets()
  return (
    media[showOn] && (
      <View $gtMd={{ width: columnWidth }} $md={{ width: 250 }} height="100%" pt={padding} $lg={{ pl: padding }} {...props}>
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 56 }}>{children}</ScrollView>
      </View>
    )
  )
}

export const LayoutStateFrame = ({ children, ...props }: YStackProps) => {
  return (
    <YStack $sm={{ justifyContent: 'center' }} $gtSm={{ pt: 80 }} flex={1} {...props}>
      <YStack p="$medium" paddingTop="$medium" alignItems="center" gap="$medium">
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

const LayoutSideBarRight = ({ children, alwaysShow = false, ...props }: ViewProps & { alwaysShow?: boolean }) => {
  const media = useMedia()
  return media.gtLg || alwaysShow ? (
    <View width={columnWidth} height="100%" pt={padding} {...props}>
      {children}
    </View>
  ) : null
}

const LayoutMainSingleColumn = ({ children, ...props }: StackProps) => {
  return (
    <YStack flex={1} flexBasis={0} {...props}>
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
