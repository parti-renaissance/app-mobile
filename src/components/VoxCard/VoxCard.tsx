import React, { ComponentProps } from 'react'
import { ImageRequireSource, Platform } from 'react-native'
import Markdown from 'react-native-markdown-display'
import Text from '@/components/base/Text'
import Chip from '@/components/Chip/Chip'
import ProfilePicture from '@/components/ProfilePicture'
import i18n from '@/utils/i18n'
import { CalendarDays, MapPin, UserCheck, Users, Video } from '@tamagui/lucide-icons'
import { getHours, isSameDay } from 'date-fns'
import { format } from 'date-fns-tz'
import { Image, Separator, Stack, StackProps, styled, useTheme, View, withStaticProperties, XStack, YStack, ZStack } from 'tamagui'
import AutoSizeImage from '../AutoSizeImage'

const CardFrame = styled(YStack, {
  backgroundColor: '$white1',
  $gtSm: {
    borderRadius: '$8',
  },
} as const)

export type VoxCardFrameProps = ComponentProps<typeof YStack>
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
    <Text fontWeight="$6" lineHeight="$3" fontSize="$3">
      {props.children}
    </Text>
  )
}

export type VoxCardDateProps = { start: Date; end: Date; icon?: boolean; timeZone?: string }
const VoxCardDate = ({ start, end, icon = true, timeZone }: VoxCardDateProps) => {
  const keySuffix = getHours(start) === getHours(end) ? '' : 'End'
  const keyPrefix = isSameDay(start, end) ? 'day' : 'days'
  const key = `${keyPrefix}Date${keySuffix}`
  return (
    <XStack gap="$2" alignItems="center">
      {icon && <CalendarDays size="$1" color="$textPrimary" />}
      <Text>
        <Text fontWeight="$5" lineHeight="$2">
          {i18n.t(`vox_card.${key}`, { start, end })}
        </Text>
        {timeZone && timeZone !== 'Europe/Paris' && (
          <Text fontWeight="$5" color="$textSecondary" lineHeight="$2">
            {' '}
            • UTC{format(start, 'XXX', { timeZone })} ({timeZone})
          </Text>
        )}
      </Text>
    </XStack>
  )
}

export type VoxCardCapacity = { children: React.ReactNode }
const VoxCardCapacity = ({ children }: VoxCardCapacity) => {
  return (
    <XStack gap="$2" alignItems="center">
      <Users size="$2" color="$textPrimary" />
      <Text fontWeight="$5" lineHeight="$2">
        {children}
      </Text>
    </XStack>
  )
}

export type VoxCardLocationProps = {
  location?: {
    city: string
    postalCode: string
    street: string
  }
}

const VoxCardLocation = ({ location }: VoxCardLocationProps) => {
  return location ? (
    <XStack gap="$2" alignItems="center">
      <MapPin size="$1" color="$textPrimary" />
      <Text lineBreakStrategyIOS="push-out">
        <Text fontWeight="$5" lineHeight="$2">
          {location.city} {location.postalCode}
        </Text>
        <Text fontWeight="$6" color="$textSecondary" lineHeight="$2">
          {' '}
          . {location.street}
        </Text>
      </Text>
    </XStack>
  ) : null
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
  if (!author.name) return null
  return (
    <XStack gap="$2" alignItems="center">
      <ProfilePicture size="$2" rounded src={author.pictureLink} alt="Profile picture" fullName={author.name} />
      <Text>
        <Text fontWeight="$4" color="$textSecondary">
          {author.name}
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
  if (!attendees) return <Text>0 participant, soyez le premier !</Text>
  const reverseIndex = (index: number) => (attendees.pictures ? attendees.pictures.length - 1 - index : 0)
  const getPictureUri = (index: number) => (attendees.pictures ? attendees.pictures[reverseIndex(index)] : '')
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
        <UserCheck size="$1" color="$textPrimary" />
      )}

      <Text fontWeight="$5">
        {attendees.count} {attendees.count > 1 ? 'Inscrits' : 'Inscrit'}
      </Text>
    </XStack>
  )
}

export type VoxCardImageProps = {
  image: string | ImageRequireSource
  large?: boolean
}

const VoxCardImage = ({ image }: VoxCardImageProps) => {
  return (
    <XStack borderRadius="$1" overflow="hidden">
      <AutoSizeImage source={image} />
    </XStack>
  )
}

export type VoxCardDescriptionProps = {
  children: string | string[]
  full?: boolean
  markdown?: boolean
}

const VoxCardDescription = ({ children, full, markdown }: VoxCardDescriptionProps) => {
  const theme = useTheme()
  return markdown ? (
    <Markdown
      style={{
        body: {
          fontFamily: 'PublicSans-Regular',
          fontSize: 14,
          color: theme.textPrimary.val,
        },
      }}
    >
      {children}
    </Markdown>
  ) : (
    <Text numberOfLines={full ? undefined : 3} fontWeight="$4" lineHeight="$2">
      {children}
    </Text>
  )
}

const VoxCardVisio = () => {
  return (
    <XStack gap="$2" alignItems="center">
      <Video size="$2" color="$textPrimary" />
      <Text fontWeight="$5" lineHeight="$2">
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
        <Text fontWeight="$5" lineHeight="$2" color="$textDisabled">
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
