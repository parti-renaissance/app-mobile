import VoxCard from '@/components/VoxCard/VoxCard'
import { RestItemEvent } from '@/services/events/schema'
import { Clock9, Users, XCircle } from '@tamagui/lucide-icons'
import { isEventCancelled, isEventCapacityReached, isEventPast } from '../utils'

export const StatusChip = ({ event }: { event: Partial<RestItemEvent> }) => {
  if (isEventCancelled(event)) {
    return (
      <VoxCard.Chip icon={XCircle} theme="red" testID="status-event-chip">
        Annulé
      </VoxCard.Chip>
    )
  }
  if (isEventPast(event)) {
    return (
      <VoxCard.Chip icon={Clock9} theme="gray" testID="status-event-chip">
        Terminé
      </VoxCard.Chip>
    )
  }

  if (isEventCapacityReached(event)) {
    return (
      <VoxCard.Chip icon={Users} theme="gray" testID="status-event-chip">
        Complet
      </VoxCard.Chip>
    )
  }
  return null
}
