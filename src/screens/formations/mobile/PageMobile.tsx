import { ComponentPropsWithoutRef, useState } from 'react'
import { FlatList } from 'react-native'
import ButtonGroup from '@/components/base/ButtonGroup/ButtonGroup'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import VoxCard from '@/components/VoxCard/VoxCard'
import FormationMobileLayout from '@/screens/formations/mobile/FormationMobileLayout'
import { FormationScreenProps } from '@/screens/formations/types'
import { useGetFormations } from '@/services/formations/hook'
import { ScrollView, YStack } from 'tamagui'
import { items } from '../bread-crumbs-items'
import EmptyFormaState from '../components/EmptyFormaState'
import { FormaCard, FormaCardSkeleton } from '../components/FormaCard'
import { useCategories } from '../hooks/useCategories'

const CategoriesSelector = (props: ComponentPropsWithoutRef<typeof ButtonGroup>) => {
  return <ButtonGroup {...props} />
}

const FormationMobileScreen: FormationScreenProps = (props) => {
  const { data } = useGetFormations()

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
      <FlatList
        data={filteredFormations}
        keyExtractor={(x) => x.uuid}
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
          <YStack backgroundColor="white">
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

const Screen: FormationScreenProps = (props) => {
  return (
    <BoundarySuspenseWrapper fallback={<FormationMobileScreenSkeleton {...props} />}>
      <FormationMobileScreen {...props} />
    </BoundarySuspenseWrapper>
  )
}

export default Screen
