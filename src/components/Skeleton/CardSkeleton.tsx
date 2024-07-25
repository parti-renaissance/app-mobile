import React, { ComponentProps, useEffect } from 'react'
import { Platform } from 'react-native'
import Chip from '@/components/Chip/Chip'
import { LinearGradient } from '@tamagui/linear-gradient'
import { Users } from '@tamagui/lucide-icons'
import { Circle, Separator, Square, Stack, StackProps, styled, Card as TCard, Text, withStaticProperties, XStack, YStack } from 'tamagui'

const CardFrame = styled(YStack, {
  backgroundColor: '$white1',
  $gtSm: {
    borderRadius: '$8',
  },
} as const)

export type SkeCardFrameProps = ComponentProps<typeof TCard>
const SkeCardFrame = ({ children, ...props }: SkeCardFrameProps) => {
  const [x, setX] = React.useState(100)
  useEffect(() => {
    const interval = setInterval(() => {
      setX((prev) => (prev > 0 ? -prev : Math.abs(prev)))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <CardFrame
      {...props}
      overflow="hidden"
      position="relative"
      onLayout={(e) => {
        const { height } = e.nativeEvent.layout
        setX(height)
      }}
    >
      <YStack gap="$3.5">{children}</YStack>
      <LinearGradient
        animation="slow"
        animateOnly={['transform']}
        colors={['rgba(255, 255, 255, 0)', 'rgba(0,0,0, 0.05)', 'rgba(255, 255, 255, 0)']}
        position="absolute"
        left={0}
        bottom={0}
        transform={[{ translateY: x }]}
        width="100%"
        height="100%"
      />
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

export type SkeCardCapacity = { children: React.ReactNode }
const SkeCardCapacity = ({ children }: SkeCardCapacity) => {
  return (
    <XStack gap="$2" alignItems="center">
      <Users size="$1" />
      <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1">
        {children}
      </Text>
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

export type SkeCardLocationProps = {
  location?: {
    city: string
    postalCode: string
    street: string
  }
}

export type SkeCardAuthorProps = {
  author: {
    role?: string
    name?: string
    title?: string
    pictureLink?: string
  }
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
