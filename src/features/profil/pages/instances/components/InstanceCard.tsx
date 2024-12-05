import { NamedExoticComponent } from 'react'
import EmptyStateInstanceIllustration from '@/assets/illustrations/EmptyStateInstanceIllustration'
import Text from '@/components/base/Text'
import ProfilePicture from '@/components/ProfilePicture'
import VoxCard from '@/components/VoxCard/VoxCard'
import { IconProps } from '@tamagui/helpers-icon'
import { withStaticProperties, XStack, YStack } from 'tamagui'

type InstanceCardHeaderProps = {
  title: string
  icon: NamedExoticComponent<IconProps>
  middleIconOffset?: number
  headerLeft?: React.ReactNode
}

export const InstanceCardHeader = (props: InstanceCardHeaderProps) => {
  return (
    <XStack gap={8} alignItems="center" justifyContent="space-between">
      <XStack gap={8} alignItems="center">
        <props.icon color="$textPrimary" size={20} />
        <Text.LG semibold>{props.title}</Text.LG>
      </XStack>
      {props.headerLeft}
    </XStack>
  )
}

type InstanceCardProps = {
  description: string
  children: React.ReactNode
  footer: React.ReactNode
} & InstanceCardHeaderProps

const InstanceCard = (props: InstanceCardProps) => {
  return (
    <VoxCard>
      <VoxCard.Content>
        <InstanceCardHeader {...props} />
        <Text.P>{props.description}</Text.P>
        {props.children}
        {props.footer}
      </VoxCard.Content>
    </VoxCard>
  )
}

type AuthorContentProps = {
  name: string
  avatar: string
  role: string
}

type InstanceCardContentProps = {
  title: string
  description?: string
  author?: AuthorContentProps
}

export const AuthorContent = (props: AuthorContentProps) => {
  return (
    <XStack>
      <ProfilePicture rounded src={props.avatar} fullName={props.name} alt={`Avatar de ${props.name}`} />
      <YStack>
        <Text.SM>{props.name}</Text.SM>
        <Text.P>{props.role}</Text.P>
      </YStack>
    </XStack>
  )
}

const InstanceCardContent = (props: InstanceCardContentProps) => {
  return (
    <VoxCard inside borderWidth={1} borderColor="$textOutline32">
      <VoxCard.Content>
        <YStack gap={8}>
          <Text.MD semibold>{props.title}</Text.MD>
          {props.description ? <Text.SM color="$textSecondary">{props.description}</Text.SM> : null}
        </YStack>
        {props.author && <AuthorContent {...props.author} />}
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
      <VoxCard.Content alignItems="center" justifyContent="center">
        <EmptyStateInstanceIllustration />
        <Text.P textAlign="center">{props.message}</Text.P>
      </VoxCard.Content>
    </VoxCard>
  )
}

export default withStaticProperties(InstanceCard, { Content: InstanceCardContent, EmptyState })
