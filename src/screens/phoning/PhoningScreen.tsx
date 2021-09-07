import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  StyleSheet,
  SectionList,
  SectionListRenderItemInfo,
  RefreshControl,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

import { HomeScreenProps, Screen } from '../../navigation'
import { Colors } from '../../styles'
import { useTheme } from '../../themes'
import { StatefulView, ViewState } from '../shared/StatefulView'
import HomeHeader from '../home/HomeHeader'
import { PhoningRowViewModel } from './PhoningRowViewModel'
import HomeSectionRow from '../home/HomeSectionRow'
import { PhoningViewModel } from './PhoningViewModel'
import { PhoningViewModelMapper } from './PhoningViewModelMapper'
import { useFocusEffect } from '@react-navigation/core'

export interface PhoningResources {}

const PhoningScreen: FunctionComponent<HomeScreenProps> = ({ navigation }) => {
  const { theme, setTheme } = useTheme()
  const [isRefreshing, setRefreshing] = useState(false)
  const [initialFetchDone, setInitialFetchDone] = useState(false)
  const [currentResources, setResources] = useState<PhoningResources>()
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<PhoningResources>
  >(new ViewState.Content({}))

  useEffect(() => {
    // Reload view model (and view) when resources model changes
    if (!currentResources) {
      return
    }
    const viewModel = PhoningViewModelMapper.map(theme)
    setStatefulState(new ViewState.Content(viewModel))
  }, [theme, currentResources])

  const fetchData = useCallback(() => {
    setRefreshing(false)
    setResources({})
  }, [setTheme])

  const renderItem = ({
    item,
  }: SectionListRenderItemInfo<PhoningRowViewModel>) => {
    return null
  }

  const firstDataFetch = useCallback(() => {
    setResources({})
    if (!initialFetchDone) {
      setInitialFetchDone(true)
      fetchData()
    }
  }, [fetchData, initialFetchDone])

  useFocusEffect(firstDataFetch)

  const PhoningContent = (phoningViewModel: PhoningViewModel) => {
    return (
      <SectionList
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={<HomeHeader title={phoningViewModel.title} />}
        sections={phoningViewModel.rows}
        renderItem={renderItem}
        renderSectionHeader={({ section: { sectionViewModel } }) => {
          return sectionViewModel !== undefined ? (
            <HomeSectionRow viewModel={sectionViewModel} />
          ) : null
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={fetchData}
            colors={[theme.primaryColor]}
          />
        }
        keyExtractor={(item, index) => item.type + index}
      />
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      {<StatefulView contentComponent={PhoningContent} state={statefulState} />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
})

export default PhoningScreen
