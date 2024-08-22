import type { RestDetailedProfileResponse } from '@/services/profile/schema'
import { isBefore, isPast, subHours, subYears } from 'date-fns'
import ImpossibleMembershipCard from './ImpossibleMembershipCard'
import JoinMembershipCard from './JoinMembershipCard'
import RenewMembershipCard from './RenewMembershipCard'
import ValidMembershipCard from './ValidMembershipCard'

type MembershipCardProps = Pick<RestDetailedProfileResponse, 'last_membership_donation' | 'other_party_membership'>

const cardsByStatus = {
  valid: ValidMembershipCard,
  impossible: ImpossibleMembershipCard,
  renew: RenewMembershipCard,
  join: JoinMembershipCard,
} as const

type CardStatus = keyof typeof cardsByStatus

const getCardByStatus = (status: CardStatus) => cardsByStatus[status]

const getMembershipCardStatus = (x: MembershipCardProps): CardStatus => {
  if (x.last_membership_donation) {
    const isExpired = isBefore(x.last_membership_donation, subYears(new Date(), 1))
    return isExpired ? 'renew' : 'valid'
  }

  if (x.other_party_membership) {
    return 'impossible'
  }

  return 'join'
}

const MembershipCard = (props: MembershipCardProps) => {
  const status = getMembershipCardStatus(props)
  const Card = getCardByStatus(status)

  return <Card {...props} />
}

export default MembershipCard
