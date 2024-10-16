import { NamedExoticComponent } from 'react'
import EmptyStateInstanceIllustration from '@/assets/illustrations/EmptyStateInstanceIllustration'
import Text from '@/components/base/Text'
import ProfilePicture from '@/components/ProfilePicture'
import VoxCard, { VoxCardAuthorProps } from '@/components/VoxCard/VoxCard'
import { IconProps } from '@tamagui/helpers-icon'
import { withStaticProperties, XStack, YStack, ZStack } from 'tamagui'

type InstanceCardProps = {
  title: string
  icon: NamedExoticComponent<IconProps>
  middleIconOffset?: number
  description: string
  children: React.ReactNode
  footer: React.ReactNode
}

const InstanceCard = (props: InstanceCardProps) => {
  return (
    <VoxCard>
      <VoxCard.Content>
        <XStack gap={8} alignItems="center">
          <ZStack height={20} width={20}>
            <props.icon color="$textPrimary" size={20} />
            <props.icon
              color="$textPrimary"
              size={20}
              transform={[{ translateY: props.middleIconOffset || 0 }]}
              strokeWidth={5}
              scale={0.375}
              overflow="visible"
            />
          </ZStack>
          <Text.LG semibold>{props.title}</Text.LG>
        </XStack>
        <Text.P>{props.description}</Text.P>
        {props.children}
        {props.footer}
      </VoxCard.Content>
    </VoxCard>
  )
}

type InstanceCardContentProps = {
  title: string
  description?: string
  author?: {
    name: string
    avatar: string
    role: string
  }
}
const InstanceCardContent = (props: InstanceCardContentProps) => {
  return (
    <VoxCard inside borderWidth={1} borderColor="$textOutline32">
      <VoxCard.Content>
        <YStack gap={8}>
          <Text.MD semibold>{props.title}</Text.MD>
          {props.description ? <Text.SM color="$textSecondary">{props.description}</Text.SM> : null}
        </YStack>
        {props.author && (
          <XStack>
            <ProfilePicture rounded src={props.author.avatar} fullName={props.author.name} alt={`Avatar de ${props.author.name}`} />
            <YStack>
              <Text.SM>{props.author.name}</Text.SM>
              <Text.P>{props.author.role}</Text.P>
            </YStack>
          </XStack>
        )}
      </VoxCard.Content>
    </VoxCard>
  )
}

type InstanceCardEmptyStateProps = {
  message: string
}

const EmptyState = (props: InstanceCardEmptyStateProps) => {
  return (
    <VoxCard inside borderWidth={1} borderColor="$textOutline32">
      <VoxCard.Content>
        <EmptyStateInstanceIllustration />
        <Text.P>{props.message}</Text.P>
      </VoxCard.Content>
    </VoxCard>
  )
}

export default withStaticProperties(InstanceCard, { Content: InstanceCardContent, EmptyState })
