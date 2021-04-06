import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Colors, Spacing, Styles } from '../../styles'
import { useTheme } from '../../themes'
import i18n from '../../utils/i18n'
import PollRow from '../polls/PollRow'
import { BorderlessButton } from '../shared/Buttons'
import CardView from '../shared/CardView'
import { HomePollsRowContainerViewModel } from './HomeRowViewModel'

type Props = Readonly<{
  viewModel: HomePollsRowContainerViewModel
  onPollSelected: (pollId: number) => void
  onMorePressed: () => void
}>

const HomePollRowContainer: FunctionComponent<Props> = ({
  viewModel,
  onPollSelected,
  onMorePressed,
}) => {
  const { theme } = useTheme()
  const navigationToPollDetail = (viewModelId: string) => {
    const pollId = parseInt(viewModelId, 10)
    onPollSelected(pollId)
  }

  return (
    <CardView
      style={styles.cardView}
      backgroundColor={Colors.defaultBackground}
    >
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <PollRow
              viewModel={item}
              onPress={() => navigationToPollDetail(item.id)}
            />
          )
        }}
        data={viewModel.polls}
        nestedScrollEnabled={true}
      />
      <BorderlessButton
        title={i18n.t('home.polls_more')}
        textStyle={Styles.homeSeeMoreButtonTextStyle(theme)}
        style={Styles.homeSeeMoreButtonContainer}
        onPress={onMorePressed}
      />
    </CardView>
  )
}

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: Spacing.margin,
    marginVertical: Spacing.margin,
  },
})

export default HomePollRowContainer
