import React, { memo } from 'react'
import { Keyboard, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import { SignInButton, SignUpButton } from '@/components/Buttons/AuthButton'
import { SubscribeEventButton } from '@/components/Cards'
import EventRegisterForm from '@/components/EventRegisterForm/EventRegisterForm'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AppDownloadCTA from '@/components/ProfileCards/AppDownloadCTA/AppDownloadCTA'
import ProcurationCTA from '@/components/ProfileCards/ProcurationCTA/ProcurationCTA'
import ProfileLoginCTA from '@/components/ProfileCards/ProfileLoginCTA/ProfileLoginCTA'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import VoxCard from '@/components/VoxCard/VoxCard'
import * as metatags from '@/config/metatags'
import { useSession } from '@/ctx/SessionProvider'
import * as eventTypes from '@/data/restObjects/RestEvents'
import { mapPropsAuthor, mapPropsDate, mapPropsLocation } from '@/helpers/eventsFeed'
import { useGetEvent } from '@/hooks/useEvents'
import useShareApi from '@/hooks/useShareApi'
import useCreateEvent from '@/modules/Calendar/Calendar'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { Link as LinkIcon, Unlock } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import * as Clipboard from 'expo-clipboard'
import { Stack as RouterStack, useLocalSearchParams } from 'expo-router'
import Head from 'expo-router/head'
import { ScrollView, ScrollViewProps, Sheet, Text, useMedia, XStack, YStack } from 'tamagui'
import clientEnv from '@/config/clientEnv'

const RegisterButtonSheet = memo(_RegisterButtonSheet)

const padding = '$7'

const HomeScreen: React.FC = () => {
  const params = useLocalSearchParams<{ id: string }>()
  return (
    <PageLayout>
      <PageLayout.SideBarLeft>
        <YStack gap="$3">
          <AuthFallbackWrapper fallback={<ProfileLoginCTA />} />
          <ProcurationCTA />
          <AuthFallbackWrapper>
            <AppDownloadCTA />
          </AuthFallbackWrapper>
        </YStack>
      </PageLayout.SideBarLeft>
      <BoundarySuspenseWrapper>
        <EventDetailScreen id={params.id} />
      </BoundarySuspenseWrapper>
    </PageLayout>
  )
}

function EventDetailScreen(props: Readonly<{ id: string }>) {
  const { data } = useGetEvent({ id: props.id })
  const isFullEvent = eventTypes.isFullEvent(data)
  const media = useMedia()
  const { isAuth, signIn } = useSession()

  return (
    <>
      <RouterStack.Screen
        options={{
          title: data.name,
        }}
      />
      <Head>
        <title>{metatags.createTitle(data.name)}</title>
      </Head>
      {media.lg ? (
        <PageLayout.MainSingleColumn>
          <ScrollStack>
            <VoxCard overflow="hidden" paddingBottom={media.gtLg ? 0 : '$10'}>
              {!!data.image_url && <VoxCard.Image large image={data.image_url} />}
              <VoxCard.Content>
                {data.category && <VoxCard.Chip event>{data.category.name}</VoxCard.Chip>}
                <VoxCard.Title>{data.name}</VoxCard.Title>
                {isFullEvent && (
                  <VoxCard.Description full markdown>
                    {data.description}
                  </VoxCard.Description>
                )}
                <AsideCardContent data={data} />
                <AsideShare data={data} id={props.id} />
              </VoxCard.Content>
            </VoxCard>
          </ScrollStack>
          <SafeAreaView edges={['bottom']}>
            <YStack position="absolute" bg="$white1" bottom={0} left="$0" width="100%" elevation="$1" p="$3">
              <AuthFallbackWrapper
                fallback={
                  data.visibility !== 'public' ? (
                    <LockLeftCard />
                  ) : (
                    <YStack gap="$3" width="100%">
                      <RegisterButtonSheet id={props.id} />
                      <Button variant="text" size="lg" width="100%" onPress={() => signIn()}>
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
                {isFullEvent && <SubscribeEventButton key="EventSubsBtn" outside eventId={data.uuid} isSubscribed={!!data.user_registered_at} />}
              </AuthFallbackWrapper>
            </YStack>
          </SafeAreaView>
        </PageLayout.MainSingleColumn>
      ) : (
        <>
          <PageLayout.MainSingleColumn>
            <ScrollStack>
              <VoxCard overflow="hidden" paddingBottom={media.gtLg ? 0 : '$10'}>
                {!!data.image_url && <VoxCard.Image large image={data.image_url} />}
                <VoxCard.Content>
                  {data.category && <VoxCard.Chip event>{data.category.name}</VoxCard.Chip>}
                  <VoxCard.Title>{data.name}</VoxCard.Title>
                  {isFullEvent && (
                    <VoxCard.Description full markdown>
                      {data.description}
                    </VoxCard.Description>
                  )}
                  {!isAuth && data.visibility === 'public' && (
                    <>
                      <AsideCardContent data={data} />
                      <AsideShare data={data} id={props.id} />
                    </>
                  )}
                </VoxCard.Content>
              </VoxCard>
            </ScrollStack>
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
                              <AsideShare data={data} id={props.id} />
                            </>
                          ) : (
                            <EventRegisterForm eventId={props.id} />
                          )}
                        </>
                      }
                    >
                      <AsideCardContent data={data} />
                      <AsideShare data={data} id={props.id} />
                      {isFullEvent && <SubscribeEventButton key="EventSubsBtn" outside eventId={data.uuid} isSubscribed={!!data.user_registered_at} />}
                    </AuthFallbackWrapper>
                  </VoxCard.Content>
                </VoxCard>
              </YStack>
            </ScrollView>
          </PageLayout.SideBarRight>
        </>
      )}
    </>
  )
}

function useHandleCopyUrl() {
  const toast = useToastController()
  return (shareUrl: string) =>
    Clipboard.setStringAsync(shareUrl)
      .then(() => {
        toast.show('Lien copié', { type: 'info' })
      })
      .catch(() => {
        toast.show('Erreur lors de la copie du lien', { type: 'error' })
      })
}

function LockLeftCard() {
  return (
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
}

function ScrollStack({ children }: ScrollViewProps) {
  const media = useMedia()

  return (
    <PageLayout.MainSingleColumn>
      <ScrollView
        flex={1}
        contentContainerStyle={{
          pt: media.gtSm ? padding : undefined,
          pl: media.gtSm ? padding : undefined,
          pr: media.gtSm ? padding : undefined,
          pb: '$10',
        }}
      >
        {children}
      </ScrollView>
    </PageLayout.MainSingleColumn>
  )
}

function AsideCardContent({ data }: Readonly<{ data: eventTypes.RestDetailedEvent }>) {
  const isFullEvent = eventTypes.isFullEvent(data)
  const isShortEvent = eventTypes.isShortEvent(data)
  const date = mapPropsDate(data)
  return (
    <>
      <VoxCard.Date {...date} />
      {isFullEvent && (data.mode === 'online' ? <VoxCard.Visio /> : <VoxCard.Location {...mapPropsLocation(data)} />)}
      {!isShortEvent && !!data.capacity && <VoxCard.Capacity>Capacité {data.capacity} personnes</VoxCard.Capacity>}
      {!isShortEvent && <VoxCard.Attendees attendees={{ count: data.participants_count || 0 }} />}

      {data.visibility === 'adherent_dues' && (
        <Text fontFamily="$PublicSans" textAlign="center" fontWeight="$5" lineHeight="$2" fontSize="$1" color="$yellow9">
          Cet événement est réservé aux adhérents à jour de cotisation.
        </Text>
      )}

      {isFullEvent && (
        <VoxCard.Section title="Événement créé par :">
          <VoxCard.Author {...mapPropsAuthor(data)} />
        </VoxCard.Section>
      )}
    </>
  )
}

function AsideShare({ data, id }: Readonly<{ data: eventTypes.RestDetailedEvent; id: string }>) {
  const isFullEvent = eventTypes.isFullEvent(data)
  const isShortEvent = eventTypes.isShortEvent(data)
  const handleCopyUrl = useHandleCopyUrl()
  const toast = useToastController()



  const shareUrl = `https://${clientEnv.ASSOCIATED_DOMAIN}/evenements/${id}`

  const { shareAsync, isShareAvailable } = useShareApi()

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
        default: {
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

  const createEventData = (data: eventTypes.RestFullDetailedEvent) => {
    return {
      title: data.name,
      startDate: new Date(data.begin_at).toISOString(),
      endDate: new Date(data.finish_at).toISOString(),
      location:
        data.mode !== 'online' && data.post_address
          ? `${data.post_address.address}, ${data.post_address.city_name} ${data.post_address.postal_code}`
          : 'En ligne',
      notes: data.visio_url ? `${data.description}\n\nLien: ${data.visio_url}` : data.description,
      url: shareUrl,
      timeZone: data.time_zone,
    }
  }

  const addToCalendar = useCreateEvent()
  return (
    <VoxCard.Section title="Partager :" gap="$3">
      <Button variant="outlined" width="100%" onPress={() => handleCopyUrl(shareUrl)}>
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

      {isFullEvent && (
        <>
          <VoxCard.Separator />
          <Button variant="outlined" width="100%" size="lg" onPress={() => addToCalendar(createEventData(data))}>
            <Button.Text variant="outlined">Ajouter à mon calendrier</Button.Text>
          </Button>
        </>
      )}
    </VoxCard.Section>
  )
}

function _RegisterButtonSheet(props: { id: string }) {
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
          {/* @ts-ignore */}
          <Sheet.ScrollView ref={scrollRef} contentContainerStyle={{ alignItems: 'center' }}>
            <XStack maxWidth={600} alignItems="center">
              <EventRegisterForm
                eventId={props.id}
                onScrollTo={(a) => {
                  scrollRef.current?.scrollTo({ x: 0, y: a.y - 200 })
                }}
              />
            </XStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}

export default HomeScreen
