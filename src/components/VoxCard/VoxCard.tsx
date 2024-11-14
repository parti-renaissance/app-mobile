import React, { ComponentProps, ReactNode } from 'react'
import { ImageRequireSource } from 'react-native'
import Markdown from 'react-native-markdown-display'
import Text from '@/components/base/Text'
import Chip from '@/components/Chip/Chip'
import ProfilePicture from '@/components/ProfilePicture'
import { CalendarDays, CheckCircle, LockKeyhole, MapPin, UserCheck, Users, Video } from '@tamagui/lucide-icons'
import { Separator, Stack, StackProps, styled, useTheme, withStaticProperties, XStack, YStack, ZStack } from 'tamagui'
import AutoSizeImage from '../AutoSizeImage'
import { getFormatedVoxCardDate } from '../utils'

const CardFrame = styled(YStack, {
  backgroundColor: '$white1',
  $gtSm: {
    borderRadius: 16,
  },
  variants: {
    inside: {
      true: {
        borderRadius: 8,
        $gtSm: {
          borderRadius: 8,
        },
      },
      false: {
        elevation: 1,
        shadowColor: '$gray1',
      },
    },
  },
  defaultVariants: {
    inside: false,
  },
} as const)

export type VoxCardFrameProps = ComponentProps<typeof CardFrame>
export const VoxCardFrame = CardFrame.styleable(({ children, ...props }: VoxCardFrameProps, ref) => {
  return (
    <CardFrame {...props} ref={ref}>
      <YStack gap="$medium">{children}</YStack>
    </CardFrame>
  )
})

export const VoxCardContent = styled(YStack, {
  padding: '$medium',
  gap: '$medium',
} as const)

const VoxCardChip = (props: ComponentProps<typeof Chip>) => {
  return (
    <XStack>
      <Chip {...props}>{props.children}</Chip>
    </XStack>
  )
}

export type VoxCardTitleProps = { children: string | string[] | ReactNode }
const VoxCardTitle = ({ children, underline = true }: VoxCardTitleProps & { underline?: boolean }) => {
  return (
    <XStack borderBottomWidth={underline ? 1 : 0} pb={underline ? 8 : 0} borderColor="$textOutline32" flex={1}>
      <Text.MD multiline semibold lineBreakStrategyIOS="push-out">
        {children}
      </Text.MD>
    </XStack>
  )
}

export type VoxCardDateProps = { start: Date; end?: Date; icon?: boolean; timeZone?: string }
const VoxCardDate = ({ start, end, icon = true, timeZone }: VoxCardDateProps) => {
  const { date, timezone } = getFormatedVoxCardDate({ start, end, timeZone })
  return (
    <XStack gap="$small" alignItems="center">
      {icon && <CalendarDays size={16} color="$textPrimary" />}
      <Text>
        <Text.SM multiline medium>
          {date}
        </Text.SM>
        {timezone ? (
          <Text.SM medium secondary multiline>
            {' '}
            {timezone}
          </Text.SM>
        ) : null}
      </Text>
    </XStack>
  )
}

export type VoxCardCapacity = { children: React.ReactNode }
const VoxCardCapacity = ({ children }: VoxCardCapacity) => {
  return (
    <XStack gap="$small" alignItems="center">
      <Users size={16} color="$textPrimary" />
      <Text.SM medium multiline>
        {children}
      </Text.SM>
    </XStack>
  )
}

export type VoxCardLocationProps = {
  location?: {
    city: string | null
    postalCode: string | null
    street: string | null
  }
}

const VoxCardLocation = ({ location, asTitle = false }: VoxCardLocationProps & { asTitle?: boolean }) => {
  const T = asTitle ? Text.MD : Text.SM
  const WRPT = asTitle ? VoxCardTitle : Text.MD
  return location ? (
    <XStack gap="$small" alignItems="center">
      {!asTitle && <MapPin size={16} color="$textPrimary" />}
      <WRPT flexGrow={1} lineBreakStrategyIOS="push-out">
        <T multiline medium>
          {location.city} {location.postalCode}
        </T>
        <T secondary medium multiline>
          {' '}
          . {location.street}
        </T>
      </WRPT>
    </XStack>
  ) : null
}

export type VoxCardAuthorProps = {
  author?: {
    role?: string | null
    name?: string | null
    zone?: string | null
    title?: string | null
    pictureLink?: string
  }
}

const VoxCardAuthor = ({ author }: VoxCardAuthorProps) => {
  if (!author || !author.name) return null

  const pair1 = [author.title, author.zone].filter(Boolean)
  const pair2 = [author.name, author.role].filter(Boolean)
  return (
    <XStack gap="$small" alignItems="center">
      <ProfilePicture size="$2" rounded src={author.pictureLink} alt="Profile picture" fullName={author.name} />
      <Text>
        {pair1.length > 0 ? (
          <>
            <Text.SM medium>{pair1.join(' • ')}</Text.SM>
            <Text.BR />
          </>
        ) : null}
        <Text.SM
          secondary={pair1.length > 0 ? true : undefined}
          primary={pair1.length === 0 ? true : undefined}
          semibold={pair1.length === 0 ? true : undefined}
        >
          {pair2.join(', ')}
        </Text.SM>
      </Text>
    </XStack>
  )
}

export type VoxCardAttendeesProps = {
  attendees?: {
    pictures?: Array<{ first_name: string; last_name: string; image_url?: string | null }>
    count: number
  }
}

const VoxCardAttendees = ({ attendees }: VoxCardAttendeesProps) => {
  if (!attendees) return <Text>0 participant, soyez le premier !</Text>
  const reverseIndex = (index: number) => (attendees.pictures ? attendees.pictures.length - 1 - index : 0)
  const getPictureObj = (index: number) => (attendees.pictures ? attendees.pictures[reverseIndex(index)] : null)
  const getPictureUri = (index: number) => getPictureObj(index)?.image_url ?? undefined
  const getFullname = (index: number) => (getPictureObj(index) ? `${getPictureObj(index)?.first_name} ${getPictureObj(index)?.last_name}` : '')
  return (
    <XStack gap="$small" alignItems="center">
      {attendees.pictures && attendees.pictures.length > 2 ? (
        <ZStack width={68} height="$2">
          {attendees.pictures.slice(0, 2).map((_, index) => (
            <XStack key={getFullname(index) + index} x={reverseIndex(index) * 20} height="$2" width="$2" borderRadius="$10" overflow="hidden">
              <ProfilePicture src={getPictureUri(index)} alt={`Image de profil de ${getFullname(index)}`} fullName={getFullname(index)} size="$2" rounded />
            </XStack>
          ))}
        </ZStack>
      ) : (
        <UserCheck size={16} color="$textPrimary" />
      )}

      <Text.SM medium>
        {attendees.count} {attendees.count > 1 ? 'Inscrits' : 'Inscrit'}
      </Text.SM>
    </XStack>
  )
}

export type VoxCardImageProps = {
  image: string | ImageRequireSource
  large?: boolean
}

const VoxCardImage = ({ image, large }: VoxCardImageProps) => {
  return (
    <XStack borderRadius={large ? 0 : 8} overflow="hidden">
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
          fontSize: 12,
          lineHeight: 20,
          color: theme.textPrimary.val,
        },
      }}
    >
      {children}
    </Markdown>
  ) : (
    <Text.SM numberOfLines={full ? undefined : 3} multiline>
      {children}
    </Text.SM>
  )
}

const VoxCardVisio = () => {
  return (
    <XStack gap="$small" alignItems="center">
      <Video size={16} color="$textPrimary" />
      <Text.SM medium>Visioconférence</Text.SM>
    </XStack>
  )
}

const VoxCardSection = ({ title, ...props }: StackProps & { title: string }) => {
  return (
    <>
      <VoxCardSeparator />
      <Stack gap="$small" {...props}>
        <Text.SM multiline color="$textDisabled">
          {title}
        </Text.SM>
        {props.children}
      </Stack>
    </>
  )
}

const VoxCardSeparator = (props: StackProps) => <Separator {...props} borderColor={props.backgroundColor ?? '$textOutline32'} borderRadius={1} />

const VoxCardAdhLock = (props?: { lock?: boolean; due?: boolean; isPrivate?: boolean }) => {
  const { lock = true, due = false, isPrivate = false } = props ?? {}
  const color = isPrivate ? '$gray5' : '$yellow5'
  const text = (() => {
    if (isPrivate) return 'Réservé aux militants'
    if (due) return 'Réservé aux adhérents à jour'
    return 'Réservé aux adhérents'
  })()
  return (
    <XStack gap="$xsmall" paddingVertical="$xsmall" alignItems="center">
      {lock ? <LockKeyhole color={color} size={12} /> : <CheckCircle color={color} size={12} />}
      <Text.SM semibold color={color}>
        {text}
      </Text.SM>
    </XStack>
  )
}

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
  AdhLock: VoxCardAdhLock,
})

export default VoxCard
