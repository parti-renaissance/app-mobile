import React, { LegacyRef, memo, RefObject } from 'react'
import { Keyboard, Platform } from 'react-native'
import { Button } from '@/components'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import { SignInButton, SignUpButton } from '@/components/Buttons/AuthButton'
import { SubscribeEventButton } from '@/components/Cards'
import EventRegisterForm from '@/components/EventRegisterForm/EventRegisterForm'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useSession } from '@/ctx/SessionProvider'
import * as eventTypes from '@/data/restObjects/RestEvents'
import { mapPropsAuthor, mapPropsDate, mapPropsLocation } from '@/helpers/eventsFeed'
import { useGetEvent } from '@/hooks/useEvents'
import useShareApi from '@/hooks/useShareApi'
import * as Calendar from '@/modules/Calendar/Calendar'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { Link as LinkIcon, Unlock } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import * as Clipboard from 'expo-clipboard'
import { Stack as RouterStack, useLocalSearchParams, usePathname } from 'expo-router'
import { ScrollView, Sheet, Text, useMedia, XStack, YStack } from 'tamagui'

const padding = '$7'

const HomeScreen: React.FC = () => {
  const params = useLocalSearchParams<{ id: string }>()
  return (
    <PageLayout>
      <PageLayout.SideBarLeft />
      <BoundarySuspenseWrapper loadingMessage="Nous chargeons votre fil">
        <EventDetailScreen id={params.id} />
      </BoundarySuspenseWrapper>
    </PageLayout>
  )
}

const RegisterButtonSheet = memo(() => {
  const [open, setOpen] = React.useState(false)
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      Keyboard.dismiss()
    }
    setOpen(nextOpen)
  }

  const scrollRef = React.useRef<ScrollView>(null)

  return (
    <>
      <Button
        variant="contained"
        size="lg"
        onPress={() => {
          setOpen(true)
        }}
        width="100%"
      >
        <Button.Text>M'inscrire</Button.Text>
      </Button>
      <Sheet modal dismissOnSnapToBottom dismissOnOverlayPress moveOnKeyboardChange open={open} onOpenChange={handleOpenChange} snapPoints={[80]}>
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" elevation="$1">
          {/* @ts-ignore **/}
          <Sheet.ScrollView ref={scrollRef} alignItems="center">
            <XStack maxWidth={600} alignItems="center">
              <EventRegisterForm
                onScrollTo={(a) => {
                  scrollRef.current?.scrollTo({
                    x: 0,
                    y: a.y - 200,
                  })
                }}
              />
            </XStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  )
})

const LockLeftCard = () => (
  <YStack justifyContent="center" gap="$4.5">
    <YStack gap="$3" alignItems="center">
      <Unlock size="$3" rotate="-15deg" color="$textSecondary" />
      <Text fontWeight="$6" fontSize="$1" color="$textSecondary">
        Connectez-vous pour participer à cet événement
      </Text>
    </YStack>
    <SignUpButton size="lg" width="100%" />
    <SignInButton size="lg" width="100%" />
  </YStack>
)

function EventDetailScreen(props: Readonly<{ id: string }>) {
  const { data } = useGetEvent({ id: props.id })
  const isFullEvent = eventTypes.isFullEvent(data)
  const isShortEvent = eventTypes.isShortEvent(data)
  const toast = useToastController()
  const date = mapPropsDate(data)
  const media = useMedia()
  const { isAuth, signIn } = useSession()

  const shareUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/events/${props.id}`

  const { shareAsync, isShareAvailable } = useShareApi()

  const handleCopyUrl = () => {
    Clipboard.setStringAsync(shareUrl)
      .then(() => {
        toast.show('Lien copié', { type: 'info' })
      })
      .catch(() => {
        toast.show('Erreur lors de la copie du lien', { type: 'error' })
      })
  }

  const handleShareUrl = () => {
    shareAsync(
      Platform.select({
        android: {
          title: data.name,
          message: (!isShortEvent && isFullEvent ? `${data.description}\n\n${shareUrl}` : undefined) ?? shareUrl,
        },
        ios: {
          message: data.name,
          url: shareUrl,
        },
        web: {
          title: data.name,
          message: !isShortEvent && isFullEvent ? data.description : data.name,
          url: shareUrl,
        },
      }),
    ).catch((e) => {
      ErrorMonitor.log(e.message, { e })
      toast.show('Erreur lors du partage du lien', { type: 'error' })
    })
  }

  const eventData = isFullEvent
    ? {
        title: data.name,
        startDate: new Date(data.begin_at).toISOString(),
        endDate: new Date(data.finish_at).toISOString(),
        location: data.mode === 'online' ? 'En ligne' : `${data.post_address.address}, ${data.post_address.city_name} ${data.post_address.postal_code}`,
        notes: !isShortEvent && isFullEvent ? (data.description + data.visio_url ? `\n\nLien: ${data.visio_url}` : '') : '',
        url: shareUrl,
      }
    : undefined

  const addToCalendar = eventData ? Calendar.useCreateEvent(eventData) : undefined

  const AsideCardContent = () => (
    <>
      <VoxCard.Date {...date} />
      {isFullEvent && (data.mode === 'online' ? <VoxCard.Visio /> : <VoxCard.Location {...mapPropsLocation(data)} />)}
      {!isShortEvent && data.capacity && <VoxCard.Capacity>Capacité {data.capacity} personnes</VoxCard.Capacity>}
      {!isShortEvent && <VoxCard.Attendees attendees={{ count: data.participants_count }} />}

      {/* <Text fontFamily="$PublicSans" textAlign="center" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$yellow9">
        Cet événement est réservé aux adhérents à jour de cotisation.
      </Text> */}

      {isFullEvent && (
        <VoxCard.Section title="Événement créé par :">
          <VoxCard.Author {...mapPropsAuthor(data)} />
        </VoxCard.Section>
      )}
    </>
  )

  const AsideShare = () => (
    <VoxCard.Section title="Partager :" gap="$3">
      <Button variant="outlined" width="100%" onPress={handleCopyUrl}>
        <Button.Text variant="outlined" color="$purple6" fontWeight="$4" numberOfLines={1} flex={1}>
          {shareUrl}
        </Button.Text>
        <LinkIcon color="$textDisabled" />
      </Button>

      {isShareAvailable && (
        <Button variant="outlined" width="100%" size="lg" onPress={handleShareUrl}>
          <Button.Text variant="outlined">Partager</Button.Text>
        </Button>
      )}

      {!isShortEvent && isFullEvent && (
        <>
          <VoxCard.Separator />
          <Button variant="outlined" width="100%" size="lg" onPress={addToCalendar}>
            <Button.Text variant="outlined">Ajouter à mon calendrier</Button.Text>
          </Button>
        </>
      )}
    </VoxCard.Section>
  )

  return (
    <>
      <RouterStack.Screen
        options={{
          title: data.name,
        }}
      />
      <PageLayout.MainSingleColumn>
        <ScrollView
          flex={1}
          contentContainerStyle={{
            pt: media.gtSm ? padding : undefined,
            pl: media.gtSm ? padding : undefined,
            pr: media.gtSm ? padding : undefined,
          }}
        >
          <VoxCard overflow="hidden" paddingBottom={media.gtLg ? 0 : '$10'}>
            {data.image_url && <VoxCard.Image large image={data.image_url} />}
            <VoxCard.Content>
              {data.category && <VoxCard.Chip event>{data.category.name}</VoxCard.Chip>}
              <VoxCard.Title>{data.name}</VoxCard.Title>
              {!isShortEvent && isFullEvent && (
                <VoxCard.Description full markdown>
                  {data.description}
                </VoxCard.Description>
              )}
              {media.lg ||
                (!isAuth && data.visibility === 'public' && (
                  <>
                    <AsideCardContent />
                    <AsideShare />
                  </>
                ))}
            </VoxCard.Content>
          </VoxCard>
        </ScrollView>
        {media.lg && isFullEvent && (
          <YStack position="absolute" bg="$white1" bottom={0} left="$0" width="100%" elevation="$1" p="$3">
            <AuthFallbackWrapper
              fallback={
                data.visibility !== 'public' ? (
                  <LockLeftCard />
                ) : (
                  <YStack gap="$3" width="100%">
                    <RegisterButtonSheet />
                    <Button variant="text" size="lg" width="100%" onPress={signIn}>
                      <Text fontSize="$1">
                        <Text color="$textPrimary" fontWeight="$7">
                          Me connecter
                        </Text>{' '}
                        <Text color="$textSecondary">pour m’inscrire en un clic.</Text>
                      </Text>
                    </Button>
                  </YStack>
                )
              }
            >
              <SubscribeEventButton key="EventSubsBtn" outside eventId={data.uuid} isSubscribed={!!data.user_registered_at} />
            </AuthFallbackWrapper>
          </YStack>
        )}
      </PageLayout.MainSingleColumn>

      <PageLayout.SideBarRight>
        <ScrollView>
          <YStack gap="$6">
            <VoxCard>
              <VoxCard.Content pt="$6">
                <AuthFallbackWrapper
                  fallback={
                    <>
                      {data.visibility !== 'public' ? (
                        <>
                          <LockLeftCard />
                          <AsideShare />
                        </>
                      ) : (
                        <EventRegisterForm />
                      )}
                    </>
                  }
                >
                  <AsideCardContent />
                  <AsideShare />
                  {isFullEvent && <SubscribeEventButton key="EventSubsBtn" outside eventId={data.uuid} isSubscribed={!!data.user_registered_at} />}
                </AuthFallbackWrapper>
              </VoxCard.Content>
            </VoxCard>
          </YStack>
        </ScrollView>
      </PageLayout.SideBarRight>
    </>
  )
}

export default HomeScreen
