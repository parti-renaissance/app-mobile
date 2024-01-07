import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PhoningSession } from '../../core/entities/PhoningSession'
import PhoningCampaignRepository from '../../data/PhoningCampaignRepository'
import { PhoningSessionModalNavigatorScreenProps } from '../../navigation/phoningSessionModal/PhoningSessionModalNavigatorScreenProps'
import { Colors, Spacing, Typography } from '../../styles'
import i18n from '../../utils/i18n'
import { AlertUtils } from '../shared/AlertUtils'
import { PrimaryButton } from '../shared/Buttons'
import LoadingOverlay from '../shared/LoadingOverlay'
import { CloseButton } from '../shared/NavigationHeaderButton'
import { PhoningSessionNavigationData } from '../shared/PhoningSessionNavigationData'
import { FlexibleVerticalSpacer, VerticalSpacer } from '../shared/Spacer'

type PhoningSessionLoaderPermanentCampaignScreenProps =
  PhoningSessionModalNavigatorScreenProps<'PhoningSessionLoaderPermanentCampaign'>

const PhoningSessionLoaderPermanentCampaignScreen: FunctionComponent<
  PhoningSessionLoaderPermanentCampaignScreenProps
> = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSession = useCallback(
    (session: PhoningSession) => {
      const navigationData: PhoningSessionNavigationData = {
        campaignId: route.params.campaignId,
        campaignTitle: route.params.campaignTitle,
        sessionId: session.id,
        device: 'current',
      }
      navigation.replace('PhonePollDetail', {
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
      .finally(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        AlertUtils.showNetworkAlert(error, loadSession)
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
