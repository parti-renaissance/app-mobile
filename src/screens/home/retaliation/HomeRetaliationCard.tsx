import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Colors, Spacing, Styles, Typography } from '../../../styles'
import CardView from '../../shared/CardView'
import { useThemedStyles } from '../../../themes'
import { BorderlessButton, PrimaryButton } from '../../shared/Buttons'
import Theme from '../../../themes/Theme'
import { HorizontalSeparator } from '../../shared/HorizontalSeparator'
import i18n from '../../../utils/i18n'
import { HomeRetaliationCardViewModel } from './HomeRetaliationCardViewModel'

type Props = Readonly<{
  viewModel: HomeRetaliationCardViewModel
  onRetaliationSelected: (id: string) => void
  onRetaliateSelected: (id: string) => void
}>

const HomeRetaliationCard: FunctionComponent<Props> = ({
  viewModel,
  onRetaliationSelected,
  onRetaliateSelected,
}) => {
  const styles = useThemedStyles(stylesFactory)
  // adding eols to the title and the body enable to force the card to use all the available space
  return (
    <CardView
      style={styles.cardView}
      backgroundColor={Colors.defaultBackground}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={viewModel.socialIcon} />
          <Text style={styles.title} numberOfLines={2}>
            {viewModel.title + '\n\n'}
          </Text>
        </View>
        <Text style={styles.body} numberOfLines={4}>
          {viewModel.body + '\n\n\n\n'}
        </Text>
        <BorderlessButton
          title={i18n.t('home.retaliation.see_more')}
          textStyle={styles.linkText}
          style={styles.linkButton}
          onPress={() => {
            onRetaliationSelected(viewModel.id)
          }}
        />
        <HorizontalSeparator />
        <PrimaryButton
          shape={'rounded'}
          disabled={false}
          style={styles.retaliateButton}
          textStyle={styles.retaliateButtonText}
          title={i18n.t('home.retaliation.retaliate_button')}
          onPress={() => {
            onRetaliateSelected(viewModel.id)
          }}
        />
      </View>
    </CardView>
  )
}

const stylesFactory = (theme: Theme) => {
  return StyleSheet.create({
    body: {
      ...Typography.body,
      marginTop: Spacing.margin,
    },
    cardView: {
      marginVertical: Spacing.margin,
    },
    container: {
      padding: Spacing.margin,
    },
    linkButton: {
      alignSelf: 'flex-start',
      paddingHorizontal: 0,
      paddingVertical: Spacing.margin,
      textAlign: 'left',
    },
    linkText: {
      ...Styles.eventSeeMoreButtonTextStyle(theme),
      ...Typography.body,
      color: theme.primaryColor,
    },
    retaliateButton: {
      marginTop: Spacing.mediumMargin,
    },
    retaliateButtonText: {
      ...Typography.headline,
      color: theme.primaryButtonTextColor,
    },
    title: {
      ...Typography.title2,
      flex: 1,
      marginBottom: Spacing.margin,
      marginLeft: Spacing.margin,
    },
    titleContainer: {
      flexDirection: 'row',
    },
  })
}

export default HomeRetaliationCard
