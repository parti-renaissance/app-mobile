import React, { FunctionComponent } from 'react'
import { ImageBackground, Text, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, Spacing, Typography } from '../../../styles'
import i18n from '../../../utils/i18n'
import { ActionButton } from '../../shared/Buttons'
import CardView from '../../shared/CardView'
import { VerticalSpacer } from '../../shared/Spacer'

export interface HomeFeedActionCampaignsCardViewModel {
  imageUri: string
  subtitle: string
}

type Props = Readonly<{
  viewModel: HomeFeedActionCampaignsCardViewModel
  onPress: () => void
}>

export const HomeFeedActionCampaignsCard: FunctionComponent<Props> = ({
  viewModel,
  onPress,
}) => {
  return (
    <CardView backgroundColor={Colors.defaultBackground}>
      <ImageBackground source={{ uri: viewModel.imageUri }} resizeMode="cover">
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.5)']}
          style={styles.container}
        >
          <Text style={styles.title}>
            {i18n.t('home.feed.action.campaigns.title')}
          </Text>
          <VerticalSpacer spacing={Spacing.unit} />
          <Text style={styles.subtitle}>{viewModel.subtitle}</Text>
          <VerticalSpacer spacing={Spacing.margin} />
          <ActionButton
            title={i18n.t('home.feed.action.campaigns.action')}
            shape="rounded"
            buttonStyle={styles.button}
            onPress={onPress}
          />
        </LinearGradient>
      </ImageBackground>
    </CardView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.margin,
    paddingTop: 5 * Spacing.margin,
  },
  title: {
    ...Typography.title2,
    color: Colors.veryLightText,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.veryLightText,
  },
  button: {
    paddingVertical: Spacing.small,
  },
})
