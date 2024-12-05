import { ComponentPropsWithoutRef, Fragment, useState } from 'react'
import { FlatList } from 'react-native'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ButtonGroup from '@/components/base/ButtonGroup/ButtonGroup'
import Text from '@/components/base/Text'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { VoxButton } from '@/components/Button'
import { VoxHeader, VoxHeaderFrameStyled } from '@/components/Header/Header'
import VoxCard from '@/components/VoxCard/VoxCard'
import FormationMobileLayout from '@/screens/formations/mobile/FormationMobileLayout'
import { FormationScreenProps } from '@/screens/formations/types'
import { useGetFormations } from '@/services/formations/hook'
import { useGetMagicLink } from '@/services/magic-link/hook'
import { useGetSuspenseProfil } from '@/services/profile/hook'
import { GraduationCap } from '@tamagui/lucide-icons'
import { Href, Link } from 'expo-router'
import { Image, isWeb, ScrollView, XStack, YStack } from 'tamagui'
import { items } from '../bread-crumbs-items'
import { FormationDenyCard } from '../components/DenyCard'
import EmptyFormaState from '../components/EmptyFormaState'
import { FormaCard, FormaCardSkeleton } from '../components/FormaCard'
import { useCategories } from '../hooks/useCategories'

const CategoriesSelector = (props: ComponentPropsWithoutRef<typeof ButtonGroup>) => {
  return <ButtonGroup {...props} />
}

const FormationMobileScreenAllow: FormationScreenProps = (props) => {
  const { data } = useGetFormations()
  const insets = useSafeAreaInsets()
  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y // Update scrollY with current offset
    },
  })

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      paddingTop: interpolate(scrollY.value, [props.topVisual - insets.top * 2, props.topVisual], [0, insets.top], Extrapolation.CLAMP),
    }
  })

  const nationalFormations = data.filter((formation) => formation.visibility === 'national')
  const localFormations = data.filter((formation) => formation.visibility === 'local')
  const [filter, setFilter] = useState<'national' | 'local'>(localFormations.length > 0 ? 'local' : 'national')
  const textColor = filter === 'national' ? '$blue6' : '$green6'
  const dataList = filter === 'national' ? nationalFormations : localFormations
  const nCategories = useCategories({ formations: nationalFormations })
  const lCategories = useCategories({ formations: localFormations })
  const { options, activeCategories, setActiveCategories, filteredFormations } = filter === 'national' ? nCategories : lCategories

  return (
    <FormationMobileLayout {...props}>
      <Animated.FlatList
        data={filteredFormations}
        keyExtractor={(x) => x.uuid}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <FormaCard
            payload={item}
            last={index === dataList.length - 1}
            padding={16}
            paddingBottom={16}
            borderBottomWidth={0}
            paddingTop={index === 0 ? 24 : 16}
          />
        )}
        ListEmptyComponent={
          <VoxCard.Content>
            <EmptyFormaState visibility={filter} textColor={textColor} />
          </VoxCard.Content>
        }
        ListHeaderComponent={
          <Animated.View style={[headerAnimatedStyle, { backgroundColor: 'white' }]}>
            <YStack>
              <VoxHeaderFrameStyled height={54} pl={20}>
                <VoxHeader.Title icon={GraduationCap}>Formations</VoxHeader.Title>
              </VoxHeaderFrameStyled>
              <BreadCrumb items={items} onChange={(x) => setFilter(x)} value={filter} />
              {options.length > 1 && (
                <>
                  <ScrollView
                    horizontal
                    key={filter}
                    contentContainerStyle={{
                      paddingVertical: 16,
                      paddingHorizontal: 16,
                    }}
                  >
                    <CategoriesSelector
                      theme={filter === 'local' ? 'green' : 'blue'}
                      flexWrap="nowrap"
                      options={options}
                      value={activeCategories}
                      onChange={setActiveCategories}
                    />
                  </ScrollView>
                  <YStack paddingHorizontal={16} backgroundColor={'white'}>
                    <YStack height={1} backgroundColor={'$textOutline'} />
                  </YStack>
                </>
              )}
            </YStack>
          </Animated.View>
        }
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={() => (
          <YStack paddingHorizontal={16} paddingVertical={8} backgroundColor={'white'}>
            <YStack height={1} backgroundColor={'$textOutline'} />
          </YStack>
        )}
        contentContainerStyle={{
          paddingTop: props.topVisual,
          paddingBottom: 16 * 3,
        }}
      />
    </FormationMobileLayout>
  )
}

const FormationMobileScreenSkeleton: FormationScreenProps = (props) => {
  return (
    <FormationMobileLayout {...props}>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(x) => x.toString()}
        renderItem={({ index }) => <FormaCardSkeleton padding={16} paddingBottom={16} borderBottomWidth={0} paddingTop={index === 0 ? 24 : 16} />}
        ListHeaderComponent={<BreadCrumb items={items} value="national" />}
        ItemSeparatorComponent={() => (
          <YStack paddingHorizontal={16} paddingVertical={8} backgroundColor={'white'}>
            <YStack height={1} backgroundColor={'$textOutline'} />
          </YStack>
        )}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          paddingTop: props.topVisual,
          paddingBottom: 16 * 3,
        }}
      />
    </FormationMobileLayout>
  )
}

export const FormationMobileScreenDeny: FormationScreenProps = (props) => {
  return (
    <FormationMobileLayout {...props}>
      <YStack gap="$medium" padding="$medium" pt={props.topVisual} flex={1}>
        <FormationDenyCard {...props} />
      </YStack>
    </FormationMobileLayout>
  )
}

const FormationMobileScreen: FormationScreenProps = (props) => {
  const { data } = useGetSuspenseProfil()
  return data?.tags?.find((tag) => tag.code.startsWith('adherent:')) ? <FormationMobileScreenAllow {...props} /> : <FormationMobileScreenDeny {...props} />
}

const Screen: FormationScreenProps = (props) => {
  return (
    <BoundarySuspenseWrapper fallback={<FormationMobileScreenSkeleton {...props} />}>
      <FormationMobileScreen {...props} />
    </BoundarySuspenseWrapper>
  )
}

export default Screen
