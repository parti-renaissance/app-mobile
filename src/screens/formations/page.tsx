import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { FlatList, LayoutChangeEvent } from 'react-native'
import Text from '@/components/base/Text'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useGetFormations } from '@/services/formations/hook'
import { isWeb, ScrollView, useMedia, XStack, YStack } from 'tamagui'
import { items } from './bread-crumbs-items'
import { FormaCard } from './components/FormaCard'

const splitIntoCol = <Data,>(array: Data[]) => {
  const col1: Data[] = []
  const col2: Data[] = []

  array.forEach((item, index) => {
    if (index % 2 === 0) {
      col1.push(item)
    } else {
      col2.push(item)
    }
  })
  return [col1, col2]
}

type DesktopScreenProps = {
  filter: 'national' | 'local'
  onChangeFilter: (filter: 'national' | 'local') => void
}

export type MyRef = {
  scrollToSection: (x: 'national' | 'local') => void
}

const FormationDesktopScreen = forwardRef<MyRef, DesktopScreenProps>(function FormationDesktopScreen(props, ref) {
  const { data } = useGetFormations()
  const media = useMedia()
  const nationalFormations = splitIntoCol(data.filter((formation) => formation.visibility === 'national'))
  const localFormations = splitIntoCol(data.filter((formation) => formation.visibility === 'local'))
  const nationalLayout = useRef<LayoutChangeEvent | null>(null)
  const localLayout = useRef<LayoutChangeEvent | null>(null)
  const isScrolling = useRef(false)
  const scrollRef = useRef<ScrollView | null>(null)

  useImperativeHandle(ref, () => {
    return {
      scrollToSection: (x: 'national' | 'local') => {
        if (x === 'national' && nationalLayout.current) {
          scrollRef?.current?.scrollTo({ y: nationalLayout.current.nativeEvent.layout.y - 140 })
        } else if (x === 'local' && localLayout.current) {
          scrollRef?.current?.scrollTo({ y: localLayout.current.nativeEvent.layout.y - 140 })
        }
      },
    }
  }, [])

  const handleLayout = (filter: 'national' | 'local') => (layout: LayoutChangeEvent) => {
    if (filter === 'national') {
      nationalLayout.current = layout
    } else {
      localLayout.current = layout
    }
  }

  const scrollViewContainerStyle = useMemo(
    () => ({
      pt: media.gtSm ? 166 : undefined,
      pl: media.gtSm ? '$5' : undefined,
      pr: media.gtSm ? '$5' : undefined,
      pb: isWeb ? '$10' : '$12',
    }),
    [media],
  )

  return (
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
            const { y: nationalY } = nationalLayout.current.nativeEvent.layout
            const { y: localY } = localLayout.current.nativeEvent.layout
            if (e.nativeEvent.contentOffset.y > nationalY - 150 && e.nativeEvent.contentOffset.y < localY - 150) {
              props.onChangeFilter('national')
            } else if (e.nativeEvent.contentOffset.y > localY - 150) {
              props.onChangeFilter('local')
            }
          }
        }
      }}
      contentContainerStyle={scrollViewContainerStyle}
    >
      <YStack gap={16}>
        <VoxCard onLayout={handleLayout('national')}>
          <VoxCard.Content>
            <Text.LG>
              Formations <Text.LG color="$blue6">nationales</Text.LG>
            </Text.LG>
            <VoxCard.Separator />
            <XStack>
              <YStack flex={1}>
                {nationalFormations[0].map((formation, index) => (
                  <FormaCard left={nationalFormations[1].length > 0} key={index} payload={formation} last={index === nationalFormations[0].length - 1} />
                ))}
              </YStack>
              <YStack flex={1}>
                {nationalFormations[1].map((formation, index) => (
                  <FormaCard right key={index} payload={formation} last={index === nationalFormations[1].length - 1} />
                ))}
              </YStack>
            </XStack>
          </VoxCard.Content>
        </VoxCard>
        <VoxCard onLayout={handleLayout('local')}>
          <VoxCard.Content>
            <Text.LG>
              Formations <Text.LG color="$green6">locale</Text.LG>
            </Text.LG>
            <VoxCard.Separator />
            <XStack>
              <YStack flex={1}>
                {localFormations[0].map((formation, index) => (
                  <FormaCard left={localFormations[1].length > 0} key={index} payload={formation} last={index === localFormations[0].length - 1} />
                ))}
              </YStack>
              <YStack flex={1}>
                {localFormations[1].map((formation, index) => (
                  <FormaCard right key={index} payload={formation} last={index === localFormations[1].length - 1} />
                ))}
              </YStack>
            </XStack>
          </VoxCard.Content>
        </VoxCard>
      </YStack>
    </ScrollView>
  )
})

function FormationMobileScreen() {
  const { data } = useGetFormations()
  const [filter, setFilter] = useState<'national' | 'local'>('national')
  const media = useMedia()
  const nationalFormations = data.filter((formation) => formation.visibility === 'national')
  const localFormations = data.filter((formation) => formation.visibility === 'local')
  const dataList = filter === 'national' ? nationalFormations : localFormations

  const scrollViewContainerStyle = useMemo(
    () => ({
      paddingTop: media.gtSm ? 166 : 270,
      paddingLeft: media.gtSm ? 16 : undefined,
      paddingRight: media.gtSm ? 16 : undefined,
      paddingBottom: 16 * 3,
    }),
    [media],
  )

  return (
    <FlatList
      data={dataList}
      keyExtractor={(x) => x.uuid}
      renderItem={({ item, index }) => <FormaCard payload={item} last={index === dataList.length - 1} />}
      ListHeaderComponent={<BreadCrumb items={items} onChange={(x) => setFilter(x)} value={filter} />}
      stickyHeaderIndices={[0]}
      contentContainerStyle={scrollViewContainerStyle}
    />
  )
}

const FormationScreen = forwardRef<MyRef, DesktopScreenProps>(function FormationScreen(props, ref) {
  const media = useMedia()
  return media.gtSm ? (
    <BoundarySuspenseWrapper>
      <FormationDesktopScreen {...props} ref={ref} />
    </BoundarySuspenseWrapper>
  ) : (
    <BoundarySuspenseWrapper>
      <FormationMobileScreen />
    </BoundarySuspenseWrapper>
  )
})

export default FormationScreen
