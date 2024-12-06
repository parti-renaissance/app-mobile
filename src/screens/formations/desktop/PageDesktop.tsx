import { ComponentRef, Fragment, RefObject, useMemo, useRef, useState } from 'react'
import { LayoutChangeEvent, LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { usePageLayoutScroll } from '@/components/layouts/PageLayout/usePageLayoutScroll'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import VoxCard from '@/components/VoxCard/VoxCard'
import { items } from '@/screens/formations/bread-crumbs-items'
import { FormationScreenProps } from '@/screens/formations/types'
import { useGetFormations } from '@/services/formations/hook'
import { useGetMagicLink } from '@/services/magic-link/hook'
import { useGetSuspenseProfil } from '@/services/profile/hook'
import { Href, Link } from 'expo-router'
import { getTokenValue, isWeb, ScrollView, YStack } from 'tamagui'
import { FormationDenyCard } from '../components/DenyCard'
import FormationDesktopLayout from './ FormationDesktopLayout'
import FormationSection, { FormationSectionSkeleton } from './FormationSection'

const FormationDesktopScreenAllow: FormationScreenProps = ({ topVisual }) => {
  const { data } = useGetFormations()
  const scrollViewContainerStyle = useMemo(
    () => ({
      pt: 166,
      pl: '$medium',
      pr: '$medium',
      paddingBottom: getTokenValue('$xxlarge', 'space') + 166,
    }),
    [],
  )
  const formationsNational = data.filter((formation) => formation.visibility === 'national')
  const formationsLocal = data.filter((formation) => formation.visibility === 'local')
  const firstSection = formationsLocal.length > 0 ? 'local' : 'national'
  const navItems = firstSection === 'local' ? items.slice().reverse() : items
  const [selected, setSelected] = useState<'local' | 'national'>('national')

  const nationalLayout = useRef<LayoutRectangle | null>(null)
  const localLayout = useRef<LayoutRectangle | null>(null)
  const isScrolling = useRef(false)

  type TamRef = ComponentRef<typeof ScrollView>

  const scrollRef = useRef<ComponentRef<typeof ScrollView> | null>(null)
  const scrollToSection = (x: 'national' | 'local') => {
    if (x === 'national' && nationalLayout.current) {
      ;(scrollRef?.current as TamRef | null)?.scrollTo({ y: nationalLayout.current.y - 140, animated: true })
    }
    if (x === 'local' && localLayout.current) {
      ;(scrollRef?.current as TamRef | null)?.scrollTo({ y: localLayout.current.y - 140, animated: true })
    }
  }

  const handleLayout =
    (filter: 'national' | 'local') =>
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      if (typeof layout.y !== 'number') return
      if (filter === 'national') {
        nationalLayout.current = layout
      }
      if (filter === 'local') {
        localLayout.current = layout
      }
    }

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let timeout: NodeJS.Timeout | null = null
    if (timeout) {
      clearTimeout(timeout)
    }
    isScrolling.current = true
    timeout = setTimeout(() => {
      isScrolling.current = false
    }, 500)
    if (scrollRef?.current) {
      if (nationalLayout.current && localLayout.current) {
        const nationalY = nationalLayout.current.y
        const localY = localLayout.current.y
        const firstSectionY = firstSection === 'local' ? localY : nationalY
        const secondSectionY = firstSection === 'local' ? nationalY : localY
        const contentOffsetY = e.nativeEvent.contentOffset.y + 300
        if (contentOffsetY > firstSectionY && contentOffsetY < secondSectionY) {
          setSelected(firstSection)
        } else if (contentOffsetY > secondSectionY) {
          setSelected(firstSection === 'local' ? 'national' : 'local')
        }
      }
    }
  }

  const { isWebPageLayoutScrollActive } = usePageLayoutScroll({
    onScroll: handleScroll,
    scrollEventThrottle: 32,
    ref: scrollRef as RefObject<HTMLDivElement>,
  })

  return (
    <FormationDesktopLayout topVisual={topVisual} leftComponent={<BreadCrumb items={navItems} vertical onChange={scrollToSection} value={selected} />}>
      <ScrollView
        ref={!isWebPageLayoutScrollActive ? scrollRef : undefined}
        scrollEnabled={!isWebPageLayoutScrollActive}
        scrollEventThrottle={32}
        onScroll={handleScroll}
        flex={1}
        contentContainerStyle={scrollViewContainerStyle}
      >
        <YStack gap="$medium" flexDirection={firstSection === 'local' ? 'column-reverse' : 'column'}>
          <FormationSection onLayout={handleLayout('national')} data={formationsNational} visibility="national" theme="blue" />
          <FormationSection onLayout={handleLayout('local')} data={formationsLocal} visibility="local" theme="green" />
        </YStack>
      </ScrollView>
    </FormationDesktopLayout>
  )
}

export const FormationDesktopScreenDeny: FormationScreenProps = ({ topVisual }) => {
  const { data: adhesionLink, isPending } = useGetMagicLink({ slug: 'adhesion' })
  const MaybeLink = ({ children }: { children: React.ReactNode }) => {
    if (adhesionLink?.url && !isPending) {
      return (
        <Link href={adhesionLink.url as Href<string>} asChild={!isWeb} target="_blank">
          {children}
        </Link>
      )
    }
    return <Fragment>{children}</Fragment>
  }
  return (
    <FormationDesktopLayout topVisual={topVisual} leftComponent={null}>
      <YStack gap="$medium" padding="$medium" pt={topVisual / 2} justifyContent="center" alignItems="center">
        <VoxCard maxWidth={660} flex={1} width="100%">
          <FormationDenyCard topVisual={topVisual} />
        </VoxCard>
      </YStack>
    </FormationDesktopLayout>
  )
}

export const FormationDesktopScreenSkeleton: FormationScreenProps = ({ topVisual }) => {
  const scrollViewContainerStyle = useMemo(
    () => ({
      pt: 166,
      pl: '$medium',
      pr: '$medium',
      paddingBottom: getTokenValue('$xxlarge', 'space') + 166,
    }),
    [],
  )
  return (
    <FormationDesktopLayout
      topVisual={topVisual}
      leftComponent={
        <SkeCard>
          <SkeCard.Description />
        </SkeCard>
      }
    >
      <ScrollView contentContainerStyle={scrollViewContainerStyle}>
        <YStack gap="$medium">
          <FormationSectionSkeleton />
          <FormationSectionSkeleton />
        </YStack>
      </ScrollView>
    </FormationDesktopLayout>
  )
}

const FormationDesktopScreen: FormationScreenProps = (props) => {
  const { data } = useGetSuspenseProfil()
  return data?.tags?.find((tag) => tag.code.startsWith('adherent:')) ? <FormationDesktopScreenAllow {...props} /> : <FormationDesktopScreenDeny {...props} />
}

const Screen: FormationScreenProps = (props) => {
  return (
    <BoundarySuspenseWrapper fallback={<FormationDesktopScreenSkeleton {...props} />}>
      <FormationDesktopScreen {...props} />
    </BoundarySuspenseWrapper>
  )
}

export default Screen
