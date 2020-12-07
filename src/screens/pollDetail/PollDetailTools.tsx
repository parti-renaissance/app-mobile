import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Tool } from '../../core/entities/Tool'
import ToolsRepository from '../../data/ToolsRepository'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { GenericErrorMapper } from '../shared/ErrorMapper'
import { ExternalLink } from '../shared/ExternalLink'
import { StatefulView, ViewState } from '../shared/StatefulView'
import PollDetailToolRow from './PollDetailToolRow'

const Separator = () => {
  return <View style={styles.separator} />
}

const PollDetailTools = () => {
  const [statefulState, setStatefulState] = useState<
    ViewState.Type<ReadonlyArray<Tool>>
  >(new ViewState.Loading())

  const fetch = () => {
    setStatefulState(new ViewState.Loading())
    ToolsRepository.getInstance()
      .getTools()
      .then((tools) => {
        setStatefulState(new ViewState.Content(tools))
      })
      .catch((error) => {
        setStatefulState(
          new ViewState.Error(GenericErrorMapper.mapErrorMessage(error), fetch),
        )
      })
  }

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
              renderItem={({ item }) => (
                <PollDetailToolRow
                  title={item.title}
                  onPress={() => ExternalLink.openUrl(item.url)}
                />
              )}
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
    backgroundColor: Colors.groupedListBackground,
    borderRadius: 8,
  },
  title: {
    ...Typography.largeTitle,
    marginBottom: Spacing.margin,
  },
  separator: {
    height: Spacing.separatorHeight,
    marginHorizontal: Spacing.margin,
    backgroundColor: Colors.separator,
  },
})

export default PollDetailTools
