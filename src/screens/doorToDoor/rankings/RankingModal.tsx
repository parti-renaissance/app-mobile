import React, { FC, useState } from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Colors, Typography } from '../../../styles'
import i18n from '../../../utils/i18n'
import { CloseButton } from '../../shared/NavigationHeaderButton'
import { DoorToDoorCampaignCardViewModelMapper } from '../DoorToDoorCampaignCardViewModelMapper'
import { RankingRowViewModel, Tab } from './Ranking'
import { RankingCampaignHeader } from './RankingCampaignHeader'
import { RankingHeaderView } from './RankingHeaderView'
import { RankingRowView } from './RankingRowView'
import { RankingTabsView } from './RankingTabsView'

type Props = Readonly<{
  onDismissModal: () => void
}>

const RankingModal: FC<Props> = (props) => {
  const [tab, setTab] = useState(Tab.INDIVIDUAL)

  const renderItem = ({ item }: ListRenderItemInfo<RankingRowViewModel>) => (
    <RankingRowView viewModel={item} />
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <CloseButton onPress={props.onDismissModal} />
        <Text style={styles.headerTitle}>
          {i18n.t('doorToDoor.ranking.title')}
        </Text>
      </View>
      <RankingCampaignHeader
        viewModel={DoorToDoorCampaignCardViewModelMapper.map()}
      />
      <RankingTabsView tab={tab} onPress={setTab} />

      {/* TODO - To change with API data */}
      <FlatList
        ListHeaderComponent={() => <RankingHeaderView tab={tab} />}
        data={[]}
        renderItem={renderItem}
        keyExtractor={(item) => item.rank}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    ...Typography.title2,
    textAlign: 'center',
  },
})

export default RankingModal
