import { memo, useId, useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import { Button } from '@/components'
import DialogAuth from '@/components/AuthDialog'
import Input from '@/components/base/Input/Input'
import Text from '@/components/base/Text'
import { Card as RadioCard } from '@/components/Bento/radios/components/radioParts'
import { EventCard, PartialEventCard } from '@/components/Cards/EventCard'
import EmptyEvent from '@/components/EmptyStates/EmptyEvent/EmptyEvent'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useSession } from '@/ctx/SessionProvider'
import { isFullEvent, isPartialEvent, RestEvent } from '@/data/restObjects/RestEvents'
import { mapFullProps, mapPartialProps } from '@/helpers/eventsFeed'
import { usePaginatedSearchEvents, useSuspensePaginatedEvents } from '@/hooks/useEvents'
import { ChevronDown, Search, XCircle } from '@tamagui/lucide-icons'
import { router } from 'expo-router'
import { getToken, Label, Spinner, Switch, useMedia, View, XStack, YStack } from 'tamagui'
import { useDebounce } from 'use-debounce'

const MemoizedEventCard = memo(EventCard) as typeof EventCard
const MemoizedPartialEventCard = memo(PartialEventCard) as typeof PartialEventCard

const EventListCard = memo((args: { item: RestEvent; cb: Parameters<typeof mapFullProps>[1] }) => {
  if (isFullEvent(args.item)) {
    return <MemoizedEventCard {...mapFullProps(args.item, args.cb)} />
  }
  if (isPartialEvent(args.item)) {
    return (
      <AuthFallbackWrapper
        fallback={
          <DialogAuth title="D'autres événements vous attendent, connectez-vous ou créez un compte !">
            <MemoizedPartialEventCard {...mapPartialProps(args.item, args.cb)} />
          </DialogAuth>
        }
      >
        <PartialEventCard {...mapPartialProps(args.item, args.cb)} />
      </AuthFallbackWrapper>
    )
  }
  return null
})

const EventList = () => {
  const media = useMedia()
  const { user } = useSession()

  const [_searchText, setSearchText] = useState('')
  const [searchText] = useDebounce(_searchText, 500)

  const items = [`Ma commune (${user.data?.postal_code})`, 'Toute la France'] as const
  type Item = (typeof items)[number]
  const [value, setValue] = useState<Item | string>(items[0])

  const isSearching = searchText.length > 0

  const eventSuspense = useSuspensePaginatedEvents({
    postalCode: user.data?.postal_code,
    filters: {
      finishAfter: new Date(),
    },
  })

  const events = usePaginatedSearchEvents({
    filters: {
      searchText,
    },
  })

  const { data: paginatedFeed, fetchNextPage, hasNextPage, isRefetching, refetch } = isSearching ? events : eventSuspense

  const handleSubscribe = (_: string) => {}
  const handleShow = (id: string) => {
    router.push({ pathname: '/(tabs)/evenements/[id]', params: { id } })
  }

  const callbacks = useMemo(
    () => ({
      onSubscribe: handleSubscribe,
      onShow: handleShow,
    }),
    [],
  )

  const feedData = paginatedFeed?.pages.map((page) => page.items).flat() ?? []

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <FlatList
      style={{ width: '100%' }}
      contentContainerStyle={{
        flexGrow: 1,
        gap: getToken('$4', 'space'),
        paddingTop: media.gtSm ? getToken('$7', 'space') : getToken('$4', 'space'),
        paddingLeft: media.gtSm ? getToken('$7', 'space') : undefined,
        paddingRight: media.gtSm ? getToken('$7', 'space') : undefined,
        paddingBottom: getToken('$10', 'space'),
        // height: feedData.length === 0 && !isLoading && media.sm ? '100%' : undefined,
      }}
      stickyHeaderHiddenOnScroll
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <VoxCard bg="transparent">
          <YStack gap="$5">
            <Input
              placeholder="Rechercher un événement"
              backgroundColor={'$white1'}
              size={'$5'}
              iconRight={
                _searchText.length > 0 ? (
                  <Button variant="text" onPress={() => setSearchText('')}>
                    <XCircle />
                  </Button>
                ) : (
                  <Search />
                )
              }
              loading={Boolean(isRefetching)}
              value={_searchText}
              onChangeText={setSearchText}
            />

            <YStack gap="$3">
              <Text>Zone</Text>
              <XStack flexWrap="wrap" gap="$3" rowGap="$3" flexDirection="row">
                {items.map((item) => (
                  <RadioCard
                    theme="gray"
                    key={item}
                    flexDirection="row"
                    flexBasis={200}
                    alignItems="center"
                    gap="$3"
                    padding={0}
                    minWidth="100%"
                    active={value === item}
                    paddingHorizontal="$2.5"
                    cursor="pointer"
                    onPress={() => setValue(item)}
                    $gtXs={{
                      minWidth: 'initial',
                    }}
                  >
                    <Text theme="VoxRadio" color={value === item ? '$textPrimary' : '$gray7'}>
                      {item}
                    </Text>
                  </RadioCard>
                ))}
              </XStack>
              <Input placeholder="Choisir un departement" backgroundColor={'$white1'} size={'$5'} iconRight={<ChevronDown />} />
            </YStack>

            <YStack gap="$3">
              <Text>Temporalité</Text>

              <LineSwitch>lol</LineSwitch>
            </YStack>
          </YStack>
        </VoxCard>
      }
      data={feedData}
      renderItem={({ item }) => <EventListCard item={item} cb={callbacks} />}
      ListEmptyComponent={
        <PageLayout.StateFrame>
          <EmptyEvent />
        </PageLayout.StateFrame>
      }
      keyExtractor={(item) => item.uuid}
      refreshing={isRefetching}
      onRefresh={() => refetch()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        hasNextPage ? (
          <YStack p="$3" pb="$6">
            <Spinner size="large" />
          </YStack>
        ) : null
      }
    />
  )
}

function LineSwitch(props: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false)
  const uniqueId = useId()
  return (
    <View
      flexDirection="row"
      maxWidth="100%"
      borderColor="$borderColor"
      borderWidth={1}
      paddingHorizontal="$4"
      paddingVertical="$3"
      borderRadius="$3"
      width={400}
      alignItems="center"
      gap="$2.5"
      theme="gray"
    >
      <View flexDirection="column">
        <Label size="$1.5" htmlFor={uniqueId + 'switch'}>
          {typeof props.children === 'string' ? <Text>{props.children}</Text> : props.children}
        </Label>
      </View>
      <Switch id={uniqueId + 'switch'} checked={checked} onCheckedChange={setChecked} marginLeft="auto" size={'$2'}>
        <Switch.Thumb animation="tooltip" />
      </Switch>
    </View>
  )
}
export default EventList
