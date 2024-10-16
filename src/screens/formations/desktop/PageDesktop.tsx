import { ComponentRef, useMemo, useRef, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import { items } from '@/screens/formations/bread-crumbs-items'
import { FormationScreenProps } from '@/screens/formations/types'
import { useGetFormations } from '@/services/formations/hook'
import { isWeb, ScrollView, useMedia, YStack } from 'tamagui'
import FormationDesktopLayout from './ FormationDesktopLayout'
import FormationSection, { FormationSectionSkeleton } from './FormationSection'

const scrollViewContainerStyle = {
  pt: 166,
  pl: '$5',
  pr: '$5',
  pb: isWeb ? '$10' : '$12',
} as const

const FormationDesktopScreen: FormationScreenProps = ({ topVisual }) => {
  const { data } = useGetFormations()
  const media = useMedia()
  const formationsNational = data.filter((formation) => formation.visibility === 'national')
  const formationsLocal = data.filter((formation) => formation.visibility === 'local')
  const firstSection = formationsLocal.length > 0 ? 'local' : 'national'
  const navItems = firstSection === 'local' ? items.slice().reverse() : items
  const [selected, setSelected] = useState<'local' | 'national'>('national')

  const nationalLayout = useRef<LayoutChangeEvent | null>(null)
  const localLayout = useRef<LayoutChangeEvent | null>(null)
  const isScrolling = useRef(false)

  const scrollRef = useRef<ComponentRef<typeof ScrollView> | null>(null)
  const scrollToSection = (x: 'national' | 'local') => {
    if (x === 'national' && nationalLayout.current) {
      scrollRef?.current?.scrollTo({ y: nationalLayout.current.nativeEvent.layout.y - 140 })
    } else if (x === 'local' && localLayout.current) {
      scrollRef?.current?.scrollTo({ y: localLayout.current.nativeEvent.layout.y - 140 })
    }
  }

  const handleLayout = (filter: 'national' | 'local') => (layout: LayoutChangeEvent) => {
    if (filter === 'national') {
      nationalLayout.current = layout
    } else {
      localLayout.current = layout
    }
  }

  return (
    <FormationDesktopLayout topVisual={topVisual} leftComponent={<BreadCrumb items={navItems} vertical onChange={scrollToSection} value={selected} />}>
      <ScrollView
        ref={scrollRef}
        scrollEventThrottle={32}
        onScroll={(e) => {
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
              const nationalY = nationalLayout.current.nativeEvent.layout.y
              const localY = localLayout.current.nativeEvent.layout.y

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
        }}
        contentContainerStyle={scrollViewContainerStyle}
      >
        <YStack gap={16} flexDirection={firstSection === 'local' ? 'column-reverse' : 'column'}>
          <FormationSection onLayout={handleLayout('national')} data={formationsNational} visibility="national" theme="blue" />
          <FormationSection onLayout={handleLayout('local')} data={formationsLocal} visibility="local" theme="green" />
        </YStack>
      </ScrollView>
    </FormationDesktopLayout>
  )
}

export const FormationDesktopScreenSkeleton: FormationScreenProps = ({ topVisual }) => {
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
        <YStack gap={16}>
          <FormationSectionSkeleton />
          <FormationSectionSkeleton />
        </YStack>
      </ScrollView>
    </FormationDesktopLayout>
  )
}

const Screen: FormationScreenProps = (props) => {
  return (
    <BoundarySuspenseWrapper fallback={<FormationDesktopScreenSkeleton {...props} />}>
      <FormationDesktopScreen {...props} />
    </BoundarySuspenseWrapper>
  )
}

export default Screen
