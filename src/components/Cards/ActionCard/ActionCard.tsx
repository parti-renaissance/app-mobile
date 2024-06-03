import { Button } from '@/components'
import VoxCard, { VoxCardAttendeesProps, VoxCardAuthorProps, VoxCardDateProps, VoxCardFrameProps, VoxCardLocationProps } from '@/components/VoxCard/VoxCard'
import { capitalize } from 'lodash'
import { XStack } from 'tamagui'

export type ActionVoxCardProps = {
  onSubscribe?: () => void
  onShow?: () => void
  payload: {
    tag: string
    isSubscribed: boolean
    date: VoxCardDateProps
  } & VoxCardLocationProps &
    VoxCardAuthorProps &
    VoxCardAttendeesProps
} & VoxCardFrameProps

const ActionCard = ({ payload, onSubscribe, onShow, asFull = false, ...props }: ActionVoxCardProps & { asFull?: boolean; children?: React.ReactNode }) => {
  return (
    <VoxCard {...props}>
      <VoxCard.Content>
        <VoxCard.Chip action>{capitalize(payload.tag)}</VoxCard.Chip>
        <VoxCard.Location asTitle location={payload.location} />
        <VoxCard.Date {...payload.date} />
        {!asFull && <VoxCard.Attendees attendees={payload.attendees} />}
        {!asFull && <VoxCard.Author author={payload.author} />}
        {!asFull && (
          <XStack justifyContent="space-between">
            <Button variant="outlined" onPress={onShow}>
              <Button.Text>Voir l'action</Button.Text>
            </Button>
            {payload.isSubscribed ? (
              <Button variant="text" onPress={onSubscribe}>
                <Button.Text color="$green8">J'y participe</Button.Text>
              </Button>
            ) : (
              <Button variant="contained" onPress={onSubscribe}>
                <Button.Text fontFamily="$PublicSans">Je participe</Button.Text>
              </Button>
            )}
          </XStack>
        )}
        {asFull && props.children}
      </VoxCard.Content>
    </VoxCard>
  )
}

export default ActionCard
