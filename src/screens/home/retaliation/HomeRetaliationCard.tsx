import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, Image, Linking } from 'react-native'
import { Colors, Spacing, Styles, Typography } from '../../../styles'
import CardView from '../../shared/CardView'
import { useTheme, useThemedStyles } from '../../../themes'
import { BorderlessButton, PrimaryButton } from '../../shared/Buttons'
import Theme from '../../../themes/Theme'
import { HorizontalSeparator } from '../../shared/HorizontalSeparator'
import i18n from '../../../utils/i18n'
import { HomeRetaliationCardViewModel } from './HomeRetaliationCardViewModel'
import Clipboard from '@react-native-community/clipboard'

type Props = Readonly<{
  viewModel: HomeRetaliationCardViewModel
  onRetaliationSelected: (id: string) => void
}>

export const Retaliate = (text: string, url: string) => {
  Clipboard.setString(text)
  Linking.openURL(url)
}

const HomeRetaliationCard: FunctionComponent<Props> = ({
  viewModel,
  onRetaliationSelected,
}) => {
  const styles = useThemedStyles(stylesFactory)
  // adding eols to the body enable to force the card to use all the available space for the body
  return (
    <CardView
      style={styles.cardView}
      backgroundColor={Colors.defaultBackground}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={viewModel.socialIcon} />
          <Text style={styles.title}>{viewModel.title}</Text>
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
          onPress={() => Retaliate(viewModel.body, viewModel.url)}
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
      marginHorizontal: Spacing.margin,
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
      marginBottom: Spacing.margin,
      marginLeft: Spacing.margin,
    },
    titleContainer: {
      flexDirection: 'row',
    },
  })
}

export default HomeRetaliationCard
