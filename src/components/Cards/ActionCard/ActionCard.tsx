import { Button } from '@/components'
import InternAlert from '@/components/InternAlert/InternAlert'
import VoxCard, { VoxCardAttendeesProps, VoxCardAuthorProps, VoxCardDateProps, VoxCardFrameProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { useSubscribeAction, useUnsubscribeAction } from '@/services/actions/hook/useActions'
import { ActionStatus } from '@/services/actions/schema'
import { Eye, Zap, ZapOff } from '@tamagui/lucide-icons'
import { isBefore } from 'date-fns'
import { capitalize } from 'lodash'
import { Spinner, XStack } from 'tamagui'
import { useDebouncedCallback } from 'use-debounce'

export type ActionVoxCardProps = {
  onShow?: () => void
  isMyAction?: boolean
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

const ActionCard = ({ payload, onShow, asFull = false, isMyAction, ...props }: ActionVoxCardProps & { asFull?: boolean; children?: React.ReactNode }) => {
  const isPassed = isBefore(payload.date.start, new Date())
  const isCancelled = payload.status === ActionStatus.CANCELLED
  return (
    <VoxCard {...props}>
      <VoxCard.Content>
        <VoxCard.Chip theme="green">{capitalize(payload.tag)}</VoxCard.Chip>
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
            <Button variant="outlined" theme="gray" onPress={onShow}>
              <Eye size={16} />
              <Button.Text>Voir</Button.Text>
            </Button>
            {isMyAction ? null : <SubscribeButton disabled={isCancelled || isPassed} isRegister={payload.isSubscribed} id={payload.id} />}
          </XStack>
        )}
        {asFull && props.children}
      </VoxCard.Content>
    </VoxCard>
  )
}

export function SubscribeButton({ isRegister, id, large, ...props }: { isRegister: boolean; id?: string; large?: boolean; disabled?: boolean }) {
  const subscribe = useSubscribeAction(id)
  const unsubscribe = useUnsubscribeAction(id)
  const isloaderSub = subscribe.isPending || unsubscribe.isPending

  const handleOnSubscribe = useDebouncedCallback((isRegister: boolean) => {
    isRegister ? unsubscribe.mutate() : subscribe.mutate()
  }, 300)
  return (
    <Button
      disabled={props.disabled}
      variant={'outlined'}
      theme="green"
      animation="quick"
      size={large ? 'lg' : 'md'}
      width={large ? '100%' : undefined}
      onPress={() => handleOnSubscribe(isRegister)}
    >
      {!isRegister ? <Zap size={large ? 24 : 16} color={'$color5'} /> : <ZapOff size={large ? 24 : 16} color="$color5" />}
      <Button.Text display={isloaderSub ? 'none' : 'flex'}>{isRegister ? 'Me désinscrire' : "M'inscrire"}</Button.Text>
      <Spinner display={isloaderSub ? 'flex' : 'none'} color="$color5" />
    </Button>
  )
}

export default ActionCard
