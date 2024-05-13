import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Tool } from '../../core/entities/Tool'
import ToolsRepository from '../../data/ToolsRepository'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { ExternalLink } from '../shared/ExternalLink'
import { StatefulView } from '../shared/StatefulView'
import { ViewState } from '../shared/ViewState'
import { ViewStateUtils } from '../shared/ViewStateUtils'
import PollDetailToolRow from './PollDetailToolRow'

const Separator = () => {
  return <View style={styles.separator} />
}

const PollDetailTools = () => {
  const [statefulState, setStatefulState] = useState<ViewState<ReadonlyArray<Tool>>>(ViewState.Loading())

  const fetch = () => {
    setStatefulState(ViewState.Loading())
    ToolsRepository.getInstance()
      .getTools()
      .then((tools) => {
        setStatefulState(ViewState.Content(tools.result))
      })
      .catch((error) => {
        setStatefulState(ViewStateUtils.networkError(error, fetch))
      })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetch, [])

  return (
    <StatefulView
      state={statefulState}
      contentComponent={(tools) => {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>{i18n.t('tools.title')}</Text>
            <FlatList
              style={styles.list}
              bounces={false}
              data={tools}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={Separator}
              renderItem={({ item }) => <PollDetailToolRow title={item.title} onPress={() => ExternalLink.openUrl(item.url)} />}
            />
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.margin,
  },
  list: {
    backgroundColor: Colors.lightBackground,
    borderRadius: 8,
  },
  separator: {
    backgroundColor: Colors.separator,
    height: Spacing.separatorHeight,
    marginHorizontal: Spacing.margin,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.margin,
  },
})

export default PollDetailTools
