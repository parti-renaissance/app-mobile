import React, { ComponentProps, ComponentType, useCallback, useDeferredValue, useEffect, useMemo } from 'react'
import { Dimensions, Platform } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import Chip from '@/components/Chip/Chip'
import { LinearGradient } from '@tamagui/linear-gradient'
import { CalendarDays, MapPin, UserCheck, Users, Video } from '@tamagui/lucide-icons'
import { use } from 'i18next'
// import { LinearGradient } from 'expo-linear-gradient';
import {
  Circle,
  getFontSize,
  Image,
  Separator,
  Square,
  Stack,
  StackProps,
  styled,
  Card as TCard,
  Text,
  useMedia,
  withStaticProperties,
  XStack,
  YStack,
  ZStack,
} from 'tamagui'

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

const SkeCardLocation = ({ location }: SkeCardLocationProps) => {
  return location ? (
    <XStack gap="$2" alignItems="center">
      <MapPin size="$1" />
      <Text lineBreakStrategyIOS="push-out">
        <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1">
          {location.city} {location.postalCode}
        </Text>
        <Text fontFamily="$PublicSans" fontWeight="$6" color="$textSecondary" lineHeight="$2" fontSize="$1">
          {' '}
          . {location.street}
        </Text>
      </Text>
    </XStack>
  ) : null
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

export type SkeCardAttendeesProps = {
  attendees?: {
    pictures?: [string, string, string]
    count: number
  }
}

// const SkeCardAttendees = ({ attendees }: SkeCardAttendeesProps) => {
//   if (!attendees)
//     return (
//       <Text fontFamily="$PublicSans" fontSize="$1" color="$textPrimary" lineHeight="$1">
//         0 participant, soyez le premier !
//       </Text>
//     )
//   const reverseIndex = (index: number) => attendees.pictures.length - 1 - index
//   const getPictureUri = (index: number) => attendees.pictures[reverseIndex(index)]
//   return (
//     <XStack gap="$2" alignItems="center">
//       {attendees.pictures && attendees.pictures.length > 3 ? (
//         <ZStack width={68} height="$2">
//           {attendees.pictures.map((_, index) => (
//             <XStack key={encodeURI(getPictureUri(index))} x={reverseIndex(index) * 20} height="$2" width="$2" borderRadius="$10" overflow="hidden">
//               <Image source={{ uri: getPictureUri(index), width: 50, height: 50 }} width="100%" alt="event image" resizeMode="cover" />
//             </XStack>
//           ))}
//         </ZStack>
//       ) : (
//         <UserCheck size="$1" />
//       )}

//       <Text fontFamily="$PublicSans" color="$textPrimary" fontSize="$1" lineHeight="$1" fontWeight="$5">
//         {attendees.count} {attendees.count > 1 ? 'Inscrits' : 'Inscrit'}
//       </Text>
//     </XStack>
//   )
// }

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

const SkeCardVisio = () => {
  return (
    <XStack gap="$2" alignItems="center">
      <Video size="$1" />
      <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1">
        Visioconférence
      </Text>
    </XStack>
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

const SkeCardSeparator = (props: StackProps) => <Separator borderStyle={Platform.OS !== 'ios' ? 'dashed' : 'solid'} />

export const SkeCard = withStaticProperties(SkeCardFrame, {
  Content: SkeCardContent,
  Chip: SkeCardChip,

  Title: SkeCardTitle,
  Date: SkeCardDate,
  Actions: SkeActions,
  //   Location: SkeCardLocation,
  Image: SkeCardImage,
  Author: SkeCardAuthor,
  //   Attendees: SkeCardAttendees,
  Description: SkeCardDescription,
  Section: SkeCardSection,
  //   Visio: SkeCardVisio,
  //   Capacity: SkeCardCapacity,
  //   Separator: SkeCardSeparator,
  //   Section: SkeCardSection,
})

export default SkeCard
