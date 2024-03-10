import { Text, Card as TCard, YStack, H6, XStack, styled, withStaticProperties, Image } from 'tamagui'
import { CalendarDays, MapPin } from '@tamagui/lucide-icons'
import Chip from '@/components/Chip/Chip'
import { ComponentProps } from 'react'
import i18n from '@/utils/i18n'

const CardFrame = styled(TCard, {
  name: 'Card',
  backgroundColor: '$white',
  borderRadius: '$5',
  padding: '$4.5',
} as const)


export type VoxCardFrameProps = ComponentProps<typeof TCard>
const VoxCardFrame = ({ children, ...props }: VoxCardFrameProps) => {
  return (
    <CardFrame {...props}>
      <YStack gap="$3.5">
        {children}
      </YStack>
    </CardFrame>
  )
}


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
    <Text fontFamily="$PublicSans" fontWeight="$6" lineHeight="$3" fontSize="$2">{props.children}</Text>
  )
}

export type VoxCardDateProps = { date: Date }
const VoxCardDate = ({ date }: VoxCardDateProps) => {
  return (
    <XStack gap="$2">
      <CalendarDays size="$1" />
      <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1">{i18n.t('vox_card.date', { date })}</Text>
    </XStack>
  )
}

export type VoxCardLocationProps = {
  location: {
    city: string,
    postalCode: string,
    street: string,
  },
}

const VoxCardLocation = ({ location }: VoxCardLocationProps) => {
  return (
    <XStack gap="$2">
      <MapPin size="$1" />
      <Text lineBreakStrategyIOS="push-out">
        <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1">
          {location.city} {location.postalCode}
        </Text>
        <Text fontFamily="$PublicSans" fontWeight="$5" color="$gray6" lineHeight="$2" fontSize="$1">{'  '}. {location.street}</Text>
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


export const VoxCard = withStaticProperties(VoxCardFrame, {
  Chip: VoxCardChip,
  Title: VoxCardTitle,
  Date: VoxCardDate,
  Location: VoxCardLocation,
  Image: VoxCardImage,
})

export default VoxCard




