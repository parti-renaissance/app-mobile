import React, { ComponentProps } from 'react'
import { Platform } from 'react-native'
import { useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import Chip from '@/components/Chip/Chip'
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'
import { Circle, Separator, Square, Stack, StackProps, styled, Card as TCard, Text, withStaticProperties, XStack, YStack } from 'tamagui'

const CardFrame = styled(YStack, {
  backgroundColor: '$white1',
  $gtSm: {
    borderRadius: '$8',
  },
} as const)

export type SkeCardFrameProps = ComponentProps<typeof TCard>
const SkeCardFrame = ({ children, ...props }: SkeCardFrameProps) => {
  const [{ height, width }, setX] = React.useState<{ height: number; width: number }>({ height: 0, width: 0 })

  const sharedWidth = useSharedValue(0)
  const vectorStart = useDerivedValue(() => vec(sharedWidth.value, 0))
  const vectorEnd = useDerivedValue(() => vec(sharedWidth.value + width, 0))

  return (
    <CardFrame
      {...props}
      overflow="hidden"
      position="relative"
      onLayout={(e) => {
        setX(e.nativeEvent.layout)
        sharedWidth.value = -e.nativeEvent.layout.width
        sharedWidth.value = withRepeat(withTiming(e.nativeEvent.layout.width, { duration: 1000 }), -1, true)
      }}
    >
      <YStack gap="$3.5">
        {height > 0 && width > 0 && (
          <Canvas style={{ flex: 1, position: 'absolute', width, height }}>
            <Rect x={0} y={0} width={width} height={height} color="lightblue">
              <LinearGradient
                start={vectorStart}
                end={vectorEnd}
                colors={['rgba(255, 255, 255, 0)', 'rgba(5,143,255,0.1)', 'rgba(38,146,41,0.1)', 'rgba(255, 255, 255, 0)']}
              />
            </Rect>
          </Canvas>
        )}
      </YStack>
      <YStack gap="$3.5">{children}</YStack>
    </CardFrame>
  )
}

export const SkeCardContent = styled(YStack, {
  padding: '$4.5',
  gap: '$3.5',
} as const)

const SkeCardChip = (props: Omit<ComponentProps<typeof Chip>, 'children'>) => {
  return (
    <XStack>
      <Chip {...props} backgroundColor="$gray3" width="$6">
        {'\u00a0\u00a0'}
      </Chip>
    </XStack>
  )
}

const SkeCardTitle = () => {
  return <Stack height="$2" width="100%" bg="$gray2" />
}

const SkeCardDate = () => {
  return (
    <XStack gap="$2" alignItems="center">
      <Square size="$2" bg="$gray2" />
      <Stack height="$1" flex={1} bg="$gray2" />
    </XStack>
  )
}


const SkeActions = () => {
  return (
    <XStack gap="$2" justifyContent="space-between">
      <Stack height="$2.5" width="$12" bg="$gray2" borderRadius="$4" />
      <Stack height="$2.5" width="$10" bg="$gray3" borderRadius="$4" />
    </XStack>
  )
}


const SkeCardAuthor = () => {
  return (
    <XStack gap="$2" alignItems="center">
      <Circle size="$2" bg="$gray2" />
      <Stack height="$1" flex={1} bg="$gray2" />
    </XStack>
  )
}

const SkeCardImage = () => {
  return <Stack height="$20" flex={1} bg="$gray2" borderRadius="$1" />
}

export type SkeCardDescritionProps = {
  full?: boolean
}

const SkeCardDescription = ({ full }: SkeCardDescritionProps) => {
  return (
    <YStack gap="$2">
      {Array.from({ length: full ? 5 : 2 }).map((_, index) => (
        <Stack key={index} height="$1" bg="$gray2" />
      ))}
    </YStack>
  )
}

const SkeCardSection = ({ children, ...props }: StackProps) => {
  return (
    <>
      <SkeCardSeparator />
      <Stack gap="$2" {...props}>
        <Stack height="$1" width="$6" bg="$gray1" />
        {children}
      </Stack>
    </>
  )
}

const SkeCardSeparator = (props: StackProps) => <Separator borderStyle={Platform.OS !== 'ios' ? 'dashed' : 'solid'} {...props} />

export const SkeCard = withStaticProperties(SkeCardFrame, {
  Content: SkeCardContent,
  Chip: SkeCardChip,

  Title: SkeCardTitle,
  Date: SkeCardDate,
  Actions: SkeActions,
  Image: SkeCardImage,
  Author: SkeCardAuthor,
  Section: SkeCardSection,
  Description: SkeCardDescription,
})

export default SkeCard
