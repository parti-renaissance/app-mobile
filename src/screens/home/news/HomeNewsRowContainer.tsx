import React, { FunctionComponent } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { Colors, Spacing, Styles } from '../../../styles'
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
  return (
    <CardView
      style={styles.cardView}
      backgroundColor={Colors.defaultBackground}
    >
      <Image
        style={styles.image}
        source={require('../../../assets/images/blue/imageActualite.png')}
      />
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
        textStyle={Styles.homeSeeMoreButtonTextStyle}
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
  image: {
    aspectRatio: 288 / 103,
    height: undefined,
    width: '100%',
  },
  separator: {
    backgroundColor: Colors.separator,
    height: Spacing.separatorHeight,
    marginHorizontal: Spacing.margin,
  },
})

export default HomeNewsRowContainer
