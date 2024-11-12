import { ComponentPropsWithoutRef } from 'react'
import { VoxButton } from '@/components/Button'
import { useUnsubscribeEvent } from '@/services/events/hook'
import { RestItemEvent } from '@/services/events/schema'
import { CalendarOff } from '@tamagui/lucide-icons'

type ButtonProps = ComponentPropsWithoutRef<typeof VoxButton> &
  Pick<RestItemEvent, 'uuid'> & {
    isPremium?: boolean
    userUuid?: string
  }

export const EventUnSubscribeButton = ({ uuid, isPremium, variant, userUuid, disabled, ...buttonProps }: ButtonProps) => {
  const { mutate, isPending } = useUnsubscribeEvent({ id: uuid })
  const handlePress = () => {
    if (!userUuid) return
    mutate()
  }
  const dynVariant = variant === 'contained' ? 'soft' : 'outlined'
  return (
    <VoxButton
      iconLeft={CalendarOff}
      variant={dynVariant}
      theme={isPremium ? 'yellow' : 'blue'}
      testID="event-unsubscribe-button"
      loading={isPending}
      onPress={handlePress}
      disabled={[disabled, !Boolean(userUuid)].some(Boolean)}
      {...buttonProps}
    >
      Me désinscrire
    </VoxButton>
  )
}
