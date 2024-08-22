import Text from '@/components/base/Text'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useGetDonations } from '@/services/profile/hook'
import { RestDonationsResponse } from '@/services/profile/schema'
import { getHumanFormattedDate } from '@/utils/date'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { XStack } from 'tamagui'

const isRecuDonation = (x: RestDonationsResponse[number]) => x.status === 'subscription_in_progress'
const getType = (x: RestDonationsResponse[number]) => {
  if (isRecuDonation(x)) {
    return 'Don mensuel'
  }
  return x.subscription ? 'Don' : 'Cotisation'
}

const DonationHistoryCard = () => {
  const { data } = useGetDonations()

  return data ? (
    <VoxCard>
      <VoxCard.Content>
        <Text>Historique de paiements</Text>
        <VoxCard bg="$gray1">
          <VoxCard.Content>
            {data.map((donation, index) => (
              <>
                <XStack key={index} gap="$2" flex={1}>
                  <Text fontWeight="$6">{format(donation.date, 'dd MMM yyyy', { locale: fr })}</Text>
                  <Text color="$textSecondary">
                    {getType(donation)} • {donation.type.toUpperCase()}
                  </Text>
                  <XStack flex={1} justifyContent="flex-end">
                    <Text color={donation.subscription ? '$green7' : '$blue7'}>{donation.amount}€</Text>
                  </XStack>
                </XStack>
                <VoxCard.Separator borderColor="$gray/32" />
              </>
            ))}
          </VoxCard.Content>
        </VoxCard>
      </VoxCard.Content>
    </VoxCard>
  ) : null
}

export default DonationHistoryCard
