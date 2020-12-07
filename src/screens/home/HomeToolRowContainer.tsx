import React, { FunctionComponent } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { Colors, Spacing, Styles } from '../../styles'
import { useTheme } from '../../themes'
import i18n from '../../utils/i18n'
import { BorderlessButton } from '../shared/Buttons'
import CardView from '../shared/CardView'
import { HomeToolsRowContainerViewModel } from './HomeRowViewModel'
import HomeToolRow from './HomeToolRow'

type Props = Readonly<{
  viewModel: HomeToolsRowContainerViewModel
  onToolSelected: (toolUrl: string) => void
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
  const { theme } = useTheme()
  return (
    <CardView
      style={styles.cardView}
      backgroundColor={Colors.defaultBackground}
    >
      <Image style={styles.image} source={theme.image.homeTools()} />
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
  contentContainerStyle: {
    flex: 1,
    marginHorizontal: Spacing.margin,
    marginTop: Spacing.margin,
    backgroundColor: Colors.groupedListBackground,
    borderRadius: 8,
    overflow: 'hidden',
  },
  separator: {
    height: Spacing.separatorHeight,
    marginHorizontal: Spacing.margin,
    backgroundColor: Colors.separator,
  },
})

export default HomeToolRowContainer
