import React, { FunctionComponent } from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import { Colors, Spacing } from '../../styles'
import { useThemedStyles } from '../../themes'
import Theme from '../../themes/Theme'
import i18n from '../../utils/i18n'

export interface PhoningScoreboardViewModel {
  rows: ReadonlyArray<PhoningScoreboardRowViewModel>
}

interface PhoningScoreboardRowViewModel {
  id: string
  name: string
  calls: string
  surveys: string
  position: number
  caller: boolean
}

type Props = Readonly<{
  style?: StyleProp<ViewStyle>
  viewModel: PhoningScoreboardViewModel
}>

export const PhoningCampaignRankingView: FunctionComponent<Props> = ({
  style,
  viewModel,
}) => {
  const styles = useThemedStyles(styleFactory)

  const renderItem = ({
    item,
  }: ListRenderItemInfo<PhoningScoreboardRowViewModel>) => {
    const rowStyle =
      item.position % 2 === 0
        ? [styles.row, styles.rowEven]
        : [styles.row, styles.rowOdd]
    const callerStyle = item.caller ? styles.highlightedText : undefined
    return (
      <View style={rowStyle}>
        <Text style={[styles.cellLarge, callerStyle]}>{item.name}</Text>
        <Text style={[styles.cell, callerStyle]}>{item.calls}</Text>
        <Text style={[styles.cell, callerStyle]}>{item.surveys}</Text>
      </View>
    )
  }

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.cellLarge}>
          {i18n.t('phoning.scoreboard.header_name')}
        </Text>
        <Text style={styles.cell}>
          {i18n.t('phoning.scoreboard.header_calls')}
        </Text>
        <Text style={styles.cell}>
          {i18n.t('phoning.scoreboard.header_calls_completed')}
        </Text>
      </View>
      <FlatList
        data={viewModel.rows}
        style={style}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </>
  )
}

const styleFactory = (theme: Theme) => {
  return StyleSheet.create({
    cell: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
    },
    cellLarge: {
      flex: 2,
    },
    highlightedText: {
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      paddingStart: Spacing.margin,
      paddingVertical: Spacing.margin,
    },
    rowEven: {
      backgroundColor: Colors.defaultBackground,
    },
    rowOdd: {
      backgroundColor: theme.lightBackground,
    },
  })
}
