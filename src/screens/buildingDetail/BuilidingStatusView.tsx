import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { Colors } from '../../styles'
import { useThemedStyles } from '../../themes'
import i18n from '../../utils/i18n'
import { BuildingStatusViewModel } from './BuildingStatusViewModel'

type Props = Readonly<{
  viewModel: BuildingStatusViewModel
}>

const BuildingStatusView: FunctionComponent<Props> = ({ viewModel }) => {
  const styles = useThemedStyles(stylesFactory)
  return (
    <View>
      <View style={styles.statusContainer}>
        <Image source={viewModel.statusIcon} />
        <Text>{viewModel.statusTile} </Text>
      </View>
      <View style={styles.statBlockContainer}>
        <StatBlockView />
        <StatBlockView />
        <StatBlockView />
      </View>
    </View>
  )
}

type StatBlockProps = Readonly<{}>

const StatBlockView: FunctionComponent<StatBlockProps> = ({}) => {
  const styles = useThemedStyles(stylesFactory)
  return (
    <View style={styles.statBlockView}>
      <Text>{i18n.t('building.status.done')} </Text>
      <Text>{i18n.t('building.status.done')} </Text>
    </View>
  )
}

const stylesFactory = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: Colors.defaultBackground,
      flex: 1,
    },
    statBlockContainer: {
      flexDirection: 'row',
    },
    statBlockView: {
      flex: 1,
    },
    statusContainer: {
      flexDirection: 'row',
    },
  })
}

export default BuildingStatusView
