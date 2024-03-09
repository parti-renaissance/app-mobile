import VoxCard from '@/components/VoxCard/VoxCard'

export interface EventVoxCardProps {
  payload: {
    title: string,
    tag: string,
    type: 'news' | 'event' | 'riposte' | 'action',
    image?: string,
    date: Date,
    location: {
      city: string,
      postalCode: string,
      street: string,
    },
  }
}


const EventCard = ({payload}: EventVoxCardProps) => {
  const chipVariant = { [`${payload.type}`]: true }
  return (
    <VoxCard>
      {/* @ts-ignore  */}
      <VoxCard.Chip {...chipVariant}>{payload.tag}</VoxCard.Chip>
      <VoxCard.Title>{payload.title}</VoxCard.Title>
      <VoxCard.Date date={payload.date}/>
    </VoxCard>
  )
}



export default EventCard




