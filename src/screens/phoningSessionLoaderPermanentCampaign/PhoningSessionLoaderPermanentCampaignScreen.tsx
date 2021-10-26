import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Text, StyleSheet, Alert } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { PhoningSession } from '../../core/entities/PhoningSession'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import {
  PhoningSessionLoaderPermanentCampaignScreenProp,
  Screen,
} from '../../navigation'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { PrimaryButton } from '../shared/Buttons'
import { CloseButton } from '../shared/NavigationHeaderButton'
import { FlexibleVerticalSpacer, VerticalSpacer } from '../shared/Spacer'
import { PhoningSessionNavigationData } from '../shared/PhoningSessionNavigationData'
import LoadingOverlay from '../shared/LoadingOverlay'
import { GenericErrorMapper } from '../shared/ErrorMapper'

const PhoningSessionLoaderPermanentCampaignScreen: FunctionComponent<PhoningSessionLoaderPermanentCampaignScreenProp> = ({
  navigation,
  route,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSession = useCallback(
    (session: PhoningSession) => {
      setIsLoading(false)
      const navigationData: PhoningSessionNavigationData = {
        campaignId: route.params.campaignId,
        campaignTitle: route.params.campaignTitle,
        sessionId: session.id,
        device: 'current',
      }
      navigation.replace(Screen.phonePollDetail, {
        data: navigationData,
      })
    },
    [navigation, route.params.campaignId, route.params.campaignTitle],
  )

  const loadSession = useCallback(() => {
    setIsLoading(true)
    PhoningCampaignRepository.getInstance()
      .getPhoningCampaignSession(route.params.campaignId)
      .then(handleSession)
      .catch((error) => {
        setIsLoading(false)
        Alert.alert(
          i18n.t('common.error_title'),
          GenericErrorMapper.mapErrorMessage(error),
          [
            {
              text: i18n.t('common.error_retry'),
              onPress: loadSession,
            },
            {
              text: i18n.t('common.cancel'),
              style: 'cancel',
            },
          ],
          { cancelable: false },
        )
      })
  }, [route.params.campaignId, handleSession])

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton onPress={() => navigation.pop()} />,
    })
  }, [navigation])
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{i18n.t('phoningcontacttutorial.title')}</Text>
      <VerticalSpacer spacing={Spacing.extraLargeMargin} />
      <Text style={styles.body}>
        {i18n.t('phoningcontacttutorial.description')}
      </Text>
      <FlexibleVerticalSpacer minSpacing={Spacing.margin} />
      <PrimaryButton
        title={i18n.t('phoningsession.call_started')}
        onPress={() => loadSession()}
      />
      <VerticalSpacer spacing={Spacing.margin} />
      <LoadingOverlay visible={isLoading} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    ...Typography.body,
  },
  container: {
    backgroundColor: Colors.defaultBackground,
    flex: 1,
    paddingHorizontal: Spacing.margin,
  },
  title: {
    ...Typography.title,
  },
})

export default PhoningSessionLoaderPermanentCampaignScreen
