import React, { ComponentProps } from 'react'
import { Platform } from 'react-native'
import Markdown from 'react-native-markdown-display'
import Chip from '@/components/Chip/Chip'
import ProfilePicture from '@/components/ProfilePicture'
import i18n from '@/utils/i18n'
import { CalendarDays, MapPin, UserCheck, Users, Video } from '@tamagui/lucide-icons'
import { getHours, isSameDay } from 'date-fns'
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
  useTheme,
  withStaticProperties,
  XStack,
  YStack,
  ZStack,
} from 'tamagui'

const CardFrame = styled(YStack, {
  name: 'Card',
  backgroundColor: '$white1',
  $gtSm: {
    borderRadius: '$8',
  },
} as const)

export type SkeCardFrameProps = ComponentProps<typeof TCard>
const SkeCardFrame = ({ children, ...props }: SkeCardFrameProps) => {
  return (
    <CardFrame {...props}>
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
        {''}
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

const SkeCardAttendees = ({ attendees }: SkeCardAttendeesProps) => {
  if (!attendees)
    return (
      <Text fontFamily="$PublicSans" fontSize="$1" color="$textPrimary" lineHeight="$1">
        0 participant, soyez le premier !
      </Text>
    )
  const reverseIndex = (index: number) => attendees.pictures.length - 1 - index
  const getPictureUri = (index: number) => attendees.pictures[reverseIndex(index)]
  return (
    <XStack gap="$2" alignItems="center">
      {attendees.pictures && attendees.pictures.length > 3 ? (
        <ZStack width={68} height="$2">
          {attendees.pictures.map((_, index) => (
            <XStack key={encodeURI(getPictureUri(index))} x={reverseIndex(index) * 20} height="$2" width="$2" borderRadius="$10" overflow="hidden">
              <Image source={{ uri: getPictureUri(index), width: 50, height: 50 }} width="100%" alt="event image" resizeMode="cover" />
            </XStack>
          ))}
        </ZStack>
      ) : (
        <UserCheck size="$1" />
      )}

      <Text fontFamily="$PublicSans" color="$textPrimary" fontSize="$1" lineHeight="$1" fontWeight="$5">
        {attendees.count} {attendees.count > 1 ? 'Inscrits' : 'Inscrit'}
      </Text>
    </XStack>
  )
}

export type SkeCardImageProps = {
  image: string
  large?: boolean
}

const SkeCardImage = ({ image, large }: SkeCardImageProps) => {
  const media = useMedia()
  return (
    <XStack $gtSm={{ maxHeight: large ? 'auto' : '$15' }} borderRadius="$1" overflow="hidden">
      <Image source={{ uri: image, width: 600, height: large && media.gtLg ? 400 : 244 }} width="100%" alt="event image" resizeMode="cover" />
    </XStack>
  )
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

const SkeCardSection = ({ title, ...props }: StackProps & { title: string }) => {
  return (
    <>
      <SkeCardSeparator />
      <Stack gap="$2" {...props}>
        <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$textDisabled">
          {title}
        </Text>
        {props.children}
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
  //   Location: SkeCardLocation,
  //   Image: SkeCardImage,
  Author: SkeCardAuthor,
  //   Attendees: SkeCardAttendees,
  Description: SkeCardDescription,
  //   Visio: SkeCardVisio,
  //   Capacity: SkeCardCapacity,
  //   Separator: SkeCardSeparator,
  //   Section: SkeCardSection,
})

export default SkeCard
