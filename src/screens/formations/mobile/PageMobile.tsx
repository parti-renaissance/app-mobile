import { useState } from 'react'
import { FlatList } from 'react-native'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import FormationMobileLayout from '@/screens/formations/mobile/FormationMobileLayout'
import { FormationScreenProps } from '@/screens/formations/types'
import { useGetFormations } from '@/services/formations/hook'
import { YStack } from 'tamagui'
import { items } from '../bread-crumbs-items'
import { FormaCard, FormaCardSkeleton } from '../components/FormaCard'

const FormationMobileScreen: FormationScreenProps = (props) => {
  const { data } = useGetFormations()
  const [filter, setFilter] = useState<'national' | 'local'>('national')
  const nationalFormations = data.filter((formation) => formation.visibility === 'national')
  const localFormations = data.filter((formation) => formation.visibility === 'local')
  const dataList = filter === 'national' ? nationalFormations : localFormations

  return (
    <FormationMobileLayout {...props}>
      <FlatList
        data={dataList}
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
        ListHeaderComponent={<BreadCrumb items={items} onChange={(x) => setFilter(x)} value={filter} />}
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
