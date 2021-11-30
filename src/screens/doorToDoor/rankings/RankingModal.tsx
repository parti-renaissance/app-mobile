import React, { FC, useState } from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Colors, Spacing, Typography } from '../../../styles'
import { useThemedStyles } from '../../../themes'
import Theme from '../../../themes/Theme'
import i18n from '../../../utils/i18n'
import { NavigationHeaderButton } from '../../shared/NavigationHeaderButton'
import { TouchablePlatform } from '../../shared/TouchablePlatform'
import { DoorToDoorCampaignCardViewModelMapper } from '../DoorToDoorCampaignCardViewModelMapper'
import { Tab } from './Ranking'
import { RankingCampaignHeader } from './RankingCampaignHeader'
import { RankingHeaderView } from './RankingHeaderView'
import { RankingRowView, RankingRowViewModel } from './RankingRowView'

type Props = Readonly<{
  onDismissModal: () => void
}>

const RankingModal: FC<Props> = (props) => {
  const styles = useThemedStyles(stylesFactory)
  const [tab, setTab] = useState(Tab.INDIVIDUAL)

  const renderItem = ({ item }: ListRenderItemInfo<RankingRowViewModel>) => (
    <RankingRowView viewModel={item} tab={tab} />
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <NavigationHeaderButton
            source={require('../../../assets/images/navigationBarClose.png')}
            onPress={props.onDismissModal}
          />
          <Text style={styles.headerTitle}>
            {i18n.t('doorToDoor.ranking.title')}
          </Text>
        </View>
        <RankingCampaignHeader
          viewModel={DoorToDoorCampaignCardViewModelMapper.map()}
        />
        <View style={styles.tabbarContainer}>
          <TouchablePlatform
            touchHighlight={Colors.touchHighlight}
            onPress={() => setTab(Tab.INDIVIDUAL)}
          >
            <View
              style={tab === Tab.INDIVIDUAL ? styles.selectedTab : styles.tab}
            >
              <Text
                style={
                  tab === Tab.INDIVIDUAL
                    ? styles.selectedTabText
                    : styles.tabText
                }
              >
                {i18n.t('doorToDoor.ranking.tabs.individual')}
              </Text>
            </View>
          </TouchablePlatform>
          <TouchablePlatform
            touchHighlight={Colors.touchHighlight}
            onPress={() => setTab(Tab.DEPARTMENTAL)}
          >
            <View
              style={tab === Tab.DEPARTMENTAL ? styles.selectedTab : styles.tab}
            >
              <Text
                style={
                  tab === Tab.DEPARTMENTAL
                    ? styles.selectedTabText
                    : styles.tabText
                }
              >
                {i18n.t('doorToDoor.ranking.tabs.departmental')}
              </Text>
            </View>
          </TouchablePlatform>
        </View>
        <RankingHeaderView tab={tab} />
        <FlatList
          data={[]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
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
    tabbarContainer: {
      ...Typography.callout,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    selectedTab: {
      borderBottomWidth: 2,
      borderColor: theme.primaryColor,
      margin: Spacing.margin,
      textAlign: 'center',
    },
    selectedTabText: {
      ...Typography.headline,
    },
    tab: {
      margin: Spacing.margin,
      textAlign: 'center',
    },
    tabText: {
      ...Typography.thinHeadline,
    },
  })
}

export default RankingModal
