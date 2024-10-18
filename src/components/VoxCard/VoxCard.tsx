import React, { ComponentProps, ReactNode } from 'react'
import { ImageRequireSource, Platform } from 'react-native'
import Markdown from 'react-native-markdown-display'
import Text from '@/components/base/Text'
import Chip from '@/components/Chip/Chip'
import ProfilePicture from '@/components/ProfilePicture'
import i18n from '@/utils/i18n'
import { CalendarDays, LockKeyhole, MapPin, UserCheck, Users, Video } from '@tamagui/lucide-icons'
import { getHours, isSameDay } from 'date-fns'
import { format } from 'date-fns-tz'
import { Separator, Stack, StackProps, styled, useTheme, withStaticProperties, XStack, YStack, ZStack } from 'tamagui'
import AutoSizeImage from '../AutoSizeImage'

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
      <YStack gap="$3.5">{children}</YStack>
    </CardFrame>
  )
})

export const VoxCardContent = styled(YStack, {
  padding: 16,
  gap: 16,
} as const)

const VoxCardChip = (props: ComponentProps<typeof Chip>) => {
  return (
    <XStack>
      <Chip {...props}>{props.children}</Chip>
    </XStack>
  )
}

export type VoxCardTitleProps = { children: string | string[] | ReactNode }
const VoxCardTitle = (props: VoxCardTitleProps) => {
  return (
    <XStack borderBottomWidth={1} pb={8} borderColor="$textOutline32" flex={1}>
      <Text.MD multiline semibold lineBreakStrategyIOS="push-out">
        {props.children}
      </Text.MD>
    </XStack>
  )
}

export type VoxCardDateProps = { start: Date; end: Date; icon?: boolean; timeZone?: string }
const VoxCardDate = ({ start, end, icon = true, timeZone }: VoxCardDateProps) => {
  const keySuffix = getHours(start) === getHours(end) ? '' : 'End'
  const keyPrefix = isSameDay(start, end) ? 'day' : 'days'
  const key = `${keyPrefix}Date${keySuffix}`
  return (
    <XStack gap="$2" alignItems="center">
      {icon && <CalendarDays size={16} color="$textPrimary" />}
      <Text>
        <Text.SM multiline medium>
          {i18n.t(`vox_card.${key}`, { start, end })}
        </Text.SM>
        {timeZone && timeZone !== 'Europe/Paris' && (
          <Text.SM medium secondary multiline>
            {' '}
            • UTC{format(start, 'XXX', { timeZone })} ({timeZone})
          </Text.SM>
        )}
      </Text>
    </XStack>
  )
}

export type VoxCardCapacity = { children: React.ReactNode }
const VoxCardCapacity = ({ children }: VoxCardCapacity) => {
  return (
    <XStack gap="$2" alignItems="center">
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
  const WRPT = asTitle ? VoxCardTitle : Text
  return location ? (
    <XStack gap="$2" alignItems="center">
      {!asTitle && <MapPin size={16} color="$textPrimary" />}
      <WRPT>
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
    role: string | null
    name: string | null
    zone: string | null
    title: string | null
    pictureLink?: string
  }
}

const VoxCardAuthor = ({ author }: VoxCardAuthorProps) => {
  if (!author || !author.name) return null
  return (
    <XStack gap="$2" alignItems="center">
      <ProfilePicture size="$2" rounded src={author.pictureLink} alt="Profile picture" fullName={author.name} />
      {author.title && author.role && author.zone ? (
        <Text>
          <Text.SM medium primary>
            {author.title} • {author.zone}
          </Text.SM>
          <Text.BR />
          <Text.SM secondary>
            {author.name}, {author.role}
          </Text.SM>
        </Text>
      ) : (
        <Text.SM primary medium>
          {author.name}
        </Text.SM>
      )}
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
    <XStack gap="$2" alignItems="center">
      {attendees.pictures && attendees.pictures.length > 2 ? (
        <ZStack width={68} height="$2">
          {attendees.pictures.slice(0, 2).map((_, index) => (
            <XStack key={getFullname(index) + index} x={reverseIndex(index) * 20} height="$2" width="$2" borderRadius="$10" overflow="hidden">
              <ProfilePicture src={getPictureUri(index)} alt={`Image de profil de ${getFullname(index)}`} fullName={getFullname(index)} size="$2" rounded />
            </XStack>
          ))}
        </ZStack>
      ) : (
        <UserCheck size="$1" color="$textPrimary" />
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
    <XStack gap="$2" alignItems="center">
      <Video size={16} color="$textPrimary" />
      <Text.SM medium>Visioconférence</Text.SM>
    </XStack>
  )
}

const VoxCardSection = ({ title, ...props }: StackProps & { title: string }) => {
  return (
    <>
      <VoxCardSeparator />
      <Stack gap="$2" {...props}>
        <Text.SM multiline color="$textDisabled">
          {title}
        </Text.SM>
        {props.children}
      </Stack>
    </>
  )
}

const VoxCardSeparator = (props: StackProps) => (
  <Separator {...props} borderColor={props.backgroundColor ?? '$textOutline32'} borderStyle={Platform.OS !== 'ios' ? 'dashed' : 'solid'} borderRadius={1} />
)

const VoxCardAdhLock = () => {
  return (
    <XStack gap={4} alignItems="center">
      <LockKeyhole color="$yellow5" size={12} />
      <Text.SM semibold color="$yellow5">
        Réservé aux adhérents
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
