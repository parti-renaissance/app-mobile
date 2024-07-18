import { Button } from '@/components'
import InternAlert from '@/components/InternAlert/InternAlert'
import VoxCard, { VoxCardAttendeesProps, VoxCardAuthorProps, VoxCardDateProps, VoxCardFrameProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { ActionStatus } from '@/data/restObjects/RestActions'
import { useSubscribeAction, useUnsubscribeAction } from '@/hooks/useActions/useActions'
import { isBefore } from 'date-fns'
import { capitalize } from 'lodash'
import { Spinner, XStack } from 'tamagui'
import { useDebouncedCallback } from 'use-debounce'

export type ActionVoxCardProps = {
  onShow?: () => void
  payload: {
    id?: string
    tag: string
    status?: ActionStatus
    isSubscribed: boolean
    date: VoxCardDateProps
  } & VoxCardLocationProps &
    VoxCardAuthorProps &
    VoxCardAttendeesProps
} & VoxCardFrameProps

const ActionCard = ({ payload, onShow, asFull = false, ...props }: ActionVoxCardProps & { asFull?: boolean; children?: React.ReactNode }) => {
  const isPassed = isBefore(payload.date.start, new Date())
  const isCancelled = payload.status === ActionStatus.CANCELLED
  return (
    <VoxCard {...props}>
      <VoxCard.Content>
        <VoxCard.Chip action>{capitalize(payload.tag)}</VoxCard.Chip>
        {isCancelled && (
          <InternAlert borderLess type="danger">
            Action annulée.
          </InternAlert>
        )}
        {!isCancelled && isPassed && <InternAlert borderLess>Action passée.</InternAlert>}
        <VoxCard.Location asTitle location={payload.location} />
        <VoxCard.Date {...payload.date} />
        {!asFull && payload.attendees && <VoxCard.Attendees attendees={payload.attendees} />}
        {!asFull && <VoxCard.Author author={payload.author} />}
        {!asFull && (
          <XStack justifyContent="space-between">
            <Button variant="outlined" onPress={onShow}>
              <Button.Text>Voir l'action</Button.Text>
            </Button>
            {isCancelled || isPassed ? null : <SubscribeButton isRegister={payload.isSubscribed} id={payload.id} />}
          </XStack>
        )}
        {asFull && props.children}
      </VoxCard.Content>
    </VoxCard>
  )
}

export function SubscribeButton({ isRegister, id, large }: { isRegister: boolean; id?: string; large?: boolean }) {
  const subscribe = useSubscribeAction(id)
  const unsubscribe = useUnsubscribeAction(id)
  const isloaderSub = subscribe.isPending || unsubscribe.isPending

  const handleOnSubscribe = useDebouncedCallback((isRegister: boolean) => {
    isRegister ? unsubscribe.mutate() : subscribe.mutate()
  }, 300)
  return (
    <Button
      variant={isRegister ? 'text' : 'contained'}
      borderWidth={large ? 1 : undefined}
      borderColor={large ? '$green7' : undefined}
      animation="quick"
      size={large ? 'lg' : 'md'}
      width={large ? '100%' : undefined}
      bg={isRegister ? undefined : '$green7'}
      onPress={() => handleOnSubscribe(!!isRegister)}
    >
      <Button.Text display={isloaderSub ? 'none' : 'flex'} color={isRegister ? '$green7' : undefined}>
        {isRegister ? 'Me désinscrire' : "M'inscrire"}
      </Button.Text>
      <Spinner display={isloaderSub ? 'flex' : 'none'} color={isRegister ? '$green7' : '$white1'} />
    </Button>
  )
}

export default ActionCard
