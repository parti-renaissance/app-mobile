import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Act } from '../../core/entities/Act'
import ActsRepository from '../../data/ActsRepository'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { StatefulView, ViewState } from '../shared/StatefulView'
import { ActRow } from './ActRow'
import { ActRowViewModel } from './ActRowViewModel'
import { ActRowViewModelMapper } from './ActRowViewModelMapper'
import { useTheme } from '../../themes'

type Props = {
  navigation: any
}
const ActScreen = ({ navigation }: Props) => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<ReadonlyArray<ActRowViewModel>>
  >(new ViewState.Loading())

  const { theme } = useTheme()
  const [fetchedActs] = useState(new Map<number, Act>())
  const fetch = () => {
    setStatefulState(new ViewState.Loading())
    ActsRepository.getInstance()
      .getActs()
      .then((acts) => {
        fetchedActs.clear()
        acts.forEach((act) => {
          fetchedActs.set(act.id, act)
        })
        const actsViewModel = ActRowViewModelMapper.map(theme, acts)
        setStatefulState(new ViewState.Content(actsViewModel))
      })
      .catch((error) => {
        setStatefulState(
          new ViewState.Error(GenericErrorMapper.mapErrorMessage(error), fetch),
        )
      })
  }

  useEffect(fetch, [theme])

  const renderItem = ({ item }: ListRenderItemInfo<ActRowViewModel>) => {
    return (
      <ActRow
        viewModel={item}
        onPress={() => navigation.navigate(item.screen)}
      />
    )
  }

  const ActContent = (acts: ReadonlyArray<ActRowViewModel>) => {
    return (
      <FlatList
        data={acts}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        ListHeaderComponent={
          <Text style={styles.title}>{i18n.t('acts.title')}</Text>
        }
        contentContainerStyle={styles.contentContainer}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatefulView state={statefulState} contentComponent={ActContent} />
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

export default ActScreen
