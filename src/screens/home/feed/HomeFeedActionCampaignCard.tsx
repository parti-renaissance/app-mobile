import React, { FunctionComponent } from 'react'
import {
  ImageBackground,
  Text,
  StyleSheet,
  ImageSourcePropType,
  View,
  Image,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, Spacing, Typography } from '../../../styles'
import i18n from '../../../utils/i18n'
import { ActionButton } from '../../shared/Buttons'
import CardView from '../../shared/CardView'
import { HorizontalSeparator } from '../../shared/HorizontalSeparator'
import { HorizontalSpacer, VerticalSpacer } from '../../shared/Spacer'

export interface HomeFeedActionCampaignCardViewModel {
  id: string
  imageUri: string
  title: string
  subtitle: string
}

type Props = Readonly<{
  viewModel: HomeFeedActionCampaignCardViewModel
  icon: ImageSourcePropType
  onPress: () => void
}>

export const HomeFeedActionCampaignCard: FunctionComponent<Props> = ({
  viewModel,
  icon,
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
          <Text style={styles.heading}>
            {i18n.t('home.feed.action.campaign.heading')}
          </Text>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.bottomContainer}>
        <View style={styles.row}>
          <Image style={styles.icon} source={icon} />
          <HorizontalSpacer spacing={Spacing.margin} />
          <View>
            <Text style={styles.title}>{viewModel.title}</Text>
            <VerticalSpacer spacing={Spacing.small} />
            <Text style={styles.subtitle}>{viewModel.subtitle}</Text>
          </View>
        </View>
        <VerticalSpacer spacing={Spacing.margin} />
        <HorizontalSeparator />
        <VerticalSpacer spacing={Spacing.margin} />
        <ActionButton
          title={i18n.t('home.feed.action.campaign.action')}
          shape="rounded"
          buttonStyle={styles.button}
          onPress={onPress}
        />
      </View>
    </CardView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.margin,
    paddingTop: 5 * Spacing.margin,
  },
  bottomContainer: {
    padding: Spacing.margin,
  },
  heading: {
    ...Typography.title2,
    color: Colors.veryLightText,
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    tintColor: Colors.titleText,
  },
  title: {
    ...Typography.headline,
    color: Colors.titleText,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.lightText,
  },
  button: {
    paddingVertical: Spacing.small,
  },
})
