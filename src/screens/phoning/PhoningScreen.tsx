import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Text, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

import { PhoningScreenProp } from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import { useTheme } from '../../themes'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { PhoningRowViewModel } from './PhoningRowViewModel'
import { PhoningViewModel } from './PhoningViewModel'
import { PhoningViewModelMapper } from './PhoningViewModelMapper'
import { useFocusEffect } from '@react-navigation/core'
import PhoningTutorialRow from './tutorial/PhoningTutorialRow'

export interface PhoningResources {}

const PhoningScreen: FunctionComponent<PhoningScreenProp> = () => {
  const { theme } = useTheme()
  const [, setRefreshing] = useState(false)
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
    const viewModel = PhoningViewModelMapper.map()
    setStatefulState(new ViewState.Content(viewModel))
  }, [theme, currentResources])

  const fetchData = useCallback(() => {
    setRefreshing(false)
    setResources({})
  }, [])

  const renderItem = ({ item }: ListRenderItemInfo<PhoningRowViewModel>) => {
    if (item.type === 'tutorial') {
      return (
        <PhoningTutorialRow
          onPress={() => {
            // TODO open tutorial screen
            console.log('shold open tutorial screen')
          }}
        />
      )
    }
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
      <FlatList
        data={phoningViewModel.rows}
        renderItem={renderItem}
        keyExtractor={(item) => item.value.id}
        ListHeaderComponent={
          <Text style={styles.title}>{phoningViewModel.title}</Text>
        }
        contentContainerStyle={styles.contentContainer}
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
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.margin,
    paddingTop: Spacing.largeMargin,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.mediumMargin,
  },
})

export default PhoningScreen
