// first fetch profile,
import Container from '@/components/layouts/Container'
import VoxCard from '@/components/VoxCard/VoxCard'
import { StackProps, useMedia, View, ViewProps, withStaticProperties, XStack, YStack } from 'tamagui'

export const padding = '$7'
export const columnWidth = 333

type LayoutPageProps = {
  children: React.ReactNode
}
const LayoutFrame = ({ children }: StackProps) => {
  return (
    <Container flex={1} bg="$gray2" $gtMd={{ pl: padding }} $gtLg={{ pl: 0 }}>
      <XStack flex={1}>{children}</XStack>
    </Container>
  )
}

const LayoutSideBarLeft = () => {
  const media = useMedia()
  return (
    media.gtMd && (
      <View width={columnWidth} height="100%" pt={padding}>
        <VoxCard height={300}>
          <VoxCard.Content></VoxCard.Content>
        </VoxCard>
      </View>
    )
  )
}

const LayoutSideBarRight = ({ children }: ViewProps) => {
  const media = useMedia()
  return (
    media.gtLg && (
      <View width={columnWidth} height="100%" pt={padding}>
        {children ? (
          children
        ) : (
          <VoxCard height={300}>
            <VoxCard.Content></VoxCard.Content>
          </VoxCard>
        )}
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
})

export default LayoutPage
