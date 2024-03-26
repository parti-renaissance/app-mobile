import React from 'react'
import { Button } from '@/components'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import VoxCard from '@/components/VoxCard/VoxCard'
import { mapPropsAuthor, mapPropsDate, mapPropsLocation } from '@/helpers/eventsFeed'
import { useGetEvent, useIsShortEvent, useSubscribeEvent, useUnsubscribeEvent } from '@/hooks/useEvents'
import i18n from '@/utils/i18n'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, Separator, Stack, Text, useMedia, YStack } from 'tamagui'
import { View } from 'react-native'
import { useDebouncedCallback } from 'use-debounce'

const MemoizedSubscribeButton = React.memo(SubscribeButton)

const HomeScreen: React.FC = () => {
  const params = useLocalSearchParams<{ id: string }>()
  return (
    <>
      <YStack flex={1}>
          <Stack $gtSm={{ flexDirection: 'row', gap: 8 }} flex={1}>
            <BoundarySuspenseWrapper loadingMessage="Nous chargons votre evement">
              <Stack flex={1} bg="purple" gap={2}>
                {/* <Stack flex={1} gap={2}> */}
                  <EventDetailScreen id={params.id} />
                {/* </Stack> */}
              </Stack>
            </BoundarySuspenseWrapper>
          </Stack>
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
    <Stack flex={1} bg="red" $gtSm={{ gap: '$8', padding: '$8', flexDirection: 'row' }}>
      <View style={{flex:1, backgroundColor: 'blue'}}>
        {/* <ScrollView flex={1}> */}
          {/* <VoxCard flexGrow={0} overflow="hidden" paddingBottom={media.sm ? '$9' : undefined}> */}
            {/* <VoxCard.Image large image={data.image_url || 'https://picsum.photos/600/400'} /> */}
            {/* <VoxCard.Content flex={1}> */}
            <View>
            <Text>test wejkhglj werjhgfwkerjhgjwehrg jwerhglkjhwerkerhglkjhwelrjhgljkwerh gjwerhjgkh werjklgh lkwjerh gjlk hwerjlkgh werlkjhg </Text>

            </View>
              {/* <VoxCard.Chip event>{data.category.name}</VoxCard.Chip> */}
              {/* <VoxCard.Title>{data.name}</VoxCard.Title> */}
              {/* {!isShortEvent && <VoxCard.Description full>{data.description}</VoxCard.Description>}
              {media.sm && AsideCardContent} */}
            {/* </VoxCard.Content> */}
          {/* </VoxCard>  */}
        {/* </ScrollView> */}
        {media.sm && (
          <Stack position="absolute" bottom="$3" left="$3" right="$3">
            <MemoizedSubscribeButton key="EventSubsBtn" eventId={data.uuid} isSubscribed={!!data.user_registered_at} />
          </Stack>
        )}
      </View>
      {media.gtSm && (
        <View style={{flex:1}}>
          {/* <VoxCard>
            <VoxCard.Content>
              {AsideCardContent}
              <MemoizedSubscribeButton key="EventSubsBtn" eventId={data.uuid} isSubscribed={!!data.user_registered_at} />
            </VoxCard.Content>
          </VoxCard> */}
        </View>
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
      <Button.Text color={isSubscribed ? '$blue7' : '$white1' }>{isSubscribed ? 'Me desinscrire' : "M'inscrire"}</Button.Text>
    </Button>
  )
}

export default HomeScreen
