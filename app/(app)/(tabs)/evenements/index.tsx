import React, { useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ButtonGroup from '@/components/base/ButtonGroup/ButtonGroup'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import MyProfileCard from '@/components/ProfileCards/ProfileCard/MyProfileCard'
import ProfileLoginCTA from '@/components/ProfileCards/ProfileLoginCTA/ProfileLoginCTA'
import AuthFallbackWrapper from '@/components/Skeleton/AuthFallbackWrapper'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import * as metatags from '@/config/metatags'
import { useSession } from '@/ctx/SessionProvider'
import EventFilterForm from '@/features/events/components/EventFilterForm/EventFilterForm'
import EventFeedList from '@/features/events/pages'
import Head from 'expo-router/head'
import { getTokenValue, XStack, YStack } from 'tamagui'

const options = [{ label: 'Tous les événements', value: 'events' } as const, { label: "J'y participe", value: 'myEvents' } as const]

const EventsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'myEvents'>('events')
  const insets = useSafeAreaInsets()
  const { isAuth } = useSession()

  const scrollY = useSharedValue(0)
  const RA_headerHeight = useSharedValue(0)
  const [headerHeight, setHeaderHeight] = useState(0)
  const lastScrollValue = useSharedValue(0)
  const isScrollingDown = useSharedValue(false)
  const headerOffset = useSharedValue(0)

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const scrollDiff = scrollY.value - lastScrollValue.value

    // More responsive scroll direction detection
    if (Math.abs(scrollDiff) > 1.5) {
      const isScrollingDownNew = scrollDiff > 0

      // Only update if direction actually changed
      if (isScrollingDown.value !== isScrollingDownNew) {
        isScrollingDown.value = isScrollingDownNew

        // Reset header position when changing to scroll up
        if (!isScrollingDownNew && scrollY.value > RA_headerHeight.value) {
          headerOffset.value = -RA_headerHeight.value
        }
      }
    }
    lastScrollValue.value = scrollY.value

    // Calculate target position with momentum consideration
    const targetPosition = isScrollingDown.value ? Math.min(-Math.max(scrollY.value - RA_headerHeight.value, 0), 0) : 0

    // Smooth transition for header
    headerOffset.value = withSpring(targetPosition, {
      damping: 15,
      stiffness: 150,
      mass: 0.5,
      velocity: scrollDiff, // Add velocity for more natural feel
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    })

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      transform: [
        {
          translateY: headerOffset.value,
        },
      ],
    }
  })

  const handleListScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = e.nativeEvent.contentOffset.y
  }

  const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Snap header to closest position when scroll momentum ends
    if (headerOffset.value < -RA_headerHeight.value / 2) {
      headerOffset.value = withSpring(-RA_headerHeight.value, {
        damping: 15,
        stiffness: 150,
      })
    } else {
      headerOffset.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      })
    }
  }

  return (
    <>
      <Head>
        <title>{metatags.createTitle('Nos événements')}</title>
      </Head>

      <PageLayout>
        <PageLayout.SideBarLeft>
          <YStack gap="$medium">
            <AuthFallbackWrapper fallback={<ProfileLoginCTA />} />
            <MyProfileCard />
          </YStack>
        </PageLayout.SideBarLeft>
        <PageLayout.MainSingleColumn>
          <YStack flex={1} flexGrow={1} flexBasis={0} gap="$medium" position="relative">
            <Animated.View
              style={headerAnimatedStyle}
              onLayout={(e) => {
                RA_headerHeight.value = e.nativeEvent.layout.height
                setHeaderHeight(e.nativeEvent.layout.height)
              }}
            >
              <YStack
                bg="$textSurface"
                $gtLg={{ display: 'none' }}
                gap="$medium"
                pb="$medium"
                paddingTop={(isAuth ? insets.top : 0) + getTokenValue('$medium', 'space')}
              >
                <XStack pl="$medium" display={isAuth ? 'flex' : 'none'}>
                  {isAuth ? <ButtonGroup theme="blue" options={options} value={activeTab} onChange={(x) => setActiveTab(x ?? 'events')} /> : null}
                </XStack>
                <YStack paddingHorizontal="$medium" height={50}>
                  <EventFilterForm />
                </YStack>
              </YStack>
            </Animated.View>

            <BoundarySuspenseWrapper
              fallback={
                <YStack gap="$medium" padding="$medium" $sm={{ paddingHorizontal: 0, paddingTop: '$medium' }}>
                  <SkeCard>
                    <SkeCard.Content>
                      <SkeCard.Chip />
                      <SkeCard.Title />
                      <SkeCard.Date />
                      <SkeCard.Author />
                      <SkeCard.Author />
                      <SkeCard.Actions />
                    </SkeCard.Content>
                  </SkeCard>
                  <SkeCard>
                    <SkeCard.Content>
                      <SkeCard.Chip />
                      <SkeCard.Image />
                      <SkeCard.Title />
                      <SkeCard.Date />
                      <SkeCard.Author />
                      <SkeCard.Author />
                      <SkeCard.Actions />
                    </SkeCard.Content>
                  </SkeCard>
                  <SkeCard>
                    <SkeCard.Content>
                      <SkeCard.Chip />
                      <SkeCard.Image />
                      <SkeCard.Title />
                      <SkeCard.Date />
                      <SkeCard.Author />
                      <SkeCard.Author />
                      <SkeCard.Actions />
                    </SkeCard.Content>
                  </SkeCard>
                  <SkeCard>
                    <SkeCard.Content>
                      <SkeCard.Chip />
                      <SkeCard.Title />
                      <SkeCard.Date />
                      <SkeCard.Author />
                      <SkeCard.Author />
                      <SkeCard.Actions />
                    </SkeCard.Content>
                  </SkeCard>
                </YStack>
              }
            >
              <YStack flex={1} height="100%">
                <EventFeedList activeTab={activeTab} onScroll={handleListScroll} onMomentumScrollEnd={handleMomentumScrollEnd} paddingTop={headerHeight} />
              </YStack>
            </BoundarySuspenseWrapper>
          </YStack>
        </PageLayout.MainSingleColumn>
        <PageLayout.SideBarRight>
          <YStack gap="$medium" $lg={{ display: 'none' }}>
            {isAuth ? (
              <XStack gap="$medium">
                <ButtonGroup theme="blue" options={options} value={activeTab} onChange={(x) => setActiveTab(x ?? 'events')} />
              </XStack>
            ) : null}
            <YStack>
              <EventFilterForm />
            </YStack>
          </YStack>
        </PageLayout.SideBarRight>
      </PageLayout>
    </>
  )
}

export default EventsScreen
