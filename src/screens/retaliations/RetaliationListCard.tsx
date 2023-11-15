import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { ActionButton, BorderlessButton } from '../shared/Buttons'
import CardView from '../shared/CardView'
import { HorizontalSeparator } from '../shared/HorizontalSeparator'
import { HorizontalSpacer, VerticalSpacer } from '../shared/Spacer'
import { RetaliationListCardViewModel } from './RetaliationListCardViewModel'

type Props = Readonly<{
  viewModel: RetaliationListCardViewModel
  onRetaliationSelected: (id: string) => void
  onRetaliateSelected: (id: string) => void
}>

const RetaliationListCard: FunctionComponent<Props> = ({
  viewModel,
  onRetaliationSelected,
  onRetaliateSelected,
}) => {
  // adding eols to the title and the body enable to force the card to use all the available space
  return (
    <CardView
      style={styles.cardView}
      backgroundColor={Colors.defaultBackground}
    >
      <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <Image source={viewModel.socialIcon} />
            <HorizontalSpacer spacing={Spacing.unit} />
            <Text style={styles.title} numberOfLines={2}>
              {viewModel.title}
            </Text>
          </View>
          <Text style={styles.body} numberOfLines={3}>
            {viewModel.body}
          </Text>
        </View>
        <VerticalSpacer spacing={Spacing.unit} />
        <BorderlessButton
          title={i18n.t('home.retaliation.see_more')}
          type="primary"
          style={styles.linkButton}
          onPress={() => {
            onRetaliationSelected(viewModel.id)
          }}
        />
        <VerticalSpacer spacing={Spacing.margin} />
        <HorizontalSeparator />
        <VerticalSpacer spacing={Spacing.margin} />
        <ActionButton
          shape={'rounded'}
          buttonStyle={styles.retaliateButton}
          title={i18n.t('home.retaliation.retaliate_button')}
          onPress={() => {
            onRetaliateSelected(viewModel.id)
          }}
        />
      </View>
    </CardView>
  )
}

const styles = StyleSheet.create({
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
    paddingVertical: 0,
  },
  retaliateButton: {
    paddingVertical: Spacing.small,
  },
  title: {
    ...Typography.title2,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export default RetaliationListCard
