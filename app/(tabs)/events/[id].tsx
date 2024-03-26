import React from 'react'
import { Dimensions } from 'react-native'
import { Button } from '@/components'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import VoxCard from '@/components/VoxCard/VoxCard'
import { mapPropsAuthor, mapPropsDate, mapPropsLocation } from '@/helpers/eventsFeed'
import { useGetEvent, useIsShortEvent, useSubscribeEvent, useUnsubscribeEvent } from '@/hooks/useEvents'
import i18n from '@/utils/i18n'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, Separator, Stack, Text, useMedia, View, XStack, YStack } from 'tamagui'
import { useDebouncedCallback } from 'use-debounce'

const MemoizedSubscribeButton = React.memo(SubscribeButton)

const padding = '$7'
const columnWidth = 333

const HomeScreen: React.FC = () => {
  const params = useLocalSearchParams<{ id: string }>()
  const media = useMedia()
  return (
    <>
      <XStack flex={1} bg="$gray2">
        {media.gtMd && (
          <View width={columnWidth} height="100%" pt={padding} pl={padding}>
            <VoxCard height={300}>
              <VoxCard.Content>
                <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$textDisabled">
                  Évènement créer par:
                </Text>
              </VoxCard.Content>
            </VoxCard>
          </View>
        )}
        <BoundarySuspenseWrapper loadingMessage="Nous chargons votre evement">
          <Stack flex={1} flexBasis={0} gap={2} $gtLg={{ pr: padding }}>
            <EventDetailScreen id={params.id} />
          </Stack>
        </BoundarySuspenseWrapper>
      </XStack>
    </>
  )
}

function EventDetailScreen(props: { id: string }) {
  const { data } = useGetEvent(props.id)
  const isShortEvent = useIsShortEvent(data)
  const location = mapPropsLocation(data)
  const author = mapPropsAuthor(data)
  const date = mapPropsDate(data)
  const media = useMedia()

  const AsideCardContent = (
    <>
      <VoxCard.Date {...date} />
      {data.mode === 'online' ? <VoxCard.Visio /> : <VoxCard.Location {...location} />}
      {!isShortEvent && <VoxCard.Capacity>Capacité {data.capacity} personnes</VoxCard.Capacity>}

      <Text fontFamily="$PublicSans" textAlign="center" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$yellow9">
        Cette évènement est réservée aux adhérents à jour de cotisation.
      </Text>

      <Separator borderStyle="dashed" />

      <Stack gap="$2">
        <Text fontFamily="$PublicSans" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$textDisabled">
          Évènement créer par:
        </Text>
        <VoxCard.Author {...author} />
      </Stack>
    </>
  )

  return (
    <Stack flex={1} $gtSm={{ flexDirection: 'row' }}>
      <Stack flex={1} flexBasis={0}>
        <ScrollView
          flex={1}
          contentContainerStyle={{
            pt: media.gtSm ? padding : undefined,
            pl: media.gtSm ? padding : undefined,
            pr: media.gtSm ? padding : undefined,
          }}
        >
          <VoxCard overflow="hidden" paddingBottom={media.gtLg ? 0 : '$10'}>
            <VoxCard.Image large image={data.image_url || 'https://picsum.photos/600/400'} />
            <VoxCard.Content>
              <VoxCard.Chip event>{data.category.name}</VoxCard.Chip>
              <VoxCard.Title>{data.name}</VoxCard.Title>
              {!isShortEvent && <VoxCard.Description full>{data.description}</VoxCard.Description>}
              {media.lg && AsideCardContent}
            </VoxCard.Content>
          </VoxCard>
        </ScrollView>
        {media.lg && (
          <Stack
            position="absolute"
            bottom="$3"
            $sm={{ left: '$3', right: '$3' }}
            $lg={{ left: '$10', right: '$10' }}
            bg="$white1"
            shadowColor="$shadow"
            shadowOffset={{ height: 0, width: 0 }}
            shadowOpacity={0.1}
            shadowRadius={4}
          >
            <MemoizedSubscribeButton key="EventSubsBtn" eventId={data.uuid} isSubscribed={!!data.user_registered_at} />
          </Stack>
        )}
      </Stack>
      {media.gtLg && (
        <Stack width={333} mt={padding}>
          <VoxCard>
            <VoxCard.Content>
              <MemoizedSubscribeButton key="EventSubsBtn" eventId={data.uuid} isSubscribed={!!data.user_registered_at} />
              {AsideCardContent}
            </VoxCard.Content>
          </VoxCard>
        </Stack>
      )}
    </Stack>
  )
}

type SubscribeButtonProps = {
  eventId: string
  isSubscribed: boolean
}

function SubscribeButton({ eventId, isSubscribed }: SubscribeButtonProps) {
  const { mutate: subscribe } = useSubscribeEvent(eventId)
  const { mutate: unsubscribe } = useUnsubscribeEvent(eventId)
  const handleSubscribe = useDebouncedCallback(() => (isSubscribed ? unsubscribe() : subscribe()), 200)
  return (
    <Button variant={isSubscribed ? 'outlined' : 'contained'} onPress={handleSubscribe} size="lg" width="100%">
      <Button.Text color={isSubscribed ? '$blue7' : '$white1'}>{isSubscribed ? 'Me desinscrire' : "M'inscrire"}</Button.Text>
    </Button>
  )
}

export default HomeScreen
