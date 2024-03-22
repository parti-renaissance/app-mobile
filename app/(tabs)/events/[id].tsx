import React from 'react'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import VoxCard from '@/components/VoxCard/VoxCard'
import { RestShortEvent } from '@/data/restObjects/RestEvents'
import { mapProps, mapPropsAuthor, mapPropsDate, mapPropsLocation } from '@/helpers/eventsFeed'
import { Event, useGetEvent, useIsShortEvent } from '@/hooks/useEvents'
import i18n from '@/utils/i18n'
import { format } from 'date-fns'
import { Stack as RouterStack, useLocalSearchParams } from 'expo-router'
import { ScrollView, Separator, Stack, Text, XStack, YStack } from 'tamagui'

const HomeScreen: React.FC = () => {
  const params = useLocalSearchParams<{ id: string }>()
  return (
    <>
      <YStack flex={1}>
        <PageLayout sidebar={<Text>Test</Text>}>
          <Stack $gtSm={{ flexDirection: 'row', gap: 8 }} flex={1}>
            <Stack flex={1} $gtSm={{ flex: 10 }} gap={2}>
              <BoundarySuspenseWrapper loadingMessage="Nous chargons votre evement">
                <EventDetailScreen id={params.id} />
              </BoundarySuspenseWrapper>
            </Stack>
          </Stack>
        </PageLayout>
      </YStack>
    </>
  )
}

function EventDetailScreen(props: { id: string }) {
  const { data } = useGetEvent(props.id)
  const isShortEvent = useIsShortEvent(data)
  const location = mapPropsLocation(data)
  const author = mapPropsAuthor(data)
  const date = mapPropsDate(data)

  return (
    <Stack $gtSm={{ gap: '$8', padding: '$8', flexDirection: 'row' }}>
      <ScrollView flex={1}>
        <VoxCard overflow="hidden">
          <VoxCard.Image image="https://picsum.photos/200/300" />
          <VoxCard.Content>
            <VoxCard.Chip event>{data.category.name}</VoxCard.Chip>
            <VoxCard.Title>{data.name}</VoxCard.Title>
            {!isShortEvent && <VoxCard.Description>{data.description}</VoxCard.Description>}
          </VoxCard.Content>
        </VoxCard>
      </ScrollView>

      <VoxCard>
        <VoxCard.Content>
          <VoxCard.Date {...date} />
          {data.mode === 'online' ? <VoxCard.Visio /> : <VoxCard.Location {...location} />}
          {!isShortEvent && <VoxCard.Capacity>Capacité {data.capacity} personnes</VoxCard.Capacity>}

          <Text fontFamily="$PublicSans" textAlign="center" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$yellow9">
            Cette évènement est réservée aux adhérents à jour de cotisation.
          </Text>

          <Separator borderStyle="dashed" />

          <Stack gap="$2">
            <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$textDisabled">
              Date de publication:
            </Text>
            <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$textPrimary">
              {i18n.t('vox_card.dateCreated', { date: new Date(data.user_registered_at) })}
            </Text>
          </Stack>

          <Stack gap="$2">
            <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$textDisabled">
              Évènement créer par:
            </Text>
            <VoxCard.Author {...author} />
          </Stack>
        </VoxCard.Content>
      </VoxCard>
    </Stack>
  )
}

export default HomeScreen
