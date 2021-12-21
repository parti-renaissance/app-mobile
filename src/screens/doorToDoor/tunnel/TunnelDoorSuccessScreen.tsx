import React, { FunctionComponent, useState } from 'react'
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Screen, TunnelDoorSuccessScreenProp } from '../../../navigation'
import { Colors, Spacing, Typography } from '../../../styles'
import i18n from '../../../utils/i18n'
import { PrimaryButton, SecondaryButton } from '../../shared/Buttons'
import { RankingRowViewModel, Tab } from '../rankings/Ranking'
import { RankingHeaderView } from '../rankings/RankingHeaderView'
import { RankingRowView } from '../rankings/RankingRowView'
import { RankingTabsView } from '../rankings/RankingTabsView'
import { RankingViewModelMapper } from '../rankings/RankingViewModelMapper'

const TunnelDoorSuccessScreen: FunctionComponent<TunnelDoorSuccessScreenProp> = ({
  navigation,
}) => {
  const [tab, setTab] = useState(Tab.INDIVIDUAL)

  const renderItem = ({ item }: ListRenderItemInfo<RankingRowViewModel>) => (
    <RankingRowView viewModel={item} tab={tab} />
  )

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../../assets/images/papSuccess.png')} />
      <Text style={styles.title}>
        {i18n.t('doorToDoor.tunnel.success.newDoor')}
      </Text>
      <Text style={styles.note}>
        {i18n.t('doorToDoor.tunnel.success.recap')}
      </Text>

      <SecondaryButton
        onPress={() => {}}
        title="Interroger une autre personne dans le même foyer"
        style={styles.button}
      />

      <RankingTabsView tab={tab} onPress={setTab} />
      {/* TODO - To change with API data */}
      <FlatList
        ListHeaderComponent={() => <RankingHeaderView tab={tab} />}
        data={[
          RankingViewModelMapper.map(1),
          RankingViewModelMapper.map(2),
          RankingViewModelMapper.map(3),
          RankingViewModelMapper.map(4),
          RankingViewModelMapper.map(5),
        ]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={i18n.t('doorToDoor.tunnel.success.knockNewDoor')}
          onPress={() => navigation.navigate(Screen.doorToDoorTunnelModal)}
        />
        <SecondaryButton
          title={i18n.t('doorToDoor.tunnel.success.stop')}
          style={styles.finished}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: Colors.defaultBackground,
    paddingHorizontal: Spacing.margin,
    paddingTop: Spacing.margin,
  },
  button: {
    marginBottom: Spacing.margin,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  finished: {
    marginTop: Spacing.unit,
  },
  note: {
    ...Typography.footnoteLight,
    margin: Spacing.margin,
  },
  title: {
    ...Typography.title2,
    marginLeft: Spacing.margin,
  },
})

export default TunnelDoorSuccessScreen
