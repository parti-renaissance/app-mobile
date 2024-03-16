import { ComponentProps } from 'react'
import Chip from '@/components/Chip/Chip'
import i18n from '@/utils/i18n'
import { CalendarDays, MapPin, Video } from '@tamagui/lucide-icons'
import { Image, styled, Card as TCard, Text, withStaticProperties, XStack, YStack, ZStack } from 'tamagui'

const CardFrame = styled(YStack, {
  name: 'Card',
  backgroundColor: '$white1',
  $gtMd: {
    borderRadius: '$5',
  }
} as const)

export type VoxCardFrameProps = ComponentProps<typeof TCard>
const VoxCardFrame = ({ children, ...props }: VoxCardFrameProps) => {
  return (
    <CardFrame {...props}>
      <YStack gap="$3.5" >{children}</YStack>
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

export type VoxCardDateProps = { date: Date }
const VoxCardDate = ({ date }: VoxCardDateProps) => {
  return (
    <XStack gap="$2" alignItems="center">
      <CalendarDays size="$1" />
      <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1">
        {i18n.t('vox_card.date', { date })}
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
    pictures: [string, string, string]
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
      <ZStack width={68} height="$2">
        {attendees.pictures.map((_, index) => (
          <XStack key={index} x={reverseIndex(index) * 20} height="$2" width="$2" borderRadius="$10" overflow="hidden">
            <Image source={{ uri: attendees.pictures[reverseIndex(index)], width: 50, height: 50 }} width="100%" alt="event image" resizeMode="cover" />
          </XStack>
        ))}
      </ZStack>

      <Text fontFamily="$PublicSans" fontSize="$1" lineHeight="$1">
        {attendees.count} Inscrits
      </Text>
    </XStack>
  )
}

export type VoxCardImageProps = {
  image: string
}

const VoxCardImage = ({ image }: VoxCardImageProps) => {
  return (
    <XStack maxHeight="$13" $gtSm={{ maxHeight: '$15' }} borderRadius="$1" overflow="hidden">
      <Image source={{ uri: image, width: 600, height: 244 }} width="100%" alt="event image" resizeMode="cover" />
    </XStack>
  )
}

export type VoxCardDescritionProps = {
  children: string
}

const VoxCardDescrition = ({ children }: VoxCardDescritionProps) => {
  return (
    <Text numberOfLines={3} fontFamily="$PublicSans" fontWeight="$4" lineHeight="$2" fontSize="$1" color="$textPrimary">
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

export const VoxCard = withStaticProperties(VoxCardFrame, {
  Content: VoxCardContent,
  Chip: VoxCardChip,
  Title: VoxCardTitle,
  Date: VoxCardDate,
  Location: VoxCardLocation,
  Image: VoxCardImage,
  Author: VoxCardAuthor,
  Attendees: VoxCardAttendees,
  Description: VoxCardDescrition,
  Visio: VoxCardVisio,
})

export default VoxCard
