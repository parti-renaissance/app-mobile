import React, { FunctionComponent } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { Colors, Spacing, Styles } from '../../../styles'
import i18n from '../../../utils/i18n'
import { BorderlessButton } from '../../shared/Buttons'
import CardView from '../../shared/CardView'
import { HomeToolsRowContainerViewModel } from '../HomeRowViewModel'
import HomeToolRow from './HomeToolRow'

type Props = Readonly<{
  viewModel: HomeToolsRowContainerViewModel
  onToolSelected: (toolUrl: string, toolName: string) => void
  onMorePressed: () => void
}>

const Separator = () => {
  return <View style={styles.separator} />
}

const HomeToolRowContainer: FunctionComponent<Props> = ({
  viewModel,
  onToolSelected,
  onMorePressed,
}) => {
  return (
    <CardView
      style={styles.cardView}
      backgroundColor={Colors.defaultBackground}
    >
      <Image
        style={styles.image}
        source={require('../../../assets/images/blue/imageOutilsprofil.png')}
      />
      <View style={styles.contentContainerStyle}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <HomeToolRow viewModel={item} onPress={onToolSelected} />
          }}
          ItemSeparatorComponent={Separator}
          data={viewModel.tools}
          nestedScrollEnabled={true}
        />
      </View>
      <BorderlessButton
        title={i18n.t('home.tools_more')}
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
  contentContainerStyle: {
    backgroundColor: Colors.groupedListBackground,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
    overflow: 'hidden',
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

export default HomeToolRowContainer
