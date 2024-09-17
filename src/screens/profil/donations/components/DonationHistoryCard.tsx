import { Fragment } from 'react'
import Text from '@/components/base/Text'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useGetDonations } from '@/services/profile/hook'
import { RestDonationsResponse } from '@/services/profile/schema'
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
        <Text.LG>Historique de paiements</Text.LG>
        <VoxCard bg="$gray0" inside>
          <VoxCard.Content>
            {data.map((donation) => (
              <Fragment key={donation.uuid}>
                <XStack gap="$2" flex={1}>
                  <Text.SM semibold>{format(donation.date, 'dd MMM yyyy', { locale: fr })}</Text.SM>
                  <Text.SM secondary>
                    {getType(donation)} • {donation.type.toUpperCase()}
                  </Text.SM>
                  <XStack flex={1} justifyContent="flex-end">
                    <Text.SM primary={false} theme={donation.subscription ? 'green' : 'blue'}>
                      {donation.amount}€
                    </Text.SM>
                  </XStack>
                </XStack>
                <VoxCard.Separator borderColor="$gray/32" />
              </Fragment>
            ))}
          </VoxCard.Content>
        </VoxCard>
      </VoxCard.Content>
    </VoxCard>
  ) : null
}

export default DonationHistoryCard
