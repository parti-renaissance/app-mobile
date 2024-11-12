import { ComponentPropsWithoutRef } from 'react'
import { VoxButton } from '@/components/Button'
import { useUnsubscribeEvent } from '@/services/events/hook'
import { RestItemEvent } from '@/services/events/schema'
import { HelpingHand } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import { isWeb } from 'tamagui'

export type PremiumLockButtonProps = ComponentPropsWithoutRef<typeof VoxButton> &
  Pick<RestItemEvent, 'uuid'> & {
    isPremium?: boolean
    isDue?: boolean
    userUuid?: string
  }

export const EventSubscribePremiumLockButton = ({ uuid, isPremium, isDue, variant, userUuid, ...buttonProps }: PremiumLockButtonProps) => {
  const { mutate, isPending } = useUnsubscribeEvent({ id: uuid })
  const handlePress = () => {
    mutate()
  }
  const dynVariant = variant === 'contained' ? 'soft' : 'outlined'
  const button = (
    <VoxButton
      iconLeft={HelpingHand}
      variant={dynVariant}
      theme={'yellow'}
      testID="event-subscribe-lock-button"
      loading={isPending}
      onPress={handlePress}
      {...buttonProps}
    >
      {isDue ? 'Me mettre à jour et m’inscrire' : 'J’adhère pour m’inscrire'}
    </VoxButton>
  )
  return buttonProps.disabled ? (
    button
  ) : (
    <Link href="/profil/cotisations-et-dons" asChild={!isWeb} disabled={buttonProps.disabled}>
      {button}
    </Link>
  )
}
