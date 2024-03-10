import VoxCard, { VoxCardAuthorProps, VoxCardDateProps, VoxCardLocationProps, VoxCardAttendeesProps } from '@/components/VoxCard/VoxCard'
import { XStack, Button, Text } from 'tamagui'

export interface ActionVoxCardProps {
  onSubscribe?: () => void,
  onShowAction?: () => void,
  payload: {
    tag: string,
    isSubscribed: boolean,
  } & VoxCardDateProps & VoxCardLocationProps & VoxCardAuthorProps & VoxCardAttendeesProps
}


const ActionCard = ({ payload, onSubscribe, onShowAction }: ActionVoxCardProps) => {
  return (
    <VoxCard>
      <VoxCard.Chip action>{payload.tag}</VoxCard.Chip>
      <VoxCard.Location location={payload.location} />
      <VoxCard.Date date={payload.date} />
      <VoxCard.Attendees attendees={payload.attendees} />
      <VoxCard.Author author={payload.author} />
      <XStack justifyContent="space-between">
        <Button size="$2.5" backgroundColor="$white1" borderWidth="$1" paddingHorizontal="$4" borderColor="$gray3" onPress={onShowAction}>
          <Text fontFamily="$PublicSans" fontWeight="$6" color="$gray8">Voir l'action</Text>
        </Button>
        {payload.isSubscribed ? (
          <Button size="$2.5" chromeless paddingHorizontal="$4" onPress={onSubscribe}>
            <Text fontFamily="$PublicSans" fontWeight="$6" color="$green8">J'y participe</Text>
          </Button>

        ) : (
          <Button size="$2.5" backgroundColor="$gray8" paddingHorizontal="$4" onPress={onSubscribe}>
            <Text fontFamily="$PublicSans" fontWeight="$6" color="$white1">Je participe</Text>
          </Button>
        )}
      </XStack>
    </VoxCard>
  )
}



export default ActionCard




