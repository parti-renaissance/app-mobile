import React, { FunctionComponent } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { Colors, Spacing, Styles } from '../../../styles'
import { useTheme } from '../../../themes'
import i18n from '../../../utils/i18n'
import { BorderlessButton } from '../../shared/Buttons'
import CardView from '../../shared/CardView'
import HomeNewsRow from './HomeNewsRow'
import { HomeNewsRowContainerViewModel } from '../HomeRowViewModel'

type Props = Readonly<{
  viewModel: HomeNewsRowContainerViewModel
  onNewsSelected: (toolUrl: string) => void
  onMorePressed: () => void
}>

const Separator = () => {
  return <View style={styles.separator} />
}

const HomeNewsRowContainer: FunctionComponent<Props> = ({
  viewModel,
  onNewsSelected,
  onMorePressed,
}) => {
  const { theme } = useTheme()
  return (
    <CardView
      style={styles.cardView}
      backgroundColor={Colors.defaultBackground}
    >
      <Image style={styles.image} source={theme.image.homeNews()} />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <HomeNewsRow viewModel={item} onPress={onNewsSelected} />
        }}
        ItemSeparatorComponent={Separator}
        data={viewModel.news}
        nestedScrollEnabled={true}
      />
      <BorderlessButton
        title={i18n.t('home.news.more')}
        textStyle={Styles.homeSeeMoreButtonTextStyle(theme)}
        style={Styles.homeSeeMoreButtonContainer}
        onPress={onMorePressed}
      />
    </CardView>
  )
}

const styles = StyleSheet.create({
  cardView: {
    marginVertical: Spacing.margin,
    marginHorizontal: Spacing.margin,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 288 / 103,
  },
  separator: {
    height: Spacing.separatorHeight,
    marginHorizontal: Spacing.margin,
    backgroundColor: Colors.separator,
  },
})

export default HomeNewsRowContainer
