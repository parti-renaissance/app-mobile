import { Text, Card as TCard, YStack, H6, XStack, styled, withStaticProperties } from 'tamagui'
import { CalendarDays } from '@tamagui/lucide-icons'
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
      {/* @ts-ignore  */}
      <YStack gap="$3.5">
        {children}
      </YStack>
    </CardFrame>
  )
}


const VoxCardChip = (props: ComponentProps<typeof Chip>) => {
  return (
    <XStack>
      {/* @ts-ignore  */}
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
const VoxCardDate = ({date}: VoxCardDateProps) => {
  return (
    <XStack gap="$2">
      <CalendarDays size="$1" />
      <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1">{i18n.t('vox_card.date', { date })}</Text>
    </XStack>
  )
}


export const VoxCard = withStaticProperties(VoxCardFrame, {
  Chip: VoxCardChip,
  Title: VoxCardTitle,
  Date: VoxCardDate,
})

export default VoxCard




