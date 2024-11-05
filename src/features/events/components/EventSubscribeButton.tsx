import { ComponentPropsWithoutRef } from 'react'
import { VoxButton } from '@/components/Button'
import { useSubscribeEvent } from '@/services/events/hook'
import { RestItemEvent } from '@/services/events/schema'
import { Calendar } from '@tamagui/lucide-icons'

type ButtonProps = ComponentPropsWithoutRef<typeof VoxButton> &
  Pick<RestItemEvent, 'uuid'> & {
    isPremium?: boolean
  }

export const EventSubscribeButton = ({ uuid, isPremium, ...buttonProps }: ButtonProps) => {
  const { mutate, isPending } = useSubscribeEvent({ id: uuid })
  const handlePress = () => {
    mutate()
  }
  return (
    <VoxButton
      iconLeft={Calendar}
      variant="outlined"
      theme={isPremium ? 'yellow' : 'blue'}
      testID="event-subscribe-button"
      loading={isPending}
      onPress={handlePress}
      {...buttonProps}
    >
      M'inscrire
    </VoxButton>
  )
}
