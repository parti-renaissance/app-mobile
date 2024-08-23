import { useGetDonations } from '@/services/profile/hook'
import FirstDonationCard from './FirstDonationCard'
import SubscribeDonationCard from './SubscribeDonationCard'

const DonationCard = () => {
  const { data } = useGetDonations()
  const hasSubscriptions = data?.find((x) => x.status !== 'subscription_in_progress')
  return hasSubscriptions ? <SubscribeDonationCard subscription={hasSubscriptions} /> : <FirstDonationCard />
}

export default DonationCard
