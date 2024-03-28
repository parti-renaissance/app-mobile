import React, { ComponentProps } from 'react'
import { Platform } from 'react-native'
import Markdown, { MarkdownIt } from 'react-native-markdown-display'
import Chip from '@/components/Chip/Chip'
import i18n from '@/utils/i18n'
import { CalendarDays, MapPin, UserCheck, Users, Video } from '@tamagui/lucide-icons'
import { isSameDay } from 'date-fns'
import {
  getFontSize,
  Image,
  Separator,
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

export type VoxCardFrameProps = ComponentProps<typeof TCard>
const VoxCardFrame = ({ children, ...props }: VoxCardFrameProps) => {
  return (
    <CardFrame {...props}>
      <YStack gap="$3.5">{children}</YStack>
    </CardFrame>
  )
}

export const VoxCardContent = styled(YStack, {
  padding: '$4.5',
  gap: '$3.5',
} as const)

const VoxCardChip = (props: ComponentProps<typeof Chip>) => {
  return (
    <XStack>
      <Chip {...props}>{props.children}</Chip>
    </XStack>
  )
}

export type VoxCardTitleProps = { children: string }
const VoxCardTitle = (props: VoxCardTitleProps) => {
  return (
    <Text fontFamily="$PublicSans" fontWeight="$6" color="$textPrimary" lineHeight="$3" fontSize="$2">
      {props.children}
    </Text>
  )
}

export type VoxCardDateProps = { start: Date; end: Date }
const VoxCardDate = ({ start, end }: VoxCardDateProps) => {
  return (
    <XStack gap="$2" alignItems="center">
      <CalendarDays size="$1" />
      <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1">
        {i18n.t(`vox_card.${isSameDay(start, end) ? 'dayDate' : 'daysDate'}`, { start, end })}
      </Text>
    </XStack>
  )
}

export type VoxCardCapacity = { children: React.ReactNode }
const VoxCardCapacity = ({ children }: VoxCardCapacity) => {
  return (
    <XStack gap="$2" alignItems="center">
      <Users size="$1" />
      <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1">
        {children}
      </Text>
    </XStack>
  )
}

export type VoxCardLocationProps = {
  location: {
    city: string
    postalCode: string
    street: string
  }
}

const VoxCardLocation = ({ location }: VoxCardLocationProps) => {
  return (
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
  )
}

export type VoxCardAuthorProps = {
  author: {
    role?: string
    name?: string
    title?: string
    pictureLink?: string
  }
}

const VoxCardAuthor = ({ author }: VoxCardAuthorProps) => {
  return (
    <XStack gap="$2" alignItems="center">
      <XStack height="$2" width="$2" borderRadius="$10" overflow="hidden">
        <Image source={{ uri: author.pictureLink, width: 50, height: 50 }} width="100%" alt="event image" resizeMode="cover" />
      </XStack>
      <Text fontFamily="$PublicSans" fontSize="$1" lineHeight="$1">
        <Text fontWeight="$5" color="$textSecondary">
          {' '}
          {author.role}
        </Text>
        {'\n'}
        <Text fontWeight="$4" color="$textSecondary">
          {' '}
          {author.name}, {author.title}
        </Text>
      </Text>
    </XStack>
  )
}

export type VoxCardAttendeesProps = {
  attendees?: {
    pictures?: [string, string, string]
    count: number
  }
}

const VoxCardAttendees = ({ attendees }: VoxCardAttendeesProps) => {
  if (!attendees)
    return (
      <Text fontFamily="$PublicSans" fontSize="$1" color="$textPrimary" lineHeight="$1">
        0 pariticpant, soyez le premier !
      </Text>
    )
  const reverseIndex = (index: number) => attendees.pictures.length - 1 - index
  return (
    <XStack gap="$2" alignItems="center">
      {attendees.pictures && attendees.pictures.length > 3 ? (
        <ZStack width={68} height="$2">
          {attendees.pictures.map((_, index) => (
            <XStack key={index} x={reverseIndex(index) * 20} height="$2" width="$2" borderRadius="$10" overflow="hidden">
              <Image source={{ uri: attendees.pictures[reverseIndex(index)], width: 50, height: 50 }} width="100%" alt="event image" resizeMode="cover" />
            </XStack>
          ))}
        </ZStack>
      ) : (
        <UserCheck size="$1" />
      )}

      <Text fontFamily="$PublicSans" color="$textPrimary" fontSize="$1" lineHeight="$1" fontWeight="$5">
        {attendees.count} Inscrits
      </Text>
    </XStack>
  )
}

export type VoxCardImageProps = {
  image: string
  large?: boolean
}

const VoxCardImage = ({ image, large }: VoxCardImageProps) => {
  const media = useMedia()
  return (
    <XStack $gtSm={{ maxHeight: large ? 'auto' : '$15' }} borderRadius="$1" overflow="hidden">
      <Image source={{ uri: image, width: 600, height: large && media.gtLg ? 400 : 244 }} width="100%" alt="event image" resizeMode="cover" />
    </XStack>
  )
}

export type VoxCardDescritionProps = {
  children: string | string[]
  full?: boolean
  markdown?: boolean
}

const VoxCardDescription = ({ children, full, markdown }: VoxCardDescritionProps) => {
  const theme = useTheme()
  return markdown ? (
    <Markdown
      style={{
        body: {
          fontFamily: 'PublicSans-Medium',
          fontSize: getFontSize('$1', { font: '$PublicSans' }),
          color: theme.textPrimary.val,
          lineHeight: getFontSize('$4', { font: '$PublicSans' }),
        },
      }}
    >
      {children}
    </Markdown>
  ) : (
    <Text numberOfLines={full ? undefined : 3} fontFamily="$PublicSans" fontWeight="$4" lineHeight="$2" fontSize="$1" color="$textPrimary">
      {children}
    </Text>
  )
}

const VoxCardVisio = () => {
  return (
    <XStack gap="$2" alignItems="center">
      <Video size="$1" />
      <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1">
        Visioconférence
      </Text>
    </XStack>
  )
}

const VoxCardSection = ({ title, ...props }: StackProps & { title: string }) => {
  return (
    <>
      <VoxCardSeparator />
      <Stack gap="$2" {...props}>
        <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$textDisabled">
          {title}
        </Text>
        {props.children}
      </Stack>
    </>
  )
}

const VoxCardSeparator = (props: StackProps) => <Separator borderStyle={Platform.OS !== 'ios' ? 'dashed' : 'solid'} />

export const VoxCard = withStaticProperties(VoxCardFrame, {
  Content: VoxCardContent,
  Chip: VoxCardChip,
  Title: VoxCardTitle,
  Date: VoxCardDate,
  Location: VoxCardLocation,
  Image: VoxCardImage,
  Author: VoxCardAuthor,
  Attendees: VoxCardAttendees,
  Description: VoxCardDescription,
  Visio: VoxCardVisio,
  Capacity: VoxCardCapacity,
  Separator: VoxCardSeparator,
  Section: VoxCardSection,
})

export default VoxCard
